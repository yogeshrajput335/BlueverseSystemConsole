import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurdService {

  constructor(private httpClient: HttpClient) { }

  getAllCurd() {
    return this.httpClient.get("http://localhost:3000/api/get-all-curd");
  }

  addCurd(curd) {
    return this.httpClient.post("http://localhost:3000/api/add-curd", curd);
  }

  updateCurd(curd) {
    return this.httpClient.patch("http://localhost:3000/api/update-curd/" + curd._id, curd);
  }
  deleteCurd(id) {
    return this.httpClient.delete("http://localhost:3000/api/delete-curd/" + id);
  }
}
