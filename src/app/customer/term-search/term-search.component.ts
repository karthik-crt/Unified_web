import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-term-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './term-search.component.html',
  styleUrls: ['./term-search.component.scss']
})
export class TermSearchComponent {
  gender: 'Male' | 'Female' = 'Male';
  name: string = '';
  dob: string = '';
  mobile: string = '';
  age: number | null = null;
  daysToBirthday: number | null = null;

constructor(private router : Router){}
  onDobChange() {
    if (!this.dob) return;

    const birthDate = new Date(this.dob);
    const today = new Date();

    // Calculate Age
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasBirthdayPassedThisYear =
      today.getMonth() > birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() >= birthDate.getDate());

    if (!hasBirthdayPassedThisYear) {
      age--;
    }

    this.age = age;

    // Calculate next birthday
    let nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (today > nextBirthday) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const diffTime = nextBirthday.getTime() - today.getTime();
    this.daysToBirthday = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
viewPlans(){
  this.router.navigate(['term-result'])
}
}