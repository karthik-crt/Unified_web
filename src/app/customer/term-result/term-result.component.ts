import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './term-result.component.html',
  styleUrls: ['./term-result.component.scss']
})
export class TermResultComponent { 
constructor(private router : Router){

}
  PaymentPage(){
    console.log("data")
    this.router.navigate(['payment'])
  }
}