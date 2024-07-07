import { Injectable } from "@angular/core";
import { QueryParams } from "../models/temple.model";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class UtilService{
    params: QueryParams = new QueryParams();

    paramSource = new BehaviorSubject(this.params);

    observableParams = this.paramSource.asObservable();

    constructor(private route: ActivatedRoute, private router: Router){
        this.route.queryParams.subscribe(p => {
            let groupingParam: string = p['grouping'];
            this.params = {
                groupByField: groupingParam? groupingParam : QueryParams.DEFAULT_GROUP_BY_FIELD,
            };
            this.paramSource.next(this.params);
        });
    }

    setQueryParams(groupByField: string){
        let newParams: QueryParams = this.params;
        if(groupByField) newParams.groupByField = groupByField;
        if(groupByField){
            let queryParams: any = {};
            if(groupByField) queryParams.grouping = groupByField;
            this.router.navigate([], {
                queryParamsHandling: 'merge',
                skipLocationChange: false,
                relativeTo: this.route,
                queryParams: queryParams
            }).then(res => {
                this.params = newParams;
                this.paramSource.next(this.params);
            });
        }
    }

    setGroupByField(groupByField: string){
        this.setQueryParams(groupByField);
    }
}