import { Component, OnInit } from '@angular/core';
import { Assest } from '../../models/assest';
import { AssestService } from '../../services/assest/assest.service';
import { MessageService } from 'primeng/api';
import { AssestTypeService } from '../../services/assest-type/assest-type.service';
import { Assesttype } from '../../models/assest-type';

@Component({
  selector: 'app-assest',
  templateUrl: './assest.component.html',
  styleUrl: './assest.component.scss'
})
export class AssestComponent implements OnInit {
  _id: any;
  assestDialog: boolean = false;
  deleteAssestDialog: boolean = false;

  deleteAssestsDialog: boolean = false;
  assesttypes: Assesttype[] = [];
  assests: Assest[] = [];

  assest: Assest = {};

  selectedAssests: Assest[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  constructor(private messageService: MessageService, private assestService: AssestService, private assesttypeService: AssestTypeService
  ) { }

  ngOnInit() {
    this.loadAssetType();
    this.loadGrid();
  }

  loadAssetType() {
    this.assesttypeService.getAllAssesttype().subscribe((data: Assest[]) => this.assesttypes = data);
  }


  loadGrid() {
    this.assestService.getAllAssest().subscribe((data: Assest[]) => this.assests = data);
  }

  openNew() {
    this.assest = {};
    this.submitted = false;
    this.assestDialog = true;
  }

  deleteSelectedAssests() {
    this.deleteAssestsDialog = true;
  }

  editAssest(assest: Assest) {
    this.assest = { ...assest };
    this.assestDialog = true;
  }

  deleteAssest(_id: any) {
    this._id = _id;
    this.deleteAssestDialog = true;
  }

  confirmDelete() {
    this.deleteAssestDialog = false; // Close the dialog
    if (this._id) {
      this.assestService.deleteAssest(this._id).subscribe({
        next: () => {
          this.loadGrid(); // Reload the table data after deletion
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Asset Deleted',
            life: 3000,
          });
        },
        error: (err) => {
          console.error('Error deleting asset:', err); // Log the error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not delete the asset',
            life: 3000,
          });
        },
      });
    }
  }




  hideDialog() {
    this.assestDialog = false;
    this.submitted = false;
  }
  //  

  saveAssest() {
    this.submitted = true;

    if (this.assest.Assetname?.trim()) {
      if (this.assest._id) {
        this.assestService.updateAssest(this.assest).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assest Updated', life: 3000 });
        })

      } else {
        //this.employee._id = this.createId();
        this.assestService.addAssest(this.assest).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assest Created', life: 3000 });
        })

      }

      //this.products = [...this.products];
      this.assestDialog = false;
      this.assest = {};
    }
  }
}