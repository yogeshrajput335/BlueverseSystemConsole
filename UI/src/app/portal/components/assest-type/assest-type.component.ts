import { Component, OnInit } from '@angular/core';
import { AssestTypeService } from '../../services/assest-type/assest-type.service';
import { Assesttype } from '../../models/assest-type';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-assest-type',

  templateUrl: './assest-type.component.html',
  styleUrl: './assest-type.component.scss'
})
export class AssestTypeComponent implements OnInit {
  _id: any;
  assesttypeDialog: boolean = false;
  deleteAssesttypeDialog: boolean = false;

  deleteAssesttypesDialog: boolean = false;
  // employees: Employee[] = [];

  assesttypes: Assesttype[] = [];

  assesttype: Assesttype = {};

  selectedAssesttypes: Assesttype[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];
  constructor(private messageService: MessageService, private assestTypeService: AssestTypeService
  ) { }

  ngOnInit() {
    this.loadGrid();
  }
  // loadEmployees() {
  //   this.employeeService.getAllEmployees().subscribe((data: Employee[]) => this.employees = data);
  // }

  loadGrid() {
    this.assestTypeService.getAllAssesttype().subscribe((data: Assesttype[]) => this.assesttypes = data);
  }

  openNew() {
    this.assesttype = {};
    this.submitted = false;
    this.assesttypeDialog = true;
  }

  deleteSelectedAssesttypes() {
    this.deleteAssesttypesDialog = true;
  }

  editAssesttype(assesttype: Assesttype) {
    this.assesttype = { ...assesttype };
    this.assesttypeDialog = true;
  }

  deleteAssesttype(_id: any) {
    this._id = _id;
    this.deleteAssesttypeDialog = true;

  }

  confirmDelete() {
    this.deleteAssesttypeDialog = false;
    if (this._id) {
      this.assestTypeService.deleteAssesttype(this._id).subscribe(() => {
        this.loadGrid();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assesttype Deleted', life: 3000 });
      });
    }
    (error) => {
      console.error('Error deleting assesttype:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Could not delete assesttype',
        life: 3000,
      });

    }
  }



  hideDialog() {
    this.assesttypeDialog = false;
    this.submitted = false;
  }

  saveAssesttype() {
    this.submitted = true;

    if (this.assesttype.Name?.trim()) {
      if (this.assesttype._id) {
        this.assestTypeService.updateAssesttype(this.assesttype).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assesttype Updated', life: 3000 });
        })

      } else {
        //this.employee._id = this.createId();
        this.assestTypeService.addAssesttype(this.assesttype).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Assesttype Created', life: 3000 });
        })

      }

      //this.products = [...this.products];
      this.assesttypeDialog = false;
      this.assesttype = {};
    }
  }
}
