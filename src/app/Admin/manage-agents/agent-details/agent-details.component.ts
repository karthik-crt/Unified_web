import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit {

  userId!: number;
  user: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUserDetails();
  }

  getUserDetails() {
    this.api.getSingleAgent(this.userId).subscribe({
      next: (res) => {
        this.loading = false;
        console.log(res);
        if (res.StatusCode == 1) {
          this.user = res.data;
        }
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}