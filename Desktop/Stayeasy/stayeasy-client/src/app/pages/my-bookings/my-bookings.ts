import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-my-bookings',
  imports: [CommonModule],
  templateUrl: './my-bookings.html'
})
export class MyBookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('userId');

    this.http
      .get<any[]>(`http://localhost:5000/api/bookings/user/${userId}`)
      .subscribe(res => {
        console.log('USER BOOKINGS 👉', res);

        this.bookings = res || [];
        this.loading = false;
        this.cdr.detectChanges(); // 🔥 force UI update
      });
  }
}