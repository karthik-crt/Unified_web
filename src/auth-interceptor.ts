// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { ApiService } from '../src/services/api.service';
// import { catchError, switchMap, throwError } from 'rxjs';

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//   const api = inject(ApiService);

//   const access = sessionStorage.getItem('access');

//   let authReq = req;
//   return next(authReq).pipe(
//     catchError((error) => {
//       // If token expired
//       if (error.status === 401) {
//         console.log("calling refesh token")
//         return api.refreshAccessToken().pipe(
//           switchMap(() => {
//             const newAccess = sessionStorage.getItem('access');
//             const retriedReq = req.clone({
//               setHeaders: { Authorization: `Bearer ${newAccess}` }
//             });

//             return next(retriedReq);
//           }),
//           catchError(err => {
//             // Refresh token also invalid — log out user
//             sessionStorage.clear();
//             return throwError(() => err);
//           })
//         );
//       }
//       return throwError(() => error);
//     })
//   );
// };


// auth.interceptor.ts
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { ApiService } from '../src/services/api.service' // Adjust path as needed
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// To handle concurrent requests during token refresh
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

// Flags to prevent multiple logout alerts
let isRefreshing = false;
let hasShownLogoutAlert = false;

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  // Skip auth for login/refresh endpoints
  if (req.url.includes('/login') || req.url.includes('/refresh')) {
    return next(req);
  }

  const accessToken = sessionStorage.getItem('access');
  let authReq = req;

  // Attach token if exists
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only handle 401 Unauthorized
      if (error.status === 401) {
        // If we're already refreshing, wait for the new token
        if (isRefreshing) {
          return refreshTokenSubject.pipe(
            filter((token): token is string => token !== null),
            take(1),
            switchMap((token) => {
              return next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${token}` },
                })
              );
            })
          );
        }

        // Start refreshing token
        isRefreshing = true;
        refreshTokenSubject.next(null); // Notify others we're refreshing

        return apiService.refreshAccessToken().pipe(
          switchMap((response: any) => {
            isRefreshing = false;

            // Assuming your refresh endpoint returns { access: "new-token" }
            const newAccessToken = response?.access || sessionStorage.getItem('access');

            if (newAccessToken) {
              sessionStorage.setItem('access', newAccessToken);
              refreshTokenSubject.next(newAccessToken);

              // Retry original request with new token
              return next(
                req.clone({
                  setHeaders: { Authorization: `Bearer ${newAccessToken}` },
                })
              );
            }

            // If no token (shouldn't happen), fallback to logout
            return handleAuthFailure();
          }),
          catchError((refreshError) => {
            isRefreshing = false;
            refreshTokenSubject.next(null);

            // Refresh token expired or invalid → force logout
            return handleAuthFailure();
          })
        );
      }

      // For any other error, just rethrow
      return throwError(() => error);
    })
  );

  // Helper function to centralize logout logic
  function handleAuthFailure(): Observable<never> {
    // Clear all auth data
    sessionStorage.clear();
    // localStorage.clear(); // if you store anything there

    // Show SweetAlert only once
    if (!hasShownLogoutAlert) {
      hasShownLogoutAlert = true;

      Swal.fire({
        icon: 'warning',
        title: 'Session Expired',
        text: 'Your session has expired. Please log in again.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Go to Login',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      }).then(() => {
        hasShownLogoutAlert = false;
        router.navigate(['/default']).then(() => {
          // Optional: reload to fully reset app state
          window.location.reload();
        });
      });
    } else {
      // If alert already shown, just redirect
      router.navigate(['/default']);
    }

    // Return error to stop request chain
    return throwError(() => new Error('Authentication failed'));
  }
};

