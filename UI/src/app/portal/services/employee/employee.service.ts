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

  addEmployees(employee){
    return this.httpClient.post("http://localhost:3000/api/add-employee",employee);
  }

  updateEmployees(employee){
    return this.httpClient.patch("http://localhost:3000/api/update-employee/"+employee._id,employee);
  }
  deleteEmployee(id){
    return this.httpClient.delete("http://localhost:3000/api/delete-employee/"+id);
  }
}
