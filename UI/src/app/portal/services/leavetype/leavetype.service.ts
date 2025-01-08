import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeavetypeService {

  constructor(private httpClient : HttpClient) { }
    
      getAllLeavetype(){
        return this.httpClient.get("http://localhost:3000/api/get-all-leavetype");
      }
    
      addLeavetype(leavetype){
        return this.httpClient.post("http://localhost:3000/api/add-leavetype",leavetype);
      }
    
      updateLeavetype(leavetype){
        return this.httpClient.patch("http://localhost:3000/api/update-leavetype/"+leavetype._id,leavetype);
      }
      deleteLeavetype(id){
        return this.httpClient.delete("http://localhost:3000/api/delete-leavetype/"+id);
      }
    }
    
  
