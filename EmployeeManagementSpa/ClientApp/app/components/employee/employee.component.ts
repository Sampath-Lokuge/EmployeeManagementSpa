import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { DepartmentService } from '../department/department.service';
import { Department } from '../department/department';

@Component({
    selector: 'employee',
    template: require('./employee.component.html'),
    providers: [EmployeeService, DepartmentService],
    styles: ['.margin-top-30 { margin-top: 30px; }', '.margin-top-10 { margin-top: 10px; }', '.margin-left-minus-50 {margin-left : -50px}',
        '.margin-right-65 {margin-right:65px}', '.margin-left-10 {margin-left:10px}', '.margin-left-minus-20 {margin-left:-20px}', '.height-35 {height:35px}']

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

    ngOnInit() {
        this.onGetAllEmployees();
        this.onGetAllDepartments();
    }

    //get
    onGetAllEmployees() {
        this.employeeService.onGetAllEmployees()
            .subscribe(employees => this.employees = employees, error => this.errorMessage = <any>error);
    }

    //add
    onAddEmployee({ value, valid }: { value: Employee, valid: boolean }) {
        this.employeeService.onAddEmployee(value)
            .subscribe(employee => {
                this.employees.push(employee);
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
