import { Component, OnInit } from '@angular/core';
import { Department } from './department';
import { DepartmentService } from './department.service';

@Component({
    selector: 'department',
    template: require('./department.component.html'),
    providers: [DepartmentService],
    styles: ['.margin-top-30 { margin-top: 30px; }', '.save-bttn {margin-top: 30px; margin-left: 280px;}',
        'table {width: 700px;}', 'tr:nth-child(even) {background-color: #f2f2f2 }', '.edit-col-width {width:80px}',
        '.delete-col-width {width:90px}', '.margin-top-10 { margin-top: 10px; }', '.margin-left-30 {margin-left : 30px}', '.margin-left-minus-50 {margin-left : -50px}',
        '.height-35 {height:35px}']
})
export class DepartmentComponent implements OnInit {

    constructor(private departmentService: DepartmentService) { }

    department: Department = {
        id: 0,
        name: '',
        creationTime: new Date(),
    };

    errorMessage: string;
    departments: Department[] = [];
    isEdit: boolean = false;

    ngOnInit() { this.onGetAllDepartments(); }

    //get
    onGetAllDepartments() {
        this.departmentService.onGetAllDepartments()
            .subscribe(departments => this.departments = departments, error => this.errorMessage = <any>error);
    }

    //add
    onAddDepartment({ value, valid }: { value: Department, valid: boolean }) {
        this.departmentService.onAddDepartment(value)
            .subscribe(department => {
                this.departments.push(department);
            }, error => this.errorMessage = <any>error);
    }

    //update
    onUpdateDepartment({ value, valid }: { value: Department, valid: boolean }) {
        this.departmentService.onUpdateDepartment(value, this.department.id)
            .subscribe(department => { this.onGetAllDepartments(); this.isEdit = false; }, error => this.errorMessage = <any>error);
    }

    //Delete
    onDeleteDepartment(department) {
        let isDelete = confirm('You are about to delete ' + department.name + '. Are you sure?');
        if (isDelete) {
            this.departmentService.onDeleteDepartment(department.id)
                .subscribe(message => { this.onGetAllDepartments(); }, error => this.errorMessage = <any>error);
        }
    }

    //edit
    onEdit(department: Department) {
        this.department = department;
        this.isEdit = true;
    }


}

