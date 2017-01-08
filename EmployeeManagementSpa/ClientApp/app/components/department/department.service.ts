// Observable Version
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Department } from './department';
import { Observable } from 'rxjs/Observable';
import { DepartmentDto } from './departmentDto';
import { HandleErrorService } from '../app/handle-error.service';
import { ExtractDataService } from '../app/extract-data.service';

@Injectable()
export class DepartmentService {

    // URLs to web API
    private createUrl: string = '/api/department/create';
    private getAllUrl: string = '/api/department/getAll';
    private updateUrl: string = '/api/department/update';
    private deleteUrl: string = '/api/department/delete';

    constructor(private http: Http, private handleErrorService: HandleErrorService,private extractDataService: ExtractDataService) { }

    //get
    onGetAllDepartments(): Observable<Department[]> {
        return this.http.get(this.getAllUrl)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //post
    onAddDepartment(department: Department): Observable<Department> {
        let body = JSON.stringify(department);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.createUrl, body, options)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //Put
    onUpdateDepartment(department: Department, id: number): Observable<Department> {
        let updateUrl = this.updateUrl + '/' + id;
        let body = JSON.stringify(department);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(updateUrl, body, options)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }

    //Delete
    onDeleteDepartment(id: string): Observable<DepartmentDto> {
        var deleteUrl = this.deleteUrl + '/' + id;

        return this.http.delete(deleteUrl)
            .map(this.extractDataService.extractData)
            .catch(this.handleErrorService.handleError);
    }
}


