import { SPDataService } from './sp-data.service';

import { environment } from '../../environments/environment';

export abstract class DataComponent {

    constructor(private spData: SPDataService) {}

    protected abstract onNewData(data: any): void;

    protected subscribe(listName: string): void
    {
            this.spData.getList(listName).subscribe(data => this.onNewData(data));
     }

    
    protected groupBy(list, keyGetter)
    {
        const map = new Map();
        list.forEach((item) => {
            const key = keyGetter(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
}
