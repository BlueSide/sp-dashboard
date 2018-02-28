import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';

import { MockDataService } from "./mock-data.service";
import { environment } from '../../environments/environment';

@Injectable()
export class SPDataService
{

    private url: string = 'https://bluesidenl.sharepoint.com/sites/dev/dashboard/';
    private targetSite: string = 'https://bluesidenl.sharepoint.com/sites/dev/dashboard/';
    private targetRoot: string = 'https://bluesidenl.sharepoint.com/';
    private listCache: SPList[];

    public token: string;

    constructor(
        private http: HttpClient,
        private mockData: MockDataService
    ) {}

    getList(listTitle: string): Observable<any> {
        const url: string = `${this.url}_api/web/lists/GetByTitle('${listTitle}')/items`;
        return new Observable((observer) => {
            if(!environment.production)
            {
                return this.getToken().subscribe(
                    response => {
                        this.token = response.token;
                        
                        console.log("Live data");
                        this.http.get<any>(url, this.makeOptions()).subscribe((response) => observer.next(response));
                    },
                    error => {
                        console.log("Mock data");
                        this.mockData.getList(listTitle).subscribe((response) => observer.next(response));
                    }
                );
            }
            else
            {
                this.http.get<any>(url, this.makeOptions()).subscribe((response) => observer.next(response));
            }
        });


        
        
    }

    getToken(): Observable<any> {
        return this.http.get<any>('http://localhost:8080/sptoken');
    }

    private makeOptions(): any
    {
        let headersObj: any = {
                'Accept': 'application/json',
                'Content-Type': 'application/json;odata=verbose',
        };
        
        if(!environment.production)
        {
            headersObj = {
                'Accept': 'application/json',
                'Content-Type': 'application/json;odata=verbose',
                'Authorization': `Bearer ${this.token}`
            };
        }
        

        let headers = new HttpHeaders(headersObj);
        return {headers: headers};
    }    

}

//TODO: Specify this more strictly or make a class of it
export interface SPList
{
    name: string;
    data: any;
}
