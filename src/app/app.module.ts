import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SPDataService } from './sp-dashboard/sp-data.service';
import { MockDataService } from './sp-dashboard/mock-data.service';

import { AppComponent } from './app.component';
import { PieChartComponent } from './sp-dashboard/pie-chart/pie-chart.component';


@NgModule({
    declarations: [
        AppComponent,
        PieChartComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        SPDataService,
        MockDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
