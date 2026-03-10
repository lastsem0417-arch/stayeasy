import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // 🔥 ADD THIS

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ now valid
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class RoomsComponent implements OnInit {

  rooms: any[] = [];
  loading = true;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:5000/api/rooms')
      .subscribe(res => {
        this.rooms = res || [];
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
}