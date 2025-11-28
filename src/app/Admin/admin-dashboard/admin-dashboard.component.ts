import { Component, OnInit } from '@angular/core';
import { DecimalPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [DecimalPipe, NgFor, NgIf, NgStyle],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashboardData: any;
  // dashboardData = {
  //   total_users: 142890,
  //   new_users_today: 387,
  //   kyc_verified: 128456,
  //   kyc_pending: 317,
  //   total_premium_collected: 48200000,
  //   sessions: 28934,
  //   revenue_today: 1845670,
  //   revenue_this_month: 48200000,
  //   policies_today: 842,
  //   policies_today_vs_yesterday: 124,
  //   failed_payments_today: 23,
  //   top_partners: [
  //     { name: "Star Health", revenue: 11200000, policies: 1847 },
  //     { name: "HDFC Life", revenue: 8900000, policies: 1523 },
  //     { name: "ICICI Prudential", revenue: 7400000, policies: 1289 },
  //     { name: "Bajaj Allianz", revenue: 6100000, policies: 1056 },
  //     { name: "SBI Life", revenue: 4800000, policies: 892 }
  //   ],
  //   top_agents: [
  //     { name: "Rahul Sharma", revenue: 1840000, policies: 142 },
  //     { name: "Priya Mehta", revenue: 1520000, policies: 118 },
  //     { name: "Amit Patel", revenue: 1380000, policies: 107 },
  //     { name: "Sneha Kumar", revenue: 1250000, policies: 98 },
  //     { name: "Vikram Singh", revenue: 1120000, policies: 89 }
  //   ],
  //   conversion_funnel: {
  //     quotes_generated: 24512,
  //     payment_initiated: 6821,
  //     policies_issued: 6208
  //   },
  //   revenue_trend: {
  //     labels: ["12 Nov","13 Nov","14 Nov","15 Nov","16 Nov","17 Nov","18 Nov","19 Nov","20 Nov","21 Nov","22 Nov","23 Nov","24 Nov","25 Nov","26 Nov"],
  //     values: [1245000,1389000,1156000,1478000,1523000,892000,756000,1678000,1845000,1923000,1756000,1889000,1634000,1923000,1845670]
  //   },
  //   product_category_split: {
  //     labels: ["Health","Term Life","Motor","Travel"],
  //     values: [48,29,15,8]
  //   },
  //   latest_policies: [
  //     { policy_no: "POL2024112701", customer: "Rajesh Kumar", product: "Health Plus", premium: 15420, partner: "Star Health", time: "2 mins ago" },
  //     { policy_no: "POL2024112702", customer: "Anjali Verma", product: "Term Life Pro", premium: 28900, partner: "HDFC Life", time: "5 mins ago" },
  //     { policy_no: "POL2024112703", customer: "Suresh Babu", product: "Comprehensive Motor", premium: 12350, partner: "Bajaj Allianz", time: "8 mins ago" },
  //     { policy_no: "POL2024112704", customer: "Meena Iyer", product: "Family Health", premium: 22100, partner: "Star Health", time: "12 mins ago" },
  //     { policy_no: "POL2024112705", customer: "Karthik Reddy", product: "Travel Shield", premium: 3500, partner: "ICICI Pru", time: "15 mins ago" },
  //     { policy_no: "POL2024112706", customer: "Divya Nair", product: "Senior Citizen Health", premium: 18750, partner: "SBI Life", time: "18 mins ago" },
  //     { policy_no: "POL2024112707", customer: "Manoj Tiwari", product: "Term Insurance", premium: 24600, partner: "HDFC Life", time: "22 mins ago" },
  //     { policy_no: "POL2024112708", customer: "Lakshmi Devi", product: "Health Guard", premium: 16890, partner: "Star Health", time: "25 mins ago" },
  //     { policy_no: "POL2024112709", customer: "Arjun Rao", product: "Motor Plus", premium: 14200, partner: "Bajaj Allianz", time: "28 mins ago" },
  //     { policy_no: "POL2024112710", customer: "Priya Shah", product: "Life Shield", premium: 31500, partner: "SBI Life", time: "32 mins ago" }
  //   ]
  // };

  // SVG chart geometry and computed points
  svgWidth = 760;
  svgHeight = 260;
  leftPadding = 48;
  rightPadding = 20;
  topPadding = 20;
  bottomPadding = 40;

  areaPoints = '';
  linePoints = '';
  circlePoints: Array<{ x: number, y: number }> = [];
  yAxisLabels: number[] = [];
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.getDashboardData();
  }

  // --- Helpers ---
  formatCurrency(amount: number) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    return `₹${amount.toLocaleString('en-IN')}`;
  }
  getDashboardData() {
    this.api.adminDashboard().subscribe((res) => {
      this.dashboardData = res.data;   // 👈 FIX
      this.computeChartPoints();       // recompute with correct data
    });
  }

  // compute simple SVG path points for revenue_trend
  computeChartPoints() {
    const vals = this.dashboardData.revenue_trend.values;
    const count = vals.length;
    const usableWidth = this.svgWidth - this.leftPadding - this.rightPadding;
    const step = usableWidth / (count - 1);
    const maxVal = Math.max(...vals) * 1.05; // little headroom
    const chartHeight = this.svgHeight - this.topPadding - this.bottomPadding;

    const pts: string[] = [];
    this.circlePoints = [];

    vals.forEach((val: number, idx: number) => {
      const x = this.leftPadding + (idx * step);
      const normalized = val / maxVal;
      const y = this.topPadding + (chartHeight * (1 - normalized));
      pts.push(`${x},${y}`);
      this.circlePoints.push({ x, y });
    });

    const baselineY = this.topPadding + chartHeight;
    this.areaPoints = `${this.leftPadding},${baselineY} ` + pts.join(' ') + ` ${this.leftPadding + (count - 1) * step},${baselineY}`;
    this.linePoints = pts.join(' ');

    // Y-axis label values (equally spaced)
    const steps = 4;
    this.yAxisLabels = [];
    for (let i = 0; i <= steps; i++) {
      this.yAxisLabels.push(Math.round((maxVal / steps) * (steps - i)));
    }
  }

  highestRevenue(): number {
    return Math.max(...this.dashboardData.revenue_trend.values);
  }

  lowestRevenue(): number {
    return Math.min(...this.dashboardData.revenue_trend.values);
  }
  getCategoryOffset(i: number): number {
    if (!this.dashboardData?.product_category_split?.values) return 0;

    const values: number[] = this.dashboardData.product_category_split.values;

    const sumBefore = values.slice(0, i).reduce(
      (acc: number, v: number) => acc + v,
      0
    );

    return -((sumBefore / 100) * 377);
  }

  // safe percent formatting
  pct(part: number, total: number) {
    if (!total) return 0;
    return +((part / total) * 100).toFixed(1);
  }
}
