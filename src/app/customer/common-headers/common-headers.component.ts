import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-headers',
  imports: [],
  templateUrl: './common-headers.component.html',
  styleUrl: './common-headers.component.scss'
})
export class CommonHeadersComponent {

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
