import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicles-insurance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles-insurance.component.html',
  styleUrls: ['./vehicles-insurance.component.scss']
})
export class VehiclesInsuranceComponent {
  constructor(private router : Router){}
  bikeNumber: string = '';
  showDisclaimer: boolean = false;

  formatBikeNumber(event: any) {
    let value = event.target.value.toUpperCase();
    // Remove any characters that aren't letters, numbers, or hyphens
    value = value.replace(/[^A-Z0-9-]/g, '');
    this.bikeNumber = value;
    console.log("form", this.bikeNumber)
  }

  viewPrices() {
    if (this.bikeNumber) {
      console.log('Viewing prices for:', this.bikeNumber);
      this.router.navigate(['/bike-result'])
      // alert(`Fetching insurance prices for vehicle: ${this.bikeNumber}`);
    } else {
      alert('Please enter a bike number');
    }
  }

  toggleDisclaimer() {
    this.showDisclaimer = !this.showDisclaimer;
  }
}
