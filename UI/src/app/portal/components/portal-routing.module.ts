import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LeaveComponent } from './leave/leave.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent},
        { path: 'user', component: UserComponent},
        { path: 'attendence', component: AttendenceComponent},
        { path: 'leave', component: LeaveComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
