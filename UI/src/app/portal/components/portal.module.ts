import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalRoutingModule } from './portal-routing.module';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LeavesComponent } from '../component/leaves/leaves.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../services/employee/employee.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        PortalRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule
    ],
    declarations:[EmployeeComponent,UserComponent,AttendenceComponent,LeavesComponent],
    providers:[EmployeeService]
})
export class PortalModule { }
