import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-policy-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './policy-list.component.html',
  styleUrl: './policy-list.component.scss'
})
export class PolicyListComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {}

  loading = false;

  policies: any[] = [];

  // Filters
  searchText: string = '';
  statusFilter: string = '';

  // Pagination
  page = 1;
  pageSize = 20;
  totalPages = 1;
  totalRecords = 0;

  ngOnInit(): void {
    this.getPolicies();
  }

  // Fetch policies with filters + pagination
  getPolicies() {
    this.loading = true;

    const params: any = {
      page: this.page,
      limit: this.pageSize
    };

    if (this.searchText) params.search = this.searchText;
    if (this.statusFilter) params.status = this.statusFilter;

    this.api.getPolicies(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res || res.StatusCode !== true) {
          console.error("Bad API response", res);
          return;
        }

        this.policies = res.data.policies.map((p: any) => ({
          id: p.id,
          policy_no: p.policy_no,
          user: p.user,
          premium: p.premium,
          status: p.status,
          created_at: p.created_at
        }));

        this.totalRecords = res.data.total;
        this.totalPages = Math.ceil(res.data.total / this.pageSize);
      },
      error: () => {
        this.loading = false;
        console.error("API error");
      }
    });
  }

  // Apply filters and reset to page 1
  applyFilters() {
    this.page = 1;
    this.getPolicies();
  }

  // Pagination navigation
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.getPolicies();
  }

  resetFilters() {
    this.searchText = '';
    this.statusFilter = '';
    this.page = 1;
    this.getPolicies();
  }
}
