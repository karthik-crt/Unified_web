import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardModule, TableModule, ButtonModule, FormModule,
  GridModule, BadgeModule, PaginationModule
} from '@coreui/angular';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-manage-agents',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    CardModule, TableModule, ButtonModule,
    FormModule, GridModule, BadgeModule, PaginationModule
  ],
  templateUrl: './manage-agents.component.html',
  styleUrls: ['./manage-agents.component.scss']
})
export class ManageAgentsComponent implements OnInit {

  constructor(private api: ApiService) { }

  loading = false;

  users: any[] = [];
  searchText = '';
  statusFilter = '';
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalCount = 0;

  ngOnInit() {
    this.getUsers();
  }

  applyFilters() {
    this.page = 1; // reset to first page
    this.getUsers();
  }

  changePage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.getUsers();
  }

  getUsers() {
    this.loading = true;

    const params = {
      search: this.searchText,
      status: this.statusFilter,
      role: 'agent',             // fixed for agent screen
      page: this.page,
      page_size: this.pageSize
    };

    this.api.getUsers(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.StatusCode === true) {
          this.users = res.data.results.map((u: any) => ({
            id: u.id,
            name: u.email || u.mobile || "Unknown",
            avatar: this.getAvatar(u),
            email: u.email || "-",
            mobile: u.mobile || "-",
            role: u.role,
            status: u.is_active ? "Active" : "Inactive",
            created_at: new Date(u.created_at)
          }));

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
    this.getUsers();
  }

  getAvatar(user: any) {
    const text = user.email || user.mobile || "NA";
    const initials = text
      .split("@")[0]
      .split(/[^A-Za-z]/)
      .filter((x: any) => x)
      .slice(0, 2)
      .map((w: string) => w[0]?.toUpperCase())
      .join("");

    return initials || "U";
  }
}
