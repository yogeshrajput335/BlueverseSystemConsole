import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { LeavesComponent } from '../component/leaves/leaves.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent},
        { path: 'user', component: UserComponent},
        { path: 'Leaves', component: LeavesComponent},
        // { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
