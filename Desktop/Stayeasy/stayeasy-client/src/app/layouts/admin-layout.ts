import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './admin-layout.html'
})
export class AdminLayoutComponent implements OnInit {

  stats: any = {
    rooms: 0,
    bookings: 0,
    users: 0,
    revenue: 0
  };

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.http.get<any>('http://localhost:5000/api/admin/stats')
      .subscribe({
        next: (res) => {
          this.stats = res;
        },
        error: (err) => {
          console.log('Stats API error', err);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}