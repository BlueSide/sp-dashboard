import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';

import { MockDataService } from "./mock-data.service";
import { environment } from '../../environments/environment';

const USE_MOCK_DATA: boolean = false;
const LIVE_UPDATE_INTERVAL: number = 100000; //milliseconds

@Injectable()
export class SPDataService
{

    private url: string = environment.SharePointUrl;
    
    private subscriptions: Subscription[] = [];
    private listCache: any;
    private observable: Observable<any>;

    public useMockData: boolean = environment.mockData;
    public token: string;

    constructor(
        private http: HttpClient,
        private mockData: MockDataService
    )
    {
        if(!environment.production && !this.useMockData)
        {
            // When not in production we need a token to avoid CORS violation
            this.getToken().subscribe((response) => {
                this.token = response.token;
                this.startLiveUpdate();
            });
        }
        else
        {
            this.startLiveUpdate();
        }
    }

    private startLiveUpdate()
    {
        let timer = Observable.timer(0, LIVE_UPDATE_INTERVAL).subscribe((ticks) => {
            this.update();
            
        });
    }

    public update()
    {
        for(let subscription of this.subscriptions)
        {
            let sub = this.getList(subscription.listName).subscribe((data) => {
                let spList: SPList = {
                    name: subscription.listName,
                    data: data
                };
                subscription.callback(spList);
            });
        }
    }
    
    public addSubscription(listName: string, callback:(any) => void): void
    {
        this.subscriptions.push({listName: listName, callback: callback});
    }
    
    public getList(listTitle: string): Observable<any> {
        if(this.useMockData)
        {
            //console.log("Mocking " + listTitle);
            return this.mockData.getList(listTitle);
        }
        return this.http.get<any>(`${this.url}/lists/getByTitle('${listTitle}')/items`, this.makeOptions());
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

interface Subscription
{
    listName: string;
    callback: (any) => void;
}

//TODO: Specify this more strictly or make a class of it
export interface SPList
{
    name: string;
    data: any;
}
