import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { CurdService } from '../../services/Curd/curd.service';
import { Curd } from '../../models/curd';


@Component({
  selector: 'app-curd',

  templateUrl: './curd.component.html',
  styleUrl: './curd.component.scss'
})
export class CurdComponent implements OnInit {
  _id: any;
  curdDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  curds: Curd[] = [];

  curd: Curd = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private curdService: CurdService
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
    this.curdService.getAllCurd().subscribe((data: Curd[]) => this.curds = data);
  }

  openNew() {
    this.curd = {};
    this.submitted = false;
    this.curdDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editCurd(curd: Curd) {
    this.curd = { ...curd };
    this.curdDialog = true;
  }

  deleteCurd(_id: any) {
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
    if (this._id) {
      this.curdService.deleteCurd(this._id).subscribe(() => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curd Deleted', life: 3000 });
      });
    }
    (error) => {
      console.error('Error deleting curd:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not delete curd',
        life: 3000,
      });

    }
  }



  hideDialog() {
    this.curdDialog = false;
    this.submitted = false;
  }

  saveCurd() {
    this.submitted = true;

    if (this.curd.Name?.trim()) {
      if (this.curd._id) {
        this.curdService.updateCurd(this.curd).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curd Updated', life: 3000 });
        })

      } else {
        //this.employee._id = this.createId();
        this.curdService.addCurd(this.curd).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curd Created', life: 3000 });
        })

      }

      //this.products = [...this.products];
      this.curdDialog = false;
      this.curd = {};
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





