import { ElementRef } from '@angular/core';
import { Chart } from 'chart.js';

export class BSChart extends Chart
{
    public urls: Map<string, string>;

    constructor(canvas: ElementRef, chartObject: ChartObject)
    {
        let context = canvas.nativeElement.getContext('2d');
        super(context, chartObject);

        this.urls = new Map();
    }

    public addUrl(key: string, url: string)
    {
        this.urls.set(key, url);
    }
}

export interface ChartObject
{
    type: ChartType;
    data: any;
    options: any;
}

export enum ChartType
{
    BAR = 'bar',
    PIE = 'pie',
    LINE = 'line'
}
