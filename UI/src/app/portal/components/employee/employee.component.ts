import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent implements OnInit {

  _id: any;

  employeeDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  employees: Employee[] = [];

  employee: Employee = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private employeeService: EmployeeService
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

  loadGrid() {
    this.employeeService.getAllEmployees().subscribe((data: any) => this.employees = data);
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialog = true;
  }

  deleteEmployee(_id: any) {
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
    this.employeeService.deleteEmployee(this._id).subscribe((data: any) => {
      this.loadGrid();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Deleted', life: 3000 });
    });
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.submitted = true;

    if (this.employee.Name?.trim()) {
      if (this.employee._id) {
        this.employeeService.updateEmployees(this.employee).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
        })

      } else {
        //this.employee._id = this.createId();
        this.employeeService.addEmployees(this.employee).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Created', life: 3000 });
        })

      }

      //this.products = [...this.products];
      this.employeeDialog = false;
      this.employee = {};
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
