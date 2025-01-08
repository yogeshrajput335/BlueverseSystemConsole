import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }
  
    getAllCategory(){
      return this.httpClient.get("http://localhost:3000/api/get-all-category");
    }
  
    addCategory(category){
      return this.httpClient.post("http://localhost:3000/api/add-category",category);
    }
  
    updateCategory(category){
      return this.httpClient.patch("http://localhost:3000/api/update-category/"+category._id,category);
    }
    deleteCategory(id){
      return this.httpClient.delete("http://localhost:3000/api/delete-category/"+id);
    }
  }
  

