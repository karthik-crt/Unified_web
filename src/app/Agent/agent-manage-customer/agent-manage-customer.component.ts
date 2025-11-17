import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from '@coreui/angular';

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
import { AgentApiService } from '../agent-services/agent-api.service';
import { ToastrService } from 'ngx-toastr';
interface Customer {
  name: string;
  customer_id: string;
  mobile: string;
  email: string;
  kyc_status: 'verified' | 'pending' | 'rejected';
  created_at: Date;
}
@Component({
  selector: 'app-agent-manage-customer',
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
    ModalModule
  ],
  templateUrl: './agent-manage-customer.component.html',
  styleUrl: './agent-manage-customer.component.scss'
})
export class AgentManageCustomerComponent implements OnInit {
  constructor(private api: AgentApiService, private toaster: ToastrService) { }
  public loading = false;
  showAddForm = false;
  newCustomer: any = {
    mobile: '',
    full_name: '',
    email: '',
    dob: ''
  };
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

    this.api.getCustomer().subscribe({
      next: (res) => {
        this.loading = false;

        if (res.statusCode === "1") {
          this.users = res.data.map((u: any) => ({
            id: u.id,
            name: u.full_name || u.user?.email || u.user?.mobile || "Unknown",
            avatar: this.getAvatar(u),
            email: u.user?.email || u.email || "-",
            mobile: u.user?.mobile || u.mobile || "-",
            role: u.user?.role || "customer",
            status: u.user?.is_active ? "Active" : "Inactive",
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
    const text = user.full_name || user.user?.email || user.user?.mobile || "NA";
    const initials = text
      .split(" ")
      .filter((x: any) => x)
      .slice(0, 2)
      .map((w: string) => w[0]?.toUpperCase())
      .join("");
    return initials || "U";
  }

  submitCustomer() {
    this.loading = true;
    console.log("entered")
    this.api.createCustomer(this.newCustomer).subscribe({
      next: (res) => {
        console.log("this.shwo", this.showAddForm)
        console.log("result.statuscode", res.statusCode)
        if (res.statusCode === "1") {

          this.showAddForm = false;  // close modal
          console.log("this.shwo", this.showAddForm)
          this.newCustomer = { mobile: '', full_name: '', email: '', dob: '' };

          this.toaster.success("Customer Added Successfully"); // show toast

          this.getUsers();   // reload list
        } else {
          this.toaster.error("Failed to add customer");
        }

        this.loading = false;  // hide loader LAST
      },
      error: () => {
        this.loading = false;
        this.toaster.error("Failed to add customer");
      }
    });
  }


}
