import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface FamilyMember {
  label: string;
  icon: string;
  selected: boolean;
}

interface InsurancePlan {
  id: number;
  logo?: string;
  companyName: string;
  planName: string;
  features: string[];
  coverAmount: string;
  premium: number;
  premiumFrequency: string;
  tags?: string[];
}

@Component({
  selector: 'app-health-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './health-search.component.html',
  styleUrls: ['./health-search.component.scss']
})
export class HealthSearchComponent {
  // --- Step control ---
  
  currentStep = 1;
  readonly totalSteps = 6;
  selectedGender: 'male' | 'female' = 'male';



  // --- Members (Step 1) ---
  familyMembers: FamilyMember[] = [
    { label: 'Self', icon: '👨', selected: true },   // default male
    { label: 'Spouse', icon: '👩', selected: false },
    { label: 'Son', icon: '👦', selected: false },
    { label: 'Daughter', icon: '👧', selected: false },
    { label: 'Father', icon: '👴', selected: false },
    { label: 'Mother', icon: '👵', selected: false },
  ];

  planSearch = '';
  planSort: 'recommended' | 'low' | 'high' = 'recommended';


  // --- Ages (Step 2) ---
  memberAges: Record<string, number | null> = {};

  // --- City (Step 3) ---
  city = '';

  // --- Save Progress (Step 4) ---
  userName = '';
  mobile = '';
  otp = '';

  // --- Medical History (Step 5) ---
  diseases = [
    { name: 'Diabetes', selected: false },
    { name: 'Hypertension', selected: false },
    { name: 'Thyroid', selected: false },
    { name: 'Asthma', selected: false },
    { name: 'None', selected: false }
  ];

  // --- Plans (Step 6) ---
  plans: InsurancePlan[] = [
    {
      id: 1,
      companyName: 'Star Health',
      planName: 'Young Star Silver',
      features: ['No room rent limit', 'Automatic restoration', 'Annual health check-up'],
      coverAmount: '5 Lakh',
      premium: 535,
      premiumFrequency: 'monthly',
      tags: ['Popular']
    },
    {
      id: 2,
      companyName: 'Niva Bupa',
      planName: 'ReAssure 2.0',
      features: ['Lock premium', 'Booster+', 'Family benefits'],
      coverAmount: '5 Lakh',
      premium: 641,
      premiumFrequency: 'monthly',
    },
    {
      id: 3,
      companyName: 'Aditya Birla',
      planName: 'Activ One',
      features: ['100% health returns', 'Chronic management'],
      coverAmount: '10 Lakh',
      premium: 790,
      premiumFrequency: 'monthly',
    },
    {
      id: 4,
      companyName: 'Care Health',
      planName: 'Supreme Direct',
      features: ['Unlimited recharge', 'No claim bonus'],
      coverAmount: '7 Lakh',
      premium: 611,
      premiumFrequency: 'monthly',
    }
  ];

  constructor(private router: Router) {
    this.loadFromStorage();
    this.ensureMemberAgesExist();
  }

  // ----------------- Helpers -----------------
  ensureMemberAgesExist() {
    this.familyMembers.forEach(m => {
      if (!(m.label in this.memberAges)) {
        this.memberAges[m.label] = null;
      }
    });
  }

  selectedMembers() {
    return this.familyMembers.filter(m => m.selected);
  }

  // ----------------- Actions -----------------
  toggleMember(index: number) {
    this.familyMembers[index].selected = !this.familyMembers[index].selected;

    // initialize age when selected
    const label = this.familyMembers[index].label;
    if (this.familyMembers[index].selected && this.memberAges[label] == null) {
      this.memberAges[label] = 30;
    }
  }

  toggleDisease(i: number) {
    // If "None" selected, clear others
    if (this.diseases[i].name === 'None') {
      const isSelected = !this.diseases[i].selected;
      this.diseases.forEach(d => d.selected = false);
      this.diseases[i].selected = isSelected;
      return;
    }
    // If selecting other disease and 'None' is selected, clear 'None'
    this.diseases.forEach(d => { if (d.name === 'None') d.selected = false; });
    this.diseases[i].selected = !this.diseases[i].selected;
  }

