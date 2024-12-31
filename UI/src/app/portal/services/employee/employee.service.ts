import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient : HttpClient) { }

  getAllEmployees(){
    return this.httpClient.get("http://localhost:3000/api/get-all-employee");
  }
}
