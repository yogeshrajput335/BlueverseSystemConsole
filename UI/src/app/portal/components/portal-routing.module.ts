import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { PayRollComponent } from './pay-roll/pay-roll.component';
import { LeaveComponent } from './leave/leave.component';
import { CurdComponent } from './curd/curd.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent },
        { path: 'user', component: UserComponent },
        { path: 'attendence', component: AttendenceComponent },
        { path: 'payroll', component: PayRollComponent },
        { path: 'leave', component: LeaveComponent },
        { path: 'curd', component: CurdComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