  // ----------------- Navigation -----------------
  canProceedToNext(): boolean {
    // Simple validation per step
    switch (this.currentStep) {
      case 1:
        return this.selectedMembers().length > 0;
      case 2:
        // ensure every selected member has age > 0
        return this.selectedMembers().every(m => !!this.memberAges[m.label] && (this.memberAges[m.label]! > 0));
      case 3:
        return this.city.trim().length > 0;
      case 4:
        return this.userName.trim().length > 1 && /^[6-9]\d{9}$/.test(this.mobile);
      case 5:
        // no strict requirement; allow to proceed
        return true;
      default:
        return true;
    }
  }

  next() {
    if (!this.canProceedToNext()) {
      // Minimal feedback (no alerts) — you can wire Toastr or UI message later
      console.warn('Validation failed for step', this.currentStep);
      return;
    }
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.saveToStorage(); // save progress at each step
    }
  }

  back() {
    if (this.currentStep > 1) this.currentStep--;
  }

  goTo(step: number) {
    if (step < 1 || step > this.totalSteps) return;
    // allow jumping backwards freely; allow forward only if validations for intermediate steps pass
    if (step > this.currentStep) {
      // attempt forward jump: check all steps between current and target
      const original = this.currentStep;
      for (let s = original; s < step; s++) {
        this.currentStep = s;
        if (!this.canProceedToNext()) {
          this.currentStep = original;
          return;
        }
      }
      this.currentStep = step;
    } else {
      this.currentStep = step;
    }
  }

  // ----------------- LocalStorage Save / Resume -----------------
  storageKey = 'health-wizard-v1';

  saveToStorage() {
    const payload = {
      currentStep: this.currentStep,
      familyMembers: this.familyMembers,
      memberAges: this.memberAges,
      city: this.city,
      userName: this.userName,
      mobile: this.mobile,
      diseases: this.diseases
    };
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch (e) {
      console.warn('Unable to save to localStorage', e);
    }
  }

  loadFromStorage() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return;
      const payload = JSON.parse(raw);
      if (payload.familyMembers) this.familyMembers = payload.familyMembers;
      if (payload.memberAges) this.memberAges = payload.memberAges;
      if (payload.city) this.city = payload.city;
      if (payload.userName) this.userName = payload.userName;
      if (payload.mobile) this.mobile = payload.mobile;
      if (payload.diseases) this.diseases = payload.diseases;
      if (payload.currentStep) this.currentStep = payload.currentStep;
    } catch (e) {
      console.warn('Unable to load from localStorage', e);
    }
  }

  clearStorage() {
    localStorage.removeItem(this.storageKey);
  }

  // Mock OTP send / verify (UI only)
  sendOtp() {
    if (!/^[6-9]\d{9}$/.test(this.mobile)) {
      console.warn('Invalid mobile');
      return;
    }
    // In real app: call API to send OTP
    console.log('OTP sent to', this.mobile);
  }

  verifyOtp() {
    // Mock: accept any non-empty otp
    if (this.otp.trim().length > 0) {
      console.log('OTP verified');
      this.next();
    } else {
      console.warn('Invalid OTP');
    }
  }
  selectGender(gender: 'male' | 'female') {
    this.selectedGender = gender;

    if (gender === 'male') {
      // Self
      this.familyMembers[0].label = 'Self (Male)';
      this.familyMembers[0].icon = '👨';

      // Spouse
      this.familyMembers[1].label = 'Wife';
      this.familyMembers[1].icon = '👩';
    }
    else {
      // Self
      this.familyMembers[0].label = 'Self (Female)';
      this.familyMembers[0].icon = '👩';

      // Spouse
      this.familyMembers[1].label = 'Husband';
      this.familyMembers[1].icon = '👨';
    }
  }


  // select plan (mock)
  selectPlan(plan: InsurancePlan) {
    console.log('User selected plan', plan);
    // In real flow redirect to checkout / details
    this.router.navigate(['/payment'])
  }

  filteredPlans() {
    let list = this.plans;

    // Search filter
    if (this.planSearch.trim().length > 0) {
      const s = this.planSearch.toLowerCase();
      list = list.filter(p =>
        p.companyName.toLowerCase().includes(s) ||
        p.planName.toLowerCase().includes(s)
      );
    }

    // Sorting
    if (this.planSort === 'low') {
      list = [...list].sort((a, b) => a.premium - b.premium);
    } else if (this.planSort === 'high') {
      list = [...list].sort((a, b) => b.premium - a.premium);
    }

    return list;
  }

}
