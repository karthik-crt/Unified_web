import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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

interface Customer {
  name: string;
  customer_id: string;
  mobile: string;
  email: string;
  kyc_status: 'verified' | 'pending' | 'rejected';
  created_at: Date;
}

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
  public loading = false;
  customers: Customer[] = [
    {
      name: 'Arun Kumar',
      customer_id: 'CUST001',
      mobile: '9876543210',
      email: 'arun@example.com',
      kyc_status: 'verified',
      created_at: new Date()
    }
  ];
  users: any;
  searchText = '';
  statusFilter = '';
  sortBy = '';
  page = 1;
  totalPages = 5;
  totalCount = 120;

  get totalPagesArray() {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
  ngOnInit(): void {
    this.getUsers();
  }
  resetFilters() { }
  viewUser(user: Customer) { }
  changePage(p: number) { this.page = p; }
  getUsers() {
    this.loading = true;

    this.api.getUserList().subscribe({
      next: (res) => {
        this.loading = false;

        if (res.StatusCode === "1") {
          this.users = res.data.map((u: any) => ({
            id: u.id,
            name: u.email || u.mobile || "Unknown",
            avatar: this.getAvatar(u),
            email: u.email || "-",
            mobile: u.mobile || "-",
            role: u.role,
            status: u.is_active ? "Active" : "Inactive",
            created_at: new Date(u.created_at)
          }));
        }
      },
      error: () => {
        this.loading = false;
      }
    });
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
  editUser(user: any) {
    this.router.navigate(['/users', user.id, 'edit']);
  }
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
    }).then((result) => {
      if (result.isConfirmed) {
        this.performDelete(user.id);
      }
    });
  }
  performDelete(id: number) {
  this.loading = true;

  this.api.deleteUser(id).subscribe({
    next: (res) => {
      this.loading = false;

      if (res.StatusCode === "1") {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'User has been removed.',
          timer: 1500,
          showConfirmButton: false
        });

        this.getUsers(); // refresh list
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

}
