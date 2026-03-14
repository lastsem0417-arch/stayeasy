import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
 standalone:true,
 imports:[CommonModule],
 templateUrl:'./admin-rooms.html'
})
export class AdminRoomsComponent implements OnInit{

 rooms:any[]=[];

 constructor(private http:HttpClient){}

 ngOnInit(){
  this.loadRooms();
 }

 loadRooms(){

  this.http.get<any[]>('http://localhost:5000/api/rooms')
  .subscribe(res=>{
   this.rooms=res;
  });

 }

 deleteRoom(id:string){

  if(confirm("Delete room?")){

   this.http.delete(`http://localhost:5000/api/rooms/${id}`)
   .subscribe(()=>{
     this.loadRooms();
   });

  }

 }

}