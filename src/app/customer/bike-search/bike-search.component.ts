import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

type InsurancePlan = {
  name: string;
  idv: string;
  premium: string;
  badge?: string;
  badgeText?: string;
  highlight?: string;
  logo?: string;
};
@Component({
  selector: 'app-bike-search',
  imports: [
    CommonModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './bike-search.component.html',
  styleUrl: './bike-search.component.scss'
})
export class BikeSearchComponent {
  constructor(private router:Router){}
  planType = 'Comprehensive';
  sortBy = 'Recommended';
  duration = '1 year';

  insurancePlans: InsurancePlan[] = [
    { name: 'Reliance', idv: '₹16,200', premium: '₹1,005', badge: 'Road Side Assistance (RSA) included', logo: 'bg-blue-600' },
    { name: 'SBI', idv: '₹15,461', premium: '₹715', logo: 'bg-blue-500' },
    { name: 'Tata AIG', idv: '₹14,985', premium: '₹727', highlight: 'Fastest buy in 30 sec', logo: 'bg-purple-600' },
    { name: 'ICICI Lombard', idv: '₹17,550', premium: '₹729', logo: 'bg-orange-500' },
    { name: 'Shriram', idv: '₹20,845', premium: '₹734', badge: 'Value for money', badgeText: 'This plan offers the highest IDV at this price point ensuring value for money.', logo: 'bg-yellow-600' },
    { name: 'National Insurance', idv: '₹20,332', premium: '₹768', logo: 'bg-teal-600' },
    { name: 'United India', idv: '₹12,600', premium: '₹770', logo: 'bg-yellow-500' },
    { name: 'Iffco Tokio', idv: '₹13,390', premium: '₹856', logo: 'bg-green-600' },
    { name: 'Chola MS', idv: '₹16,802', premium: '₹862', logo: 'bg-red-500' },
    { name: 'HDFC Ergo', idv: '₹11,795', premium: '₹922', logo: 'bg-red-600' },
  ];

  // example stubs for actions:
  onBuyNow(plan: InsurancePlan) {
    // replace with your navigation or purchase flow
    console.log('Buy now clicked for', plan.name);
    alert(`Proceed to buy ${plan.name} — premium ${plan.premium}`);
  }
  navigateToPayment(){
    this.router.navigate(['/inquery-form'])
  }
}
