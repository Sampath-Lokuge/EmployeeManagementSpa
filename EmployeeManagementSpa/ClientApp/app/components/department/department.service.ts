// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Department } from './department';
import { Observable } from 'rxjs/Observable';
import { DepartmentDto } from './departmentDto';


@Injectable()
export class DepartmentService {

    // URLs to web API
    private createUrl: string = '/api/department/create';
    private getAllUrl: string = '/api/department/getAll';
    private updateUrl: string = '/api/department/update';
    private deleteUrl: string = '/api/department/delete';

    constructor(private http: Http) { }

    //get
    onGetAllDepartments(): Observable<Department[]> {
        return this.http.get(this.getAllUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //post
    onAddDepartment(department: Department): Observable<Department> {
        let body = JSON.stringify(department);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.createUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Put
    onUpdateDepartment(department: Department, id: number): Observable<Department> {
        let updateUrl = this.updateUrl + '/' + id;
        let body = JSON.stringify(department);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Delete
    onDeleteDepartment(id: string): Observable<DepartmentDto> {
        var deleteUrl = this.deleteUrl + '/' + id;

        return this.http.delete(deleteUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //extract Data
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    //handle Error
    private handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}


