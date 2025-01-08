import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Leavetype } from '../../models/leavetpe';
import { LeavetypeService } from '../../services/leavetype/leavetype.service';


@Component({
  selector: 'app-leavetype',
  templateUrl: './leavetype.component.html',
  styleUrl: './leavetype.component.scss'
})
export class LeavetypeComponent implements OnInit {
  _id:any;
  
    leavetypeDialog: boolean = false;
  
    deleteProductDialog: boolean = false;
  
    deleteProductsDialog: boolean = false;
  
    leavetypes: Leavetype[] = [];
  
    leavetype: Leavetype = {};
  
    selectedProducts: Product[] = [];
  
    submitted: boolean = false;
  
    cols: any[] = [];
  
    statuses: any[] = [];
  
    rowsPerPageOptions = [5, 10, 20];
  
    constructor(private productService: ProductService, private messageService: MessageService,
      private leavetypeService: LeavetypeService
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
      this.leavetypeService.getAllLeavetype().subscribe((data:any) => this.leavetypes = data);
    }
  
    openNew() {
        this.leavetype = {};
        this.submitted = false;
        this.leavetypeDialog = true;
    }
  
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
  
    editLeavetype(leavetype: Leavetype) {
        this.leavetype = { ...leavetype };
        this.leavetypeDialog = true;
    }
  
    deleteLeavetype(_id: any) {
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
        this.leavetypeService.deleteLeavetype(this._id).subscribe((data:any) => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leavetype Deleted', life: 3000 });
        });
    }
  
    hideDialog() {
        this.leavetypeDialog = false;
        this.submitted = false;
    }
  
    saveLeavetype() {
        this.submitted = true;
  
        if (this.leavetype.Name?.trim()) {
          if (this.leavetype._id) {
            this.leavetypeService.updateLeavetype(this.leavetype).subscribe(data => {
              this.loadGrid();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leavetype Updated', life: 3000 });
            })
    
          } else {
            //this.employee._id = this.createId();
            this.leavetypeService.addLeavetype(this.leavetype).subscribe(data => {
              this.loadGrid();
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leavetype Created', life: 3000 });
            })
    
          }
    
  
            //this.products = [...this.products];
            this.leavetypeDialog = false;
            this.leavetype = {};
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
  


