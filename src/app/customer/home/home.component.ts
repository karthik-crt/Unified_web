import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Angular imports
import { CommonModule, NgClass, DecimalPipe, DatePipe } from '@angular/common';

// CoreUI Angular (v4+ standalone components)
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardComponent,
  CardBodyComponent,
  CardHeaderComponent,
  ButtonDirective
} from '@coreui/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // Angular
    CommonModule,
    NgClass,
    DecimalPipe,
    DatePipe,

    // CoreUI components
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardBodyComponent,
    CardHeaderComponent,
    ButtonDirective
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userPhone: string = '';
  activePolicies = 0;
  totalCoverage = 0;
  kycStatus = 'Pending';

  policies: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userPhone = localStorage.getItem('userPhone') || 'Unknown User';

    this.policies = [
      {
        id: 1,
        policy_number: 'POL12345',
        product_name: 'Health Shield Plan',
        coverage_amount: 500000,
        premium_amount: 12000,
        status: 'active',
        end_date: '2025-12-31'
      },
      {
        id: 2,
        policy_number: 'POL67890',
        product_name: 'Motor Insurance',
        coverage_amount: 300000,
        premium_amount: 6000,
        status: 'expired',
        end_date: '2023-10-10'
      }
    ];

    this.activePolicies = this.policies.filter(p => p.status === 'active').length;
    this.totalCoverage = this.calculateCoverage();
    this.kycStatus = this.getKycStatus();
  }

  calculateCoverage() {
    return this.policies
      .filter(p => p.status === 'active')
      .reduce((sum, p) => sum + p.coverage_amount, 0);
  }

  getKycStatus() {
    return 'Verified';
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  viewPolicy(id: number) {
    this.router.navigate(['/policy', id]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
