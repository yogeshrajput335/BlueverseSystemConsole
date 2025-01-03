import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendenceService {

  constructor(private httpClient : HttpClient) { }
    getAllAttendence(){
      return this.httpClient.get("http://localhost:3000/api/get-all-attendence");
    }
    addAttendence(attendence){
      return this.httpClient.post("http://localhost:3000/api/add-attendence",attendence);
    }
    updateAttendence(attendence){
      return this.httpClient.patch("http://localhost:3000/api/update-attendence/"+attendence._id,attendence);
    }
}  




