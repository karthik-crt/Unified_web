import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-transcations-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './transcations-history.component.html',
  styleUrl: './transcations-history.component.scss'
})
export class TranscationsHistoryComponent implements OnInit {

  constructor(private api: ApiService) { }

  loading = false;

  // Data List
  transactions: any[] = [];

  // Filters
  searchText: string = '';
  statusFilter: string = '';

  // Pagination
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;

  ngOnInit(): void {
    this.getTransactions();
  }

  // Fetch Transactions
  getTransactions() {
    this.loading = true;

    const params: any = {
      page: this.page,
      limit: this.pageSize,
    };

    if (this.searchText) params.search = this.searchText;
    if (this.statusFilter) params.status = this.statusFilter;

    this.api.getTransactionHistory(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res || res.StatusCode !== true) {
          console.error("Invalid response", res);
          return;
        }

        const data = res.data;

        this.transactions = data.results.map((t: any) => ({
          id: t.id,
          txn_reference_id: t.txn_reference_id,
          amount: t.amount,
          status: t.status,
          gateway: t.gateway,
          created_at: t.created_at,
          user_mobile: t.user_mobile,
          agent_mobile: t.agent_mobile
        }));

        this.totalRecords = data.count;
        this.totalPages = Math.ceil(data.count / this.pageSize);
      },
      error: () => {
        this.loading = false;
        console.error("API Error");
      }
    });
  }

  // Apply Filters
  applyFilters() {
    this.page = 1;
    this.getTransactions();
  }

  // Reset Filters
  resetFilters() {
    this.searchText = '';
    this.statusFilter = '';
    this.page = 1;
    this.getTransactions();
  }

  // Pagination
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.page = page;
    this.getTransactions();
  }
}
