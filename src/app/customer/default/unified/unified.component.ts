import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  ],
})
export class UnifiedComponent {
constructor(private router : Router){}
  loginPage() {
    this.router.navigate(['/login-customer'])
  }
  action(type :string){
    console.log("/"+type)
    this.router.navigate(['/'+type])

  }
}
