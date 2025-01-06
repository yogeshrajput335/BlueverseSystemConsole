import { Component, OnInit } from '@angular/core';
import { CurdService } from '../../services/Curd/curd.service';
import { Curd } from '../../models/curd';
import { MessageService } from 'primeng/api';
import { CrudComponent } from 'src/app/demo/components/pages/crud/crud.component';
//import { Table } from 'primeng/table';
@Component({
  selector: 'app-curd',

  templateUrl: './curd.component.html',
  styleUrl: './curd.component.scss'
})
export class CurdComponent implements OnInit {
  _id: any;
  curdDialog: boolean = false;
  deleteCurdDialog: boolean = false;
  deleteCurdsDialog: boolean = false;
  curds: Curd[] = [];
  curd: Curd = {};
  selectedCurd: Curd[] = [];
  submitted: boolean = false;
  cols: any[] = [];
  statuses: any[] = [];
  rowsPerPageOptions = [5, 10, 20];


  constructor(private messageService: MessageService, private curdService: CurdService) { }
  ngOnInit() {

  }
  loadGrid() {
    this.curdService.getAllCurd().subscribe((data: any) => this.curds = data);
  }
  openNew() {
    this.curd = {};
    this.submitted = false;
    this.curdDialog = true;
  }
  deleteSelectedCurds() {
    this.deleteCurdsDialog = true;
  }
  editCurd(curd: Curd) {
    this.curd = { ...curd };
    this.curdDialog = true;
  }
  deleteCurd(_id: any) {
    this._id = _id;
    this.deleteCurdDialog = true;
  }
  confirmDelete() {
    this.deleteCurdDialog = false;
    this.curdService.deleteCurd(this._id).subscribe((data: any) => {
      this.loadGrid();
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curd Deleted', life: 3000 });
    });
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
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Employee Updated', life: 3000 });
        })

      } else {

        this.curdService.addCurd(this.curd).subscribe(data => {
          this.loadGrid();
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Curd Created', life: 3000 });
        })

      }
      this.curdDialog = false;
      this.curd = {};
    }
  }

}
