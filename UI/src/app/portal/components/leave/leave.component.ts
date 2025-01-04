import { Component } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { LeaveService } from '../../services/leave/leave.service';
import { Leave } from '../../models/leave';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent {
   _id:any;
  
    leaveDialog: boolean = false;
    
    deleteProductDialog: boolean = false;
  
    deleteProductsDialog: boolean = false;
  
    leaves:Leave [] = [];
  
    leave: Leave = {};
  
    selectedProducts: Product[] = [];
  
    submitted: boolean = false;
  
    cols: any[] = [];
  
    statuses: any[] = [];
  
    rowsPerPageOptions = [5, 10, 20];
  
    constructor(private productService: ProductService, private messageService: MessageService,
      private leaveService: LeaveService
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
      this.leaveService.getAllLeave().subscribe((data:any) => this.leaves = data);
    }
  
    openNew() {
        this.leave = {};
        this.submitted = false;
        this.leaveDialog = true;
    }
  
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
  
    editLeave(leave: Leave) {
        this.leave = { ...leave };
        this.leaveDialog = true;
    }
  
    deleteLeave(_id: any) {
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
        this.leaveService.deleteLeave(this._id).subscribe((data:any) => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Deleted', life: 3000 });
        });
    }
  
    hideDialog() {
        this.leaveDialog = false;
        this.submitted = false;
    }
  
    saveLeave() {
        this.submitted = true;
  
        if (this.leave.Name?.trim()) {
            if (this.leave._id) {
                  this.leaveService.updateLeaves(this.leave).subscribe(data=>{
                  this.loadGrid();
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Updated', life: 3000 });
                })
                
            } else {
                //this.employee._id = this.createId();
                this.leaveService.addLeave(this.leave).subscribe(data=>{
                  this.loadGrid();
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Leave Created', life: 3000 });
                })
                
            }
  
            //this.products = [...this.products];
            this.leaveDialog = false;
            this.leave= {};
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
  

