import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private httpClient : HttpClient) { }
    getAllCandidates(){
      return this.httpClient.get("http://localhost:3000/api/get-all-candidate");
    }
  
    addCandidates(candidate){
      return this.httpClient.post("http://localhost:3000/api/add-candidate",candidate);
    }
  
    updateCandidates(candidate){
      return this.httpClient.patch("http://localhost:3000/api/update-candidate/"+candidate._id,candidate);
    }
    deleteCandidate(id){
      return this.httpClient.delete("http://localhost:3000/api/delete-candidate/"+id);
    }
  }
  

