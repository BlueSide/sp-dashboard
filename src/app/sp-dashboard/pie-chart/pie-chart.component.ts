import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SPDataService, SPList } from '../sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { DataComponent } from '../data-component';
import { BSChart } from '../BSChart';

@Component({
    selector: 'pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent extends DataComponent implements OnInit {

    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;
    
    constructor(spData: SPDataService, globalFilter: GlobalFilterService) {
        super(spData, globalFilter);
        
        this.subscribe("Testlist");
    }

    ngOnInit()
    {
        let chartObject: any = {
            type: 'pie',
            data: {
                datasets: [{
                    label: '# of Votes',
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(124, 0, 86, 1)',
                        'rgba(124, 206, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
            }
        };
        this.chart = new BSChart(this.canvas, chartObject);
    }

    protected onNewData(): void
    {
        let data = this.lists['Testlist'];
        let itemsGrouped: Map<string, any> = this.groupBy(data, item => item.Title);
        this.chart.data.datasets[0].data = data.map(item => item.Number);
        this.chart.data.labels = Array.from(itemsGrouped.keys());
        this.chart.update();
    }
}
