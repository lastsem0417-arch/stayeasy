import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-admin-add-room',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-add-room.html',
  styleUrls: ['./admin-add-room.css']
})
export class AdminAddRoomComponent {

  room = {
    name: '',
    type: '',
    price: 0,
    image: ''
  };

  constructor(private http: HttpClient) {}

  addRoom() {
    this.http.post('http://localhost:5000/api/rooms', this.room)
      .subscribe(() => {
        alert('Room added successfully');
        this.room = { name:'', type:'', price:0, image:'' };
      });
  }
}