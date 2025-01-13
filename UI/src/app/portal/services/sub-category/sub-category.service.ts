import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategory } from '../../models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  deleteSelectedSubcategories(idsToDelete: string[]) {
    throw new Error('Method not implemented.');
  }
  save(subcategory: Subcategory) {
    throw new Error('Method not implemented.');
  }

  
  constructor(private httpClient : HttpClient) { }
    
      getAllSubcategory(){
        return this.httpClient.get("http://localhost:3000/api/get-all-subcategory");
      }
    
      addSubcategory(subcategory){
        return this.httpClient.post("http://localhost:3000/api/add-subcategory",subcategory);
      }
    
      updateSubcategory(subcategory){
        return this.httpClient.patch("http://localhost:3000/api/update-subcategory/"+subcategory._id,subcategory);
      }
      deleteSubcategory(id){
        return this.httpClient.delete("http://localhost:3000/api/delete-subcategory/"+id);
      }
    }
    
  
  

