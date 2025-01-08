import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { AttendenceComponent } from './attendence/attendence.component';
import { PayRollComponent } from './pay-roll/pay-roll.component';
import { LeaveComponent } from './leave/leave.component';
import { CurdComponent } from './curd/curd.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ClientComponent } from './client/client.component';
import { LeavetypeComponent } from './leavetype/leavetype.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent },
        { path: 'user', component: UserComponent },
        { path: 'attendence', component: AttendenceComponent },
        { path: 'payroll', component: PayRollComponent },
        { path: 'curd', component: CurdComponent },
        { path: 'leave', component: LeaveComponent},
        {path: 'candidate', component: CandidateComponent},
        { path: 'client', component: ClientComponent},
        { path: 'leavetype', component: LeavetypeComponent},
        { path: '**', redirectTo: '/notfound' }

    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
