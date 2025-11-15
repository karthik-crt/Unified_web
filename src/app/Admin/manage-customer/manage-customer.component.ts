import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    DatePipe,
  ],
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  constructor(private api: ApiService) { }
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
  editUser(user: Customer) { }
  deleteUser(user: Customer) { }
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

}
