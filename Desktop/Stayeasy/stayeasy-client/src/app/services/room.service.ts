import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RoomService {

  API = 'http://localhost:5000/api/rooms';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<any[]>(this.API);
  }

  addRoom(data: any) {
    return this.http.post(this.API, data);
  }
}