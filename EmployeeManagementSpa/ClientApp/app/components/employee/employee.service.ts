// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Employee } from './employee';
import { Observable } from 'rxjs/Observable';
import { EmployeeDto } from './employeeDto';


@Injectable()
export class EmployeeService {

    // URLs to web API
    private createUrl: string = '/api/employee/create';
    private getAllUrl: string = '/api/employee/getAll';
    private updateUrl: string = '/api/employee/update';
    private deleteUrl: string = '/api/employee/delete';

    constructor(private http: Http) { }

    //get
    onGetAllEmployees(): Observable<Employee[]> {
        return this.http.get(this.getAllUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //post
    onAddEmployee(employee: Employee): Observable<Employee> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.createUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Put
    onUpdateEmployee(employee: Employee, id: number): Observable<Employee> {
        let updateUrl = this.updateUrl + '/' + id;
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(updateUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    //Delete
    onDeleteEmployee(id: string): Observable<EmployeeDto> {
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


