import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent {
  constructor(private router: Router,private toaster : ToastrService) {

  }
  carNumber: string = "";
  isBrandNew: boolean = false;
  savingPercentage: number = 91;

  handleViewPrices() {
    if (this.carNumber) {
      console.log("sear")
      this.router.navigate(['/bike-result'])
      return;
    }else{
      this.toaster.error("Enter car register number")
    }
    
    console.log("dumy")
  }

  handleBrandNewClick() {
    this.isBrandNew = true;
    console.log("User clicked: Brand new car");
    // Navigate or open modal for brand new car flow
  }
}
