import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{
  _id:any;

  categoryDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  categorys: Category[] = [];

  category: Category = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
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

  loadGrid(){
    this.categoryService.getAllCategory().subscribe((data:any) => this.categorys= data);
  }

  openNew() {
      this.category = {};
      this.submitted = false;
      this.categoryDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editCategory(category: Category) {
      this.category = { ...category };
      this.categoryDialog = true;
  }

  deleteCategory(_id: any) {
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
      this.categoryService.deleteCategory(this._id).subscribe((data:any) => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
      });
  }

  hideDialog() {
      this.categoryDialog = false;
      this.submitted = false;
  }

  saveCategory() {
      this.submitted = true;

      if (this.category.Name?.trim()) {
          if (this.category._id) {
                this.categoryService.updateCategory(this.category).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
              })
              
          } else {
              //this.employee._id = this.createId();
              this.categoryService.addCategory(this.category).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
              })
              
          }

          //this.products = [...this.products];
          this.categoryDialog = false;
          this.category = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
    //   for (let i = 0; i < this.products.length; i++) {
    //       if (this.products[i].id === id) {
    //           index = i;
    //           break;
    //       }
    //   }

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
