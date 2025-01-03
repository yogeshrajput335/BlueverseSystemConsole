import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllUser() {
    return this.httpClient.get("http://localhost:3000/api/get-all-user");
  }
  addUser(user) {
    return this.httpClient.post("http://localhost:3000/api/add-user", user);
  }

  updateUser(user) {
    return this.httpClient.patch("http://localhost:3000/api/update-user/" + user._id, user);
  }
  deleteUser(user) {
    return this.httpClient.delete("http://localhost:3000/api/update-user", user);
  }
}


