import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-edit-agent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-agent.component.html',
  styleUrl: './edit-agent.component.scss'
})
export class EditAgentComponent implements OnInit {

  userId: any;
  loading = false;
  saving = false;

  form: any = {
    email: '',
    mobile: '',
    is_active: true
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.loadAgent();
  }

  loadAgent() {
    this.loading = true;

    this.api.getSingleAgent(this.userId).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.StatusCode === "1") {
          const u = res.data;
          this.form.email = u.email;
          this.form.mobile = u.mobile;
          this.form.is_active = u.is_active;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  saveUser() {
    this.saving = true;

    const payload = {
      email: this.form.email,
      mobile: this.form.mobile,
      is_active: this.form.is_active
    };

    this.api.updateAgent(this.userId, payload).subscribe({
      next: (res) => {
        this.saving = false;

        if (res.StatusCode === "1") {
          this.router.navigate(['/manage-agents']);
        }
      },
      error: () => {
        this.saving = false;
      }
    });
  }

  cancel() {
    this.router.navigate(['/manage-agents']);
  }
}
