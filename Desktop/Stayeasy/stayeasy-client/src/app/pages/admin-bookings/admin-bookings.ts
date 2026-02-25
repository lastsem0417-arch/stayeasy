import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-admin-bookings',
  imports: [CommonModule],
  templateUrl: './admin-bookings.html'
})
export class AdminBookingsComponent implements OnInit {

  bookings: any[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.http.get<any[]>('http://localhost:5000/api/bookings/all')
      .subscribe(res => {
        this.bookings = res || [];
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  deleteBooking(id: string) {
    if (!confirm('Delete this booking?')) return;

    this.http.delete(`http://localhost:5000/api/bookings/${id}`)
      .subscribe(() => {
        alert('Booking deleted');
        this.loadBookings(); // 🔥 REFRESH LIST
      });
  }
}