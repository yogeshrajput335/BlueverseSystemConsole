import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'employee', component: EmployeeComponent},
        // { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        // { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PortalRoutingModule { }
