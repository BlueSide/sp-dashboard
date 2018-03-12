import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { SPDataService, SPList } from '../sp-data.service';
import { GlobalFilterService } from '../global-filter.service';
import { DataComponent } from '../data-component';
import { BSChart } from '../BSChart';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent extends DataComponent implements OnInit {

    chart: Chart = [];

    @ViewChild('canvas') canvas: ElementRef;
    
    constructor(spData: SPDataService, globalFilter: GlobalFilterService) {
        super(spData, globalFilter);

        this.subscribe("Testlist");
    }

    ngOnInit() {
        let chartObject: any = {
            type: 'bar',
            data: {
                datasets: [{
                    label: 'Unfiltered',
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderWidth: 1
                },{
                    label: 'Globally filtered',
                    backgroundColor: 'rgba(54, 162, 235, 0.8)',
                    borderWidth: 1
                },{
                    label: 'Globally and locally filtered',
                    backgroundColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    position: 'right'
                },                
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
        this.chart = new BSChart(this.canvas, chartObject);
    }

    filter(data: any[]): any
    {
        return data.filter(item=>item.Boolean);
    }
    
    protected onNewData(): void
    {
        let unFilteredData = this.unfilteredLists['Testlist'];
        let globalFilteredData = this.globalFilteredLists['Testlist'];
        let data = this.lists['Testlist'];

        
        let groupedUnfiltered: Map<string, any> = this.groupBy(unFilteredData, item => item.Title);
        let groupedGlobal: Map<string, any> = this.groupBy(globalFilteredData, item => item.Title);
        let grouped: Map<string, any> = this.groupBy(data, item => item.Title);

        let resultUnfiltered = [];
        let resultGlobal = [];
        let result = [];

        Array.from(groupedUnfiltered.keys()).forEach(key => {
            
            resultUnfiltered.push(groupedUnfiltered.get(key).map(item => item.Integer).reduce((a, b) => a + b));

            if(!grouped.has(key))
                result.push(0);
            else
                result.push(grouped.get(key).map(item => item.Integer).reduce((a, b) => a + b));

            if(!groupedGlobal.has(key))
                resultGlobal.push(0);
            else
                resultGlobal.push(groupedGlobal.get(key).map(item => item.Integer).reduce((a, b) => a + b));
        });

        this.chart.data.datasets[0].data = resultUnfiltered;
        this.chart.data.datasets[1].data = resultGlobal;
        this.chart.data.datasets[2].data = result;
        this.chart.data.labels = Array.from(groupedUnfiltered.keys());
        this.chart.update();
        
    }
}
