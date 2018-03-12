import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SPDataService } from './sp-dashboard/sp-data.service';
import { GlobalFilterService } from './sp-dashboard/global-filter.service';
import { MockDataService } from './sp-dashboard/mock-data.service';

import { AppComponent } from './app.component';
import { PieChartComponent } from './sp-dashboard/pie-chart/pie-chart.component';
import { BarChartComponent } from './sp-dashboard/bar-chart/bar-chart.component';
import { GlobalFilterComponent } from './global-filter/global-filter.component';


@NgModule({
    declarations: [
        AppComponent,
        PieChartComponent,
        BarChartComponent,
        GlobalFilterComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [
        SPDataService,
        GlobalFilterService,
        MockDataService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
