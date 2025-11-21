import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPopupComponent } from '../../login-popup/login-popup.component'
import { CommonModule } from '@angular/common';
// CoreUI Standalone Components
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  ButtonDirective,
} from '@coreui/angular';

@Component({
  selector: 'app-unified',
  standalone: true,
  templateUrl: './unified.component.html',
  styleUrl: './unified.component.scss',

  // IMPORTANT: Add all CoreUI components you use
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    ButtonDirective,
    LoginPopupComponent,
    CommonModule
  ],
})
export class UnifiedComponent {
  constructor(private router: Router) { }
  showLoginPopup = false;
  loginPage() {
    this.showLoginPopup = true;
  }

  closePopup() {
    this.showLoginPopup = false;
  }
  action(type: string) {
    console.log("/" + type)
    this.router.navigate(['/' + type])

  }
}
// <section class="info-cards py-5 bg-light">
//         <c-container>
//             <c-row class="g-4">

//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 highlight-card card-3">
//                         <h4 class="fw-bold text-info mb-3">Investment Plans</h4>
//                         <p class="text-muted mb-3">Guaranteed returns & long-term wealth growth</p>
//                         <button cButton color="info" variant="outline">Explore Options</button>
//                     </c-card>
//                 </c-col>

//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 highlight-card card-2">
//                         <h4 class="fw-bold text-success mb-3">Term Insurance</h4>
//                         <p class="text-muted mb-3">High life cover with low monthly premium</p>
//                         <button cButton color="success" variant="outline">Calculate Premium</button>
//                     </c-card>
//                 </c-col>

//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 highlight-card card-1">
//                         <h4 class="fw-bold text-primary mb-3">Health Insurance</h4>
//                         <p class="text-muted mb-3">Covers hospitalization, medical bills & emergencies</p>
//                         <button cButton color="primary" variant="outline">View Plans</button>
//                     </c-card>
//                 </c-col>

//             </c-row>
//         </c-container>
//     </section>

//     <section class="popular-calculators py-5 bg-white">
//         <c-container>
//             <h2 class="text-center fw-bold mb-4">Popular Insurance Calculators</h2>


//             <c-row class="g-4">
//                 <!-- Term Insurance Calculator -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm calc-card border-0">
//                         <img src="assets/icons/term-calc.png" height="55" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">Term Insurance Calculator</h5>
//                         <p class="text-muted small mb-3">Estimate your ideal life cover & premium instantly.</p>
//                         <button cButton color="primary">Calculate Now</button>
//                     </c-card>
//                 </c-col>


//                 <!-- Health Insurance Calculator -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm calc-card border-0">
//                         <img src="assets/icons/health-calc.png" height="55" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">Health Insurance Calculator</h5>
//                         <p class="text-muted small mb-3">Find recommended coverage for you & family.</p>
//                         <button cButton color="success">Check Now</button>
//                     </c-card>
//                 </c-col>


//                 <!-- Investment Calculator -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm calc-card border-0">
//                         <img src="assets/icons/invest-calc.png" height="55" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">Investment Returns Calculator</h5>
//                         <p class="text-muted small mb-3">Get accurate projections for ULIP & savings plans.</p>
//                         <button cButton color="info">Calculate Returns</button>
//                     </c-card>
//                 </c-col>
//             </c-row>
//         </c-container>
//     </section>

//     <section class="pb-advantage py-5 bg-light">
//         <c-container>
//             <h2 class="text-center fw-bold mb-5">Why Choose Us</h2>


//             <c-row class="g-4">
//                 <!-- Advantage Item 1 -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 advantage-card">
//                         <img src="assets/icons/support.png" height="60" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">24×7 Customer Support</h5>
//                         <p class="text-muted small">Our expert team helps you anytime during claims or queries.</p>
//                     </c-card>
//                 </c-col>


//                 <!-- Advantage Item 2 -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 advantage-card">
//                         <img src="assets/icons/savings.png" height="60" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">Save Big on Premiums</h5>
//                         <p class="text-muted small">Compare multiple plans and choose the most affordable option.</p>
//                     </c-card>
//                 </c-col>


