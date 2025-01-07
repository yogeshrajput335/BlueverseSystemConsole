import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Client } from '../../models/client';
import { ClientService } from '../../services/client/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent implements OnInit{
  _id:any;

  clientDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  clients: Client[] = [];

  client: Client = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private clientService: ClientService
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
    this.clientService.getAllClients().subscribe((data:any) => this.clients = data);
  }

  openNew() {
      this.client = {};
      this.submitted = false;
      this.clientDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editClient(client: Client) {
      this.client = { ...client };
      this.clientDialog = true;
  }

  deleteClient(_id: any) {
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
      this.clientService.deleteClient(this._id).subscribe((data:any) => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Deleted', life: 3000 });
      });
  }

  hideDialog() {
      this.clientDialog = false;
      this.submitted = false;
  }

  saveClient() {
      this.submitted = true;

      if (this.client.Name?.trim()) {
          if (this.client._id) {
                this.clientService.updateClients(this.client).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
              })
              
          } else {
              //this.client._id = this.createId();
              this.clientService.addClients(this.client).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Created', life: 3000 });
              })
              
          }

          //this.products = [...this.products];
          this.clientDialog = false;
          this.client = {};
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




