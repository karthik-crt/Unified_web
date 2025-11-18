import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface FormField {
  label: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'readonly';
  placeholder?: string;
  model: keyof FormData;
  options?: string[];
}

interface PlanOption {
  id: string;
  label: string;
  price: number;
  savings?: number;
}

interface VehicleSummary {
  model: string;
  regNumber: string;
  year: number;
  icon: string;
}

interface InsurerInfo {
  name: string;
  type: string;
  idv: number;
  logoSVG: string;
}

interface FormData {
  title: string;
  ownerName: string;
  mobileNumber: string;
  email: string;
  rememberPolicy: string;
  expiryDate: string;
  selectedPlan: string;
}

@Component({
  selector: 'app-inquery-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inquery-form.component.html',
  styleUrl: './inquery-form.component.scss'
})
export class InqueryFormComponent {
constructor(private router :Router){}
  formFields: FormField[] = [
    { label: 'Title', type: 'select', model: 'title', options: ['Mr.', 'Ms.', 'Mrs.'] },
    { label: 'Vehicle Owner Name', type: 'readonly', model: 'ownerName' },
    { label: 'Mobile Number', type: 'tel', model: 'mobileNumber', placeholder: 'Enter mobile number' },
    { label: 'Email Address', type: 'email', model: 'email', placeholder: 'Enter email address' },
  ];

  
  formData: FormData = {
    title: 'Mr.',
    ownerName: 'Nandhu', // dynamic possible
    mobileNumber: '',
    email: '',
    rememberPolicy: 'no',
    expiryDate: '',
    selectedPlan: ''
  };

  
  plans: PlanOption[] = [
    { id: '1year', label: '1 year', price: 1180 },
    { id: '2year', label: '2 year', price: 1747, savings: 613 },
    { id: '3year', label: '3 year', price: 2499, savings: 1020 },
  ];


  vehicleInfo: VehicleSummary = {
    model: 'Ola S1',
    regNumber: 'TN59CQ7113',
    year: 2023,
    icon: '🛵'
  };

  
  insurer: InsurerInfo = {
    name: 'Reliance',
    type: '1 Year Own Damage',
    idv: 67073,
    logoSVG: `
      <svg xmlns='http://www.w3.org/2000/svg' width='60' height='30'>
        <rect width='60' height='30' fill='#2563eb' rx='4'/>
        <text x='30' y='20' font-family='Arial' font-size='10' fill='white' text-anchor='middle'>
          RELIANCE
        </text>
      </svg>
    `
  };



  updateValue(field: keyof FormData, value: string) {
    this.formData[field] = value;
  }

  selectPlan(planId: string) {
    this.formData.selectedPlan = planId;
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    this.router.navigate(['/payment'])
  }

  onBack() {
    console.log('Back navigation triggered');
  }

  onCallUs() {
    console.log('Calling...');
  }

  onEdit() {
    console.log('Editable field clicked');
  }
  get selectedPlanData() {
    return this.plans.find(p => p.id === this.formData.selectedPlan);
  }

  get planPremium(): number {
    return this.selectedPlanData?.price ?? 0;
  }

  get gstAmount(): number {
    return Math.round(this.planPremium * 0.18);
  }

  get totalAmount(): number {
    return Math.round(this.planPremium + this.gstAmount);
  }

}
