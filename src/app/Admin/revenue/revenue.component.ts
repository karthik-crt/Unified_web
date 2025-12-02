import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-revenue',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './revenue.component.html',
  styleUrl: './revenue.component.scss'
})
export class RevenueComponent implements OnInit {

  constructor(private api: ApiService) {}

  loading = false;

  // Filters
  start_date = '';
  end_date = '';
  group_by = '';

  // Revenue Data
  revenueData: any = null;
  breakdown: any[] = [];

  ngOnInit(): void {
    this.fetchRevenue();
  }

  fetchRevenue() {
    this.loading = true;

    const params: any = {};
    if (this.start_date) params.start_date = this.start_date;
    if (this.end_date) params.end_date = this.end_date;
    if (this.group_by) params.group_by = this.group_by;

    this.api.getRevenue(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res || res.StatusCode !== true) {
          console.error("Bad response", res);
          return;
        }

        this.revenueData = res.data;
        this.breakdown = res.data.breakdown || [];
      },
      error: () => {
        this.loading = false;
        console.error("Revenue API error");
      }
    });
  }

  resetFilters() {
    this.start_date = '';
    this.end_date = '';
    this.group_by = '';
    this.fetchRevenue();
  }
}
