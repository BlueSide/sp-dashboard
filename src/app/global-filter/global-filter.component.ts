import { Component, OnInit } from '@angular/core';
import { GlobalFilterService } from '../sp-dashboard/global-filter.service';
import { Filter } from '../sp-dashboard/filter';
import { SPDataService } from '../sp-dashboard/sp-data.service';

@Component({
  selector: 'global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss']
})
export class GlobalFilterComponent implements OnInit {

    private useGlobalFilter = true;
    
    public globalFilter1: Filter = new Filter((item) => item.Integer != 25, true);
    public globalFilter2: Filter = new Filter((item) => item.Boolean, true);

    constructor(private globalFilter: GlobalFilterService, private spData: SPDataService)
    {
        this.globalFilter.filterChain = (data: any[]) => {
            if(!this.useGlobalFilter)
            {
                return data;
            }
            
            let data1 = this.globalFilter1.doFilter(data);
            let data2 = this.globalFilter2.doFilter(data);
            
            return this.globalFilter.or(data1, data2);
        };
    }

    ngOnInit()
    {
    }

    toggleFilter()
    {
        this.useGlobalFilter = !this.useGlobalFilter;
        this.globalFilter1.enabled = this.useGlobalFilter;
        this.spData.update();
    }

}
