import { Injectable } from '@angular/core';
import { Filter } from './filter';

@Injectable()
export class GlobalFilterService
{

    public filterChain;
    
    constructor()
    {
    }

    filter(data: any[]): any
    {
        return this.filterChain(data);
    }
        
    and(a: any[], b: any[])
    {
        let result: any[] = [];
        a.forEach((itemA) => {
            result.push( b.find( (itemB) => itemB.GUID === itemA.GUID ));
                  
        });
        return result;
    }

    or(a: any[], b: any[])
    {
        return a.concat(b).filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['GUID']).indexOf(obj['GUID']) === pos;
        });
    }

    removeDuplicates(myArr, prop) {
        return myArr
    }
}
