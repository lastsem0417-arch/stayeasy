import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {

  API = 'http://localhost:5000/api/bookings';

  constructor(private http: HttpClient) {}

  // ✅ BOOK ROOM (FIX)
  bookRoom(data: any) {
    return this.http.post(this.API, data);
  }

  // ✅ MY BOOKINGS
  myBookings() {
    return this.http.get(`${this.API}/my`);
  }
}