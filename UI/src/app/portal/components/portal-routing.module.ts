import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { LeavesComponent } from '../component/leaves/leaves.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent},
        { path: 'user', component: UserComponent},
        { path: 'attendence', component: AttendenceComponent},
        { path: 'Leaves', component: LeavesComponent},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
