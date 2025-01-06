import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private httpClient: HttpClient) { }

  getAllPayroll() {
    return this.httpClient.get("http://localhost:3000/api/get-all-payroll");
  }
  addPayroll(payroll) {
    return this.httpClient.post("http://localhost:3000/api/add-payroll", payroll);
  }

  updatePayroll(payroll) {
    return this.httpClient.patch("http://localhost:3000/api/update-payroll/" + payroll._id, payroll);
  }
  deletePayroll(id) {
    return this.httpClient.delete("http://localhost:3000/api/delete-payroll/" + id);
  }
}

