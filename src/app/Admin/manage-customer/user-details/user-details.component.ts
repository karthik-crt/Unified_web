import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="details-container" *ngIf="loading">Loading user details...</div>

    <div class="details-container" *ngIf="!loading && user">
      <h2>User Details</h2>

      <!-- BASIC USER INFO -->
      <section>
        <h3>Basic Information</h3>
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Email:</strong> {{ user.email || 'N/A' }}</p>
        <p><strong>Mobile:</strong> {{ user.mobile || 'N/A' }}</p>
        <p><strong>Role:</strong> {{ user.role | titlecase }}</p>
        <p><strong>Status:</strong> {{ user.is_active ? 'Active' : 'Inactive' }}</p>
        <p><strong>Created At:</strong> {{ user.created_at | date:'medium' }}</p>
      </section>

      <hr>

      <!-- PROFILE -->
      <section>
        <h3>Profile</h3>
        <p><strong>Full Name:</strong> {{ user.profile?.full_name || 'N/A' }}</p>
        <p><strong>Email:</strong> {{ user.profile?.email || 'N/A' }}</p>
        <p><strong>DOB:</strong> {{ user.profile?.dob || 'N/A' }}</p>
        <p><strong>Gender:</strong> {{ user.profile?.gender || 'N/A' }}</p>
        <p><strong>Address Line 1:</strong> {{ user.profile?.address_line1 || 'N/A' }}</p>
        <p><strong>Address Line 2:</strong> {{ user.profile?.address_line2 || 'N/A' }}</p>
        <p><strong>City:</strong> {{ user.profile?.city || 'N/A' }}</p>
        <p><strong>State:</strong> {{ user.profile?.state || 'N/A' }}</p>
        <p><strong>Pincode:</strong> {{ user.profile?.pincode || 'N/A' }}</p>
        <p><strong>Updated At:</strong> {{ user.profile?.updated_at | date:'medium' }}</p>
      </section>

      <hr>

      <!-- PREFERENCES -->
      <section>
        <h3>Preferences</h3>
        <p><strong>Notify SMS:</strong> {{ formatBool(user.preference?.notify_sms) }}</p>
        <p><strong>Notify Email:</strong> {{ formatBool(user.preference?.notify_email) }}</p>
        <p><strong>Notify Push:</strong> {{ formatBool(user.preference?.notify_push) }}</p>
        <p><strong>Dark Mode:</strong> {{ formatBool(user.preference?.dark_mode) }}</p>
        <p><strong>Language:</strong> {{ user.preference?.language || 'N/A' }}</p>
        <p><strong>Currency:</strong> {{ user.preference?.currency || 'N/A' }}</p>
      </section>

      <hr>

      <!-- KYC -->
      <section>
        <h3>KYC Information</h3>
        <p><strong>PAN Number:</strong> {{ user.kyc?.pan_number || 'N/A' }}</p>
        <p><strong>PAN Status:</strong> {{ user.kyc?.pan_status || 'N/A' }}</p>
        <p><strong>PAN Verified:</strong> {{ formatBool(user.kyc?.pan_verified) }}</p>

        <p><strong>Aadhaar Last 4:</strong> {{ user.kyc?.aadhaar_last_4 || 'N/A' }}</p>
        <p><strong>Aadhaar Name:</strong> {{ user.kyc?.aadhaar_name || 'N/A' }}</p>
        <p><strong>Aadhaar DOB:</strong> {{ user.kyc?.aadhaar_dob || 'N/A' }}</p>
        <p><strong>Aadhaar Verified:</strong> {{ formatBool(user.kyc?.aadhaar_verified) }}</p>

        <p><strong>Overall Status:</strong> {{ user.kyc?.overall_status || 'N/A' }}</p>
        <p><strong>Fully Verified:</strong> {{ formatBool(user.kyc?.is_fully_verified) }}</p>
      </section>

      <hr>

      <!-- DOCUMENTS -->
      <section>
        <h3>Documents</h3>

        <div *ngIf="user.documents?.length === 0">
          No documents uploaded.
        </div>

        <div *ngFor="let doc of user.documents" class="document-card">
          <p><strong>Document Type:</strong> {{ doc.doc_type }}</p>
          <p><strong>Verified:</strong> {{ formatBool(doc.verified) }}</p>
          <p><strong>Uploaded:</strong> {{ doc.uploaded_at | date:'medium' }}</p>

          <div *ngIf="doc.file">
            <a [href]="doc.file" target="_blank">View File</a>
          </div>
        </div>
      </section>

      <button class="back-btn" (click)="goBack()">⬅ Back</button>
    </div>
  `,
  styles: [`
    .details-container {
      max-width: 800px;
      margin: 40px auto;
      padding: 25px;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    h2, h3 { margin-bottom: 10px; }
    section p { margin: 5px 0; }
    hr { margin: 20px 0; }
    .document-card {
      padding: 10px;
      background: #f8fafc;
      border-radius: 6px;
      margin-bottom: 12px;
      border: 1px solid #e5e7eb;
    }
    .back-btn {
      margin-top: 20px;
      padding: 8px 16px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 6px;
      cursor: pointer;
    }
  `]
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