//                 <!-- Advantage Item 3 -->
//                 <c-col md="4" sm="6">
//                     <c-card class="p-4 text-center shadow-sm border-0 advantage-card">
//                         <img src="assets/icons/secure.png" height="60" class="mx-auto mb-3" />
//                         <h5 class="fw-bold mb-2">Trusted & Secure</h5>
//                         <p class="text-muted small">The platform is certified & trusted by millions of customers.</p>
//                     </c-card>
//                 </c-col>
//             </c-row>
//         </c-container>
//     </section>

//     <section class="app-promo py-5 bg-white">
//         <c-container>
//             <c-row class="align-items-center g-4">


//                 <!-- App Image -->
//                 <c-col md="6" class="text-center">
//                     <img src="assets/app/app-promo.png" alt="App Promo" class="img-fluid rounded shadow" />
//                 </c-col>


//                 <!-- App Text -->
//                 <c-col md="6" class="text-center text-md-start">
//                     <h2 class="fw-bold mb-3">Get Our App & Stay Protected</h2>
//                     <p class="text-muted fs-6 mb-4">Renew policies, track claims, get reminders and compare plans
//                         instantly — all in one app.</p>


//                     <div class="d-flex gap-3 justify-content-center justify-content-md-start">
//                         <a href="#">
//                             <img src="assets/app/google-play.png" height="50" class="store-badge" />
//                         </a>
//                         <a href="#">
//                             <img src="assets/app/app-store.png" height="50" class="store-badge" />
//                         </a>
//                     </div>
//                 </c-col>


//             </c-row>
//         </c-container>
//     </section>

//     <section class="testimonials py-5 bg-light">
//         <c-container>
//             <h2 class="text-center fw-bold mb-5">What Our Customers Say</h2>


//             <c-row class="justify-content-center g-4">
//                 <!-- Testimonial 1 -->
//                 <c-col md="4">
//                     <c-card class="p-4 shadow-sm border-0 testimonial-card text-center">
//                         <img src="assets/testimonials/user1.png" class="rounded-circle mb-3" height="70" />
//                         <p class="text-muted">“Amazing experience! I compared multiple health plans and found the best
//                             one within minutes.”</p>
//                         <h6 class="fw-bold mt-2">Rahul Sharma</h6>
//                         <p class="small text-muted">Bangalore</p>
//                     </c-card>
//                 </c-col>


//                 <!-- Testimonial 2 -->
//                 <c-col md="4">
//                     <c-card class="p-4 shadow-sm border-0 testimonial-card text-center">
//                         <img src="assets/testimonials/user2.png" class="rounded-circle mb-3" height="70" />
//                         <p class="text-muted">“The claims support team helped me step-by-step. Highly recommended!”</p>
//                         <h6 class="fw-bold mt-2">Priya Nair</h6>
//                         <p class="small text-muted">Kochi</p>
//                     </c-card>
//                 </c-col>


//                 <!-- Testimonial 3 -->
//                 <c-col md="4">
//                     <c-card class="p-4 shadow-sm border-0 testimonial-card text-center">
//                         <img src="assets/testimonials/user3.png" class="rounded-circle mb-3" height="70" />
//                         <p class="text-muted">“Best platform to compare car insurance. Saved almost 40% on my premium.”
//                         </p>
//                         <h6 class="fw-bold mt-2">Amit Verma</h6>
//                         <p class="small text-muted">Delhi</p>
//                     </c-card>
//                 </c-col>
//             </c-row>
//         </c-container>
//     </section>

//     <section class="partners py-5 bg-white">
//         <c-container>
//             <h2 class="text-center fw-bold mb-5">Our Trusted Partners</h2>


//             <c-row class="g-4 justify-content-center align-items-center text-center">
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner1.png" class="img-fluid grayscale" alt="Partner 1" />
//                 </c-col>
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner2.png" class="img-fluid grayscale" alt="Partner 2" />
//                 </c-col>
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner3.png" class="img-fluid grayscale" alt="Partner 3" />
//                 </c-col>
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner4.png" class="img-fluid grayscale" alt="Partner 4" />
//                 </c-col>
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner5.png" class="img-fluid grayscale" alt="Partner 5" />
//                 </c-col>
//                 <c-col md="2" sm="4" xs="6">
//                     <img src="assets/partners/partner6.png" class="img-fluid grayscale" alt="Partner 6" />
//                 </c-col>
//             </c-row>
//         </c-container>
//     </section>