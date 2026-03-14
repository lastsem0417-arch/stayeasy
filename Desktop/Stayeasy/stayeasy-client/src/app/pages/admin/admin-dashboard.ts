import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  standalone:true,
  imports:[CommonModule],
  templateUrl:'./admin-dashboard.html'
})
export class AdminDashboardComponent implements OnInit{

  stats:any={rooms:0, bookings:0, users:0};

  constructor(private http:HttpClient){}

  ngOnInit(){

    this.http.get<any>('http://localhost:5000/api/admin/stats')
    .subscribe(res=>{
      this.stats=res;
    });

  }

}