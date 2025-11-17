import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../src/services/api.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const api = inject(ApiService);

  const access = sessionStorage.getItem('access');

  // Attach access token
  let authReq = req;
  if (access) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${access}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      // If token expired
      if (error.status === 401) {
        console.log("calling refesh token")
        return api.refreshAccessToken().pipe(
          switchMap(() => {
            const newAccess = sessionStorage.getItem('access');
            const retriedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${newAccess}` }
            });

            return next(retriedReq);
          }),
          catchError(err => {
            // Refresh token also invalid — log out user
            sessionStorage.clear();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
