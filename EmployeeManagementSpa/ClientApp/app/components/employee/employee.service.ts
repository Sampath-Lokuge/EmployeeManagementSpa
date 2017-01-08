// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Employee } from './employee';
import { Observable } from 'rxjs/Observable';
import { EmployeeDto } from './employeeDto';
import { HandleErrorService } from '../app/handle-error.service';
import { ExtractDataService } from '../app/extract-data.service';

@Injectable()
export class EmployeeService {

    // URLs to web API
    private createUrl: string = '/api/employee/create';
    private getAllUrl: string = '/api/employee/getAll';
    private updateUrl: string = '/api/employee/update';
    private deleteUrl: string = '/api/employee/delete';

    constructor(private http: Http, private handleErrorService: HandleErrorService, private extractDataService: ExtractDataService) { }

    //get
    onGetAllEmployees(): Observable<Employee[]> {
        return this.http.get(this.getAllUrl)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //post
    onAddEmployee(employee: Employee): Observable<Employee> {
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.createUrl, body, options)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //Put
    onUpdateEmployee(employee: Employee, id: number): Observable<Employee> {
        let updateUrl = this.updateUrl + '/' + id;
        let body = JSON.stringify(employee);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(updateUrl, body, options)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //Delete
    onDeleteEmployee(id: string): Observable<EmployeeDto> {
        let deleteUrl = this.deleteUrl + '/' + id;

        return this.http.delete(deleteUrl)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }
}


