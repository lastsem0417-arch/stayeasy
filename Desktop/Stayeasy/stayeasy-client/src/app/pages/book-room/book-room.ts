import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-book-room',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-room.html',
  styleUrls: ['./book-room.css']
})
export class BookRoomComponent implements OnInit {

  roomId = '';
  room: any = null;
  loading = true;

  booking = {
    checkIn: '',
    nights: 1
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.roomId = this.route.snapshot.params['id'];
    this.loadRoomDetails();
  }

  loadRoomDetails() {
    this.http
      .get<any>(`http://localhost:5000/api/rooms/${this.roomId}`)
      .subscribe(res => {
        console.log('ROOM DETAIL 👉', res);
        this.room = res;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  bookRoom() {
    const userId = localStorage.getItem('userId');

    this.http.post('http://localhost:5000/api/bookings', {
      roomId: this.roomId,
      userId,
      ...this.booking
    }).subscribe(() => {
      alert('Booking successful');
    });
  }
}