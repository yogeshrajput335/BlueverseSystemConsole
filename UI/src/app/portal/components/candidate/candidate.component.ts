import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { Candidate } from '../../models/candidate';
import { CandidateService } from '../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrl: './candidate.component.scss'
})
export class CandidateComponent implements OnInit {
  _id:any;

  candidateDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  candidates: Candidate[] = [];

  candidate: Candidate = {};

  selectedProducts: Product[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(private productService: ProductService, private messageService: MessageService,
    private candidateService: CandidateService
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
    this.candidateService.getAllCandidates().subscribe((data:any) => this.candidates = data);
  }

  openNew() {
      this.candidate = {};
      this.submitted = false;
      this.candidateDialog = true;
  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

  editCandidate(candidate: Candidate) {
      this.candidate = { ...candidate };
      this.candidateDialog = true;
  }

  deleteCandidate(_id: any) {
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
      this.candidateService.deleteCandidate(this._id).subscribe((data:any) => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidate Deleted', life: 3000 });
      });
  }

  hideDialog() {
      this.candidateDialog = false;
      this.submitted = false;
  }

  saveCandidate() {
      this.submitted = true;

      if (this.candidate.Name?.trim()) {
          if (this.candidate._id) {
                this.candidateService.updateCandidates(this.candidate).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'candidate Updated', life: 3000 });
              })
              
          } else {
              //this.employee._id = this.createId();
              this.candidateService.addCandidates(this.candidate).subscribe(data=>{
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidate Created', life: 3000 });
              })
              
          }

          //this.products = [...this.products];
          this.candidateDialog = false;
          this.candidate = {};
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


