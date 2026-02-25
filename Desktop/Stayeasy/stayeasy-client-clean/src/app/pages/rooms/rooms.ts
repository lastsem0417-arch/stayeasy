import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Available Rooms</h2>

    <p *ngIf="rooms.length === 0">No rooms available</p>

    <div *ngFor="let room of rooms">
      <h3>{{ room.name }}</h3>
      <p>{{ room.type }} - ₹{{ room.price }}</p>
    </div>
  `
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('ROOMS LOADED');

    this.http.get<any[]>('http://localhost:5000/api/rooms')
      .subscribe({
        next: (res) => {
          console.log('API RESPONSE:', res);
          this.rooms = res;
        },
        error: (err) => {
          console.error('API ERROR:', err);
        }
      });
  }
}