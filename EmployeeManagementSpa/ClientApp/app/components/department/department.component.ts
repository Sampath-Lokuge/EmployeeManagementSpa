﻿import { Component, OnInit } from '@angular/core';
import { Department } from './department';
import { DepartmentService } from './department.service';

@Component({
    selector: 'department',
    template: require('./department.component.html'),
    providers: [DepartmentService],
    styles: [require('./department.component.css')]
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
    isLoaded: boolean = false;

    ngOnInit() {
        this.isLoaded = false;
        this.onGetAllDepartments();
    }

    //get
    onGetAllDepartments() {
        this.departmentService.onGetAllDepartments()
            .subscribe(departments => {
                this.departments = departments;
                this.isLoaded = true;
            }, error => this.errorMessage = <any>error);
    }

    //add
    onAddDepartment({ value, valid }: { value: Department, valid: boolean }) {
        this.isLoaded = false;
        this.departmentService.onAddDepartment(value)
            .subscribe(department => {
                this.departments.push(department);
                this.isLoaded = true;
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

