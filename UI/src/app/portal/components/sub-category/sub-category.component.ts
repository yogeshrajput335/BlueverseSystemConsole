import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { SubCategoryService } from '../../services/sub-category/sub-category.service';
import { Subcategory } from '../../models/subcategory';
import { Product } from 'src/app/demo/api/product';
import { Table } from 'primeng/table';
import { EmployeeService } from '../../services/employee/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrl: './sub-category.component.scss'
})
export class SubCategoryComponent implements OnInit {
 _id:any;

  subcategoryDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  employees: Employee[]=[];

  displayDialog: boolean=false;

  subcategorys: Subcategory[] = [];

  subcategory: Subcategory = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  
  

  constructor(private productService: ProductService, private messageService: MessageService,
   private subcategoryService: SubCategoryService,private employeeService:EmployeeService
  ) { }

  ngOnInit() {
    this.loadEmployees();
    this.loadGrid();

      this.cols = [
          { field: 'product', header: 'Product' },
          { field: 'price', header: 'Price' },
          { field: 'category', header: 'Category' },
          { field: 'rating', header: 'Reviews' },
          { field: 'inventoryStatus', header: 'Status' }
      ];

    //   this.statuses = [
    //       { label: 'INSTOCK', value: 'instock' },
    //       { label: 'LOWSTOCK', value: 'lowstock' },
    //       { label: 'OUTOFSTOCK', value: 'outofstock' }
    //   ];
  }
      loadEmployees(){
          this.employeeService.getAllEmployees().subscribe((data: Subcategory[]) => this.employees = data);
      }

  loadGrid(){
    this.subcategoryService.getAllSubcategory().subscribe((data:Subcategory[]) => this.subcategorys= data);
  }

  openNew() {
      this.subcategory = {};
      this.submitted = false;
      this.subcategoryDialog = true;

  }


  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editSubcategory(subcategory: Subcategory) {
      this.subcategory = { ...subcategory };
      this.subcategoryDialog = true;
  }

  deleteSubcategory(_id: any) {
    this._id = _id;
    this.deleteProductDialog = true;
  }

  confirmDeleteSelected() {
    //   this.deleteProductsDialog = false;
    //   this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //   this.selectedProducts = [];
  }

  confirmDelete() {
      this.deleteProductDialog = false;
      this.subcategoryService.deleteSubcategory(this._id).subscribe((data:any) => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subcategory Deleted', life: 3000 });
      });
  }

  hideDialog() {
      this.subcategoryDialog = false;
      this.submitted = false;
      this.displayDialog=false;
  }

  saveSubcategory() {
    console.log('Save button clicked');
      this.submitted = true;

      if (this.subcategory.Name?.trim()) {
          if (this.subcategory._id) {
                this.subcategoryService.updateSubcategory(this.subcategory).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subcategory Updated', life: 3000 });
              })
              
          } else {
              //this.employee._id = this.createId();
              this.subcategoryService.addSubcategory(this.subcategory).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Subcategory Created', life: 3000 });
              })
              
          }

          //this.products = [...this.products];
          this.subcategoryDialog = false;
          this.subcategory = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
  
      return index;
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}






