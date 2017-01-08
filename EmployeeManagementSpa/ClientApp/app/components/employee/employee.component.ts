import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/department';

@Component({
    selector: 'employee',
    template: require('./employee.component.html'),
    providers: [EmployeeService, DepartmentService],
    styles: [require('./employee.component.css')]

})

export class EmployeeComponent implements OnInit {

    constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) { }

    employee: Employee = {
        id: 0,
        firstName: '',
        lastName: '',
        creationTime: new Date(),
        departmentId: null,
    };

    errorMessage: string;
    employees: Employee[] = [];
    isEdit: boolean = false;
    departments: Department[] = [];
    isLoaded: boolean = false;

    ngOnInit() {
        this.isLoaded = false;
        this.onGetAllEmployees();
        this.onGetAllDepartments();
    }

    //get
    onGetAllEmployees() {
        this.employeeService.onGetAllEmployees()
            .subscribe(employees => {
                this.employees = employees;
                this.isLoaded = true;
            }, error => this.errorMessage = <any>error);
    }

    //add
    onAddEmployee({ value, valid }: { value: Employee, valid: boolean }) {
        this.isLoaded = false;
        this.employeeService.onAddEmployee(value)
            .subscribe(employee => {
                this.employees.push(employee);
                this.isLoaded = true;
            }, error => this.errorMessage = <any>error);
    }

    //update
    onUpdateEmployee({ value, valid }: { value: Employee, valid: boolean }) {
        this.employeeService.onUpdateEmployee(value, this.employee.id)
            .subscribe(employee => { this.onGetAllEmployees(); this.isEdit = false; }, error => this.errorMessage = <any>error);
    }

    //Delete
    onDeleteEmployee(employee) {
        let isDelete = confirm('You are about to delete ' + employee.firstName + ' ' + employee.lastName + '. Are you sure?');
        if (isDelete) {
            this.employeeService.onDeleteEmployee(employee.id)
                .subscribe(message => { this.onGetAllEmployees(); }, error => this.errorMessage = <any>error);
        }
    }

    //edit
    onEdit(employee: Employee) {
        this.employee = employee;
        this.isEdit = true;
    }

    //get
    onGetAllDepartments() {
        this.departmentService.onGetAllDepartments()
            .subscribe(departments => { this.departments = departments; }, error => this.errorMessage = <any>error);
    }
}
