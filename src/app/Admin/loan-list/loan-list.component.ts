import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardModule, TableModule, ButtonModule, FormModule,
  GridModule, BadgeModule, PaginationModule
} from '@coreui/angular';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    CardModule, TableModule, ButtonModule,
    FormModule, GridModule, BadgeModule, PaginationModule
  ],
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss']
})
export class LoanListComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  loading = false;

  loans: any[] = [];
  searchText = '';
  statusFilter = '';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  ngOnInit() {
    this.getLoans();
  }

  applyFilters() {
    this.page = 1;
    this.getLoans();
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.getLoans();
  }

  getLoans() {
    this.loading = true;

    const params = {
      search: this.searchText,
      status: this.statusFilter,
      page: this.page,
      page_size: this.pageSize
    };

    this.api.getLoanApplications(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.StatusCode === true) {
          this.loans = res.data.results;

          this.page = res.data.page;
          this.pageSize = res.data.page_size;
          this.totalCount = res.data.count;
          this.totalPages = res.data.total_pages;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  resetFilters() {
    this.searchText = '';
    this.statusFilter = '';
    this.page = 1;
    this.getLoans();
  }

  getInitials(text: string): string {
    if (!text) return 'U';
    return text.charAt(0).toUpperCase();
  }
}
