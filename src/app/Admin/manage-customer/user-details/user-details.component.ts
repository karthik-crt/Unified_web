import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  loading = false;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.fetchUser(userId);
  }

  fetchUser(id: any) {
    this.loading = true;

    this.api.getSingleUser(id).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.StatusCode === "1") {
          this.user = res.data;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  /** Convert true/false/null to Yes/No/N/A */
  formatBool(value: any): string {
    if (value === true) return "Yes";
    if (value === false) return "No";
    return "N/A";
  }

  goBack() {
    history.back();
  }
}