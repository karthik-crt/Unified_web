import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

// CoreUI modules
import {
  CardModule,
  TableModule,
  ButtonModule,
  FormModule,
  GridModule,
  BadgeModule,
  PaginationModule
} from '@coreui/angular';

import { ApiService } from '../../../services/api.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    ButtonModule,
    FormModule,
    GridModule,
    BadgeModule,
    PaginationModule,
    RouterModule,
  ],
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  loading = false;

  users: any[] = [];

  // Filters
  searchText: string = '';
  statusFilter: string = '';
  roleFilter: string = 'customer';

  // Pagination
  page = 1;
  pageSize = 10;
  totalPages = 1;
  totalRecords = 0;

  ngOnInit(): void {
    this.getUsers();
  }

  // Fetch users with filters + pagination
  getUsers() {
    this.loading = true;

    const params: any = {
      page: this.page,
      page_size: this.pageSize
    };

    if (this.searchText) params.search = this.searchText;
    if (this.roleFilter) params.role = this.roleFilter;
    if (this.statusFilter) params.status = this.statusFilter;

    this.api.getUsers(params).subscribe({
      next: (res) => {
        this.loading = false;

        if (!res || res.StatusCode !== true) {
          console.error("Bad API response", res);
          return;
        }

        this.users = res.data.results.map((u: any) => ({
          id: u.id,
          name: u.email || u.mobile || 'Unknown',
          avatar: this.getAvatar(u),
          email: u.email || '-',
          mobile: u.mobile || '-',
          role: u.role,
          status: u.is_active ? 'Active' : 'Inactive',
          created_at: u.created_at
        }));

        this.totalRecords = res.data.count;
        this.totalPages = res.data.total_pages;
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
    this.getUsers();
  }

  // Pagination navigation
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.getUsers();
  }

  // Avatar initials
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

  editUser(user: any) {
    this.router.navigate(['/users', user.id, 'edit']);
  }

  // Delete user confirmation
  deleteUser(user: any) {
    Swal.fire({
      title: 'Delete User?',
      html: `
        <p style="font-size: 14px; margin-top: 10px;">
          This will permanently remove <b>${user.email || user.mobile}</b>.
        </p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#6b7280'
    }).then((res) => {
      if (res.isConfirmed) {
        this.performDelete(user.id);
      }
    });
  }

  performDelete(id: number) {
    this.loading = true;

    this.api.deleteUser(id).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.StatusCode === true || res.StatusCode === "1") {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'User has been removed.',
            timer: 1500,
            showConfirmButton: false
          });

          this.getUsers();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: res.StatusMessage || 'Unable to delete user.'
          });
        }
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong.',
        });
      }
    });
  }
  resetFilters() {
    this.searchText = '';
    this.statusFilter = '';
    this.roleFilter = '';
    this.page = 1;
    this.getUsers();
  }

}
