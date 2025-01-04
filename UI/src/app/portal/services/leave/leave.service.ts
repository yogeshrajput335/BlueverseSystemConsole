import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

 constructor(private httpClient : HttpClient) { }
  
    getAllLeave(){
      return this.httpClient.get("http://localhost:3000/api/get-all-leave");
    }
  
    addLeave(leave){
      return this.httpClient.post("http://localhost:3000/api/add-leave",leave);
    }
  
    updateLeaves(leave){
      return this.httpClient.patch("http://localhost:3000/api/update-leave/"+leave._id,leave);
    }
    deleteLeave(id){
      return this.httpClient.delete("http://localhost:3000/api/delete-leave/"+id);
    }
  }
  
