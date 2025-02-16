import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { AttendenceService } from '../../services/attendence/attendence.service';
import { Attendence } from '../../models/attendence';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.scss'
})
export class AttendenceComponent implements OnInit{

    _id:any;
    
    attendenceDialog: boolean = false;
  
    deleteProductDialog: boolean = false;
  
    deleteProductsDialog: boolean = false;

    employees:Employee[] = [];
  
    attendences: Attendence[] = [];
  
    attendence: Attendence = {};
  
    selectedProducts: Product[] = [];
  
    submitted: boolean = false;
  
    cols: any[] = [];
  
    statuses: any[] = [];
  
    rowsPerPageOptions = [5, 10, 20];

    // Arrays for day, month, year
//   days = Array.from({ length: 31 }, (_, i) => i + 1);
//   months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];
//   years = Array.from({ length: 101 }, (_, i) => 1925 + i); // Example range from 1925 to 2025
    
    
    constructor(
         private messageService: MessageService,
        private attendenceService: AttendenceService,
        private  employeeService: EmployeeService
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
  
        // this.statuses = [
        //     { label: 'INSTOCK', value: 'instock' },
        //     { label: 'LOWSTOCK', value: 'lowstock' },
        //     { label: 'OUTOFSTOCK', value: 'outofstock' }
        // ];
    }

    loadEmployees(){
            this.employeeService.getAllEmployees().subscribe((data: Employee[]) => this.employees = data || []);
        }

    loadGrid(){
        this.attendenceService.getAllAttendence().subscribe((data:any) => this.attendences = data);
      }
    openNew() {
        this.attendence = {};
        this.submitted = false;
        this.attendenceDialog = true;
    }
  
    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }
  
    editAttendence(attendence: Attendence) {
        this.attendence = { ...attendence };
        this.attendenceDialog = true;
    }
  

    deleteAttendence(_id: any) {
        this._id = _id;
        this.deleteProductDialog = true;

    }
  
    confirmDeleteSelected() {
        // this.deleteProductsDialog = false;
        // this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        // this.selectedProducts = [];
    }
  
    // confirmDelete() {
    //     this.deleteProductDialog = false;
    //     this.attendenceService.deleteAttendence(this._id).subscribe((data:any) => {
    //         this.loadGrid();
    //         this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendence Deleted', life: 3000 });
    //     });
    // }



    confirmDelete() {
        this.deleteProductDialog = false;
        if (this._id) {
          this.attendenceService.deleteAttendence(this._id).subscribe(() => {
            this.loadGrid();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendence Deleted', life: 3000 });
          });
        }
        (error) => {
          console.error('Error deleting attendence:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not delete attendence',
            life: 3000,
          });
    
        }
      }
  
    hideDialog() {
        this.attendenceDialog = false;
        this.submitted = false;
    }
  
    saveAttendence() {
        this.submitted = true;
  
            if (this.attendence.Name?.trim()) {
                if (this.attendence._id) {
                      this.attendenceService.updateAttendence(this.attendence).subscribe(data=>{
                      this.loadGrid();
                      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendence Updated', life: 3000 });
                    })
            } else {
                this.attendenceService.addAttendence(this.attendence).subscribe(data=>{
                    this.loadGrid();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Attendence Created', life: 3000 });
                  })
            }
  
            // this.products = [...this.products];
            this.attendenceDialog = false;
            this.attendence = {};
        }
    }


    findIndexById(id: string): number {
        let index = -1;
        // for (let i = 0; i < this.products.length; i++) {
        //     if (this.products[i].id === id) {
        //         index = i;
        //         break;
        //     }
        // }
  
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



