
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  selectedMethod: string = 'upi';
  debit = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  // Credit Card model
  credit = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  // NetBanking list
  banks = [
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra Bank'
  ];

  selectedBank: string = '';
  upiId: string = '';
  qrCodeData: string = '';
  sessionTime: number = 14 * 60 + 0; // 14 minutes (13:56 approx)
  sessionDisplay: string = '';

  ngOnInit(): void {
    this.generateQRCode('upi://pay?pa=9876543210@upi&pn=DemoUser&am=1456&cu=INR');
    this.startCountdown();
  }

  generateQRCode(text: string) {
    QRCode.toDataURL(text).then((url: string) => {
      this.qrCodeData = url;
    });
  }


  startCountdown() {
    this.updateTimeDisplay();

    setInterval(() => {
      if (this.sessionTime > 0) {
        this.sessionTime--;
        this.updateTimeDisplay();
      }
    }, 1000);
  }

  updateTimeDisplay() {
    const m = Math.floor(this.sessionTime / 60)
      .toString()
      .padStart(2, '0');
    const s = (this.sessionTime % 60).toString().padStart(2, '0');
    this.sessionDisplay = `${m}:${s}`;
  }
  selectMethod(method: string) {
    this.selectedMethod = method;
  }

  verifyAndPay() {
    console.log('UPI ID:', this.upiId);
    alert('UPI Verified & Payment Initiated');
  }

  payWithDebit() {
    console.log('Debit Details:', this.debit);
    alert('Debit Card Payment Processing...');
  }

  payWithCredit() {
    console.log('Credit Details:', this.credit);
    alert('Credit Card Payment Processing...');
  }

}
