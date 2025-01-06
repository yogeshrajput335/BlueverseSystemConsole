import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

   constructor(private httpClient : HttpClient) { }
  
    getAllClients(){
      return this.httpClient.get("http://localhost:3000/api/get-all-client");
    }
  
    addClients(client){
      return this.httpClient.post("http://localhost:3000/api/add-client",client);
    }
  
    updateClients(client){
      return this.httpClient.patch("http://localhost:3000/api/update-client/"+client._id,client);
    }
    deleteClient(id){
      return this.httpClient.delete("http://localhost:3000/api/delete-client/"+id);
    }  
}
