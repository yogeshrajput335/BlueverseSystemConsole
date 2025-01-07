import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee/employee.service';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
    _id: any;
    userDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    employees: Employee[]=[];

    users: User[] = [];

    user: User = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(private productService: ProductService, private messageService: MessageService,
        private userService: UserService, private empService:EmployeeService
    ) { }

    ngOnInit() {
        this.loadEmployees();
        this.loadGrid();

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        //   this.statuses = [
        //       { label: 'INSTOCK', value: 'instock' },
        //       { label: 'LOWSTOCK', value: 'lowstock' },
        //       { label: 'OUTOFSTOCK', value: 'outofstock' }
        //   ];
    }

    loadEmployees(){
        this.empService.getAllEmployees().subscribe((data: User[]) => this.employees = data);
    }

    loadGrid() {
        this.userService.getAllUser().subscribe((data: User[]) => this.users = data);
    }

    openNew() {
        this.user = { userName: '', emailId: '', password: '',employeeId:'' };
        this.submitted = false;
        this.userDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editUser(user: User) {
        this.user = { ...user };
        this.userDialog = true;
    }

    deleteUser(_id: any) {
        this._id = _id;
        this.deleteProductDialog = true;

    }

    confirmDeleteSelected() {
        //   this.deleteProductsDialog = false;
        //   this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        //   this.selectedProducts = [];
    }


    confirmDelete() {
        this.deleteProductDialog = false;
        if (this._id) {
            this.userService.deleteUser(this._id).subscribe(() => {
                this.loadGrid();
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
            });
        }
        (error) => {
            console.error('Error deleting user:', error);
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Could not delete user',
                life: 3000,
            });

        }
    }
    hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }
    saveUser() {
        this.submitted = true;
        console.log(this.user)
        if (this.user.userName?.trim()) {
            if (this.user._id) {
                this.userService.updateUser(this.user).subscribe(data => {
                    this.loadGrid();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
                })

            } else {
                //this.employee._id = this.createId();
                this.userService.addUser(this.user).subscribe(data => {
                    this.loadGrid();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usere Created', life: 3000 });
                })

            }

            //this.products = [...this.products];
            this.userDialog = false;
            this.user = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        //   for (let i = 0; i < this.products.length; i++) {
        //       if (this.products[i].id === id) {
        //           index = i;
        //           break;
        //       }
        //   }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}