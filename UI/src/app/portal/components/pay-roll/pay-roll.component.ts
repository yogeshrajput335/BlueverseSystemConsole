import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Payroll } from '../../models/payroll';
import { PayrollService } from '../../services/payroll/payroll.service';

@Component({
  selector: 'app-pay-roll',
  templateUrl: './pay-roll.component.html',
  styleUrl: './pay-roll.component.scss'
})
export class PayRollComponent implements OnInit {
  payrollDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  payrolls: Payroll[] = [];

  payroll: Payroll = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private payrollService: PayrollService
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
    this.payrollService.getAllPayroll().subscribe((data: any) => this.payrolls = data);
  }

  openNew() {
    this.payroll = {};
    this.submitted = false;
    this.payrollDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editEmployee(payroll: Payroll) {
    this.payroll = { ...payroll };
    this.payrollDialog = true;
  }

  deleteProduct(payroll: Payroll) {
    this.deleteProductDialog = true;
    this.payroll = { ...payroll };
  }

  confirmDeleteSelected() {
    //   this.deleteProductsDialog = false;
    //   this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //   this.selectedProducts = [];
  }

  confirmDelete() {
    //   this.deleteProductDialog = false;
    //   this.products = this.products.filter(val => val.id !== this.product.id);
    //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //   this.product = {};
  }

  hideDialog() {
    this.payrollDialog = false;
    this.submitted = false;
  }

  savePayroll() {
    this.submitted = true;

    if (this.payroll.Name?.trim()) {
      if (this.payroll._id) {
        this.payrollService.updatePayroll(this.payroll).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payroll Updated', life: 3000 });
        })

      } else {
        //this.employee._id = this.createId();
        this.payrollService.addPayroll(this.payroll).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Payroll Created', life: 3000 });
        })

      }

      //this.products = [...this.products];
      this.payrollDialog = false;
      this.payroll = {};
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