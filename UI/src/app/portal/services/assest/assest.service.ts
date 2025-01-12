import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssestService {

  constructor(private httpClient: HttpClient) { }

  getAllAssest() {
    return this.httpClient.get("http://localhost:3000/api/get-all-assest");
  }
  addAssest(assest) {
    return this.httpClient.post("http://localhost:3000/api/add-assest", assest);
  }

  updateAssest(assest) {
    return this.httpClient.patch("http://localhost:3000/api/update-assest/" + assest._id, assest);
  }
  deleteAssest(_id: string) {
    return this.httpClient.delete("http://localhost:3000/api/delete-assest/" + _id);
  }
}

