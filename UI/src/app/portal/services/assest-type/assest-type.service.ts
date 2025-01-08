import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssestTypeService {
  constructor(private httpClient: HttpClient) { }

  getAllAssesttype() {
    return this.httpClient.get("http://localhost:3000/api/get-all-assesttype");
  }
  addAssesttype(assesttype) {
    return this.httpClient.post("http://localhost:3000/api/add-assesttype", assesttype);
  }

  updateAssesttype(assesttype) {
    return this.httpClient.patch("http://localhost:3000/api/update-assesttype/" + assesttype._id, assesttype);
  }
  deleteAssesttype(id) {
    return this.httpClient.delete("http://localhost:3000/api/delete-assesttype/" + id);
  }
}


