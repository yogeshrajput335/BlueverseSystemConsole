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
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../services/employee/employee.service';
import { NgModel } from '@angular/forms';
import { PayRollComponent } from './pay-roll/pay-roll.component';
import { UserService } from '../services/user/user.service';
import { PayrollService } from '../services/payroll/payroll.service';
import { LeaveComponent } from './leave/leave.component';
import { LeaveService } from '../services/leave/leave.service';
import { CurdService } from '../services/Curd/curd.service';
import { CurdComponent } from './curd/curd.component';
import { CandidateService } from '../services/candidate/candidate.service';
import { CandidateComponent } from './candidate/candidate.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from '../services/client/client.service';
import { AssestTypeService } from '../services/assest-type/assest-type.service';
import { AssestTypeComponent } from './assest-type/assest-type.component';
import { CategoryService } from '../services/category/category.service';
import { CategoryComponent } from './category/category.component';
import { LeavetypeService } from '../services/leavetype/leavetype.service';
import { LeavetypeComponent } from './leavetype/leavetype.component';
import { AssestService } from '../services/assest/assest.service';
import { AssestComponent } from './assest/assest.component';



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
        DialogModule,
        CheckboxModule
    ],

    declarations: [EmployeeComponent, UserComponent, AttendenceComponent, PayRollComponent, LeaveComponent, CandidateComponent, ClientComponent, CurdComponent, AssestTypeComponent, CategoryComponent, LeavetypeComponent, AssestComponent],
    providers: [EmployeeService, UserService, PayrollService, LeaveService, CandidateService, ClientService, CurdService, AssestTypeService, CategoryService, LeavetypeService, AssestService]


})
export class PortalModule { }
