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
            let financialYearParam: string = p['financialYear'];
            let selectedDateParam: string = p['selectedDateStr'];
            this.params = {
                groupByField: groupingParam? groupingParam : QueryParams.DEFAULT_GROUP_BY_FIELD,
                financialYear: financialYearParam? financialYearParam : QueryParams.DEFAULT_FINANCIAL_YEAR,
                selectedDateStr: selectedDateParam? selectedDateParam : QueryParams.DEFAULT_DATE_STR
            };
            this.paramSource.next(this.params);
        });
    }

    setQueryParams(groupByField: string, financialYear: string, selectedDateStr: string){
        let newParams: QueryParams = this.params;
        if(groupByField) newParams.groupByField = groupByField;
        if(financialYear) newParams.financialYear = financialYear;
        if(selectedDateStr) newParams.selectedDateStr = selectedDateStr;
        if(groupByField){
            let queryParams: any = {};
            if(groupByField) queryParams.grouping = groupByField;
            if(financialYear) queryParams.financialYear = financialYear;
            if(selectedDateStr) queryParams.selectedDateStr = selectedDateStr;
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
        this.setQueryParams(groupByField, '', '');
    }

    exportReport(res: any, fileName: string) {
        const url = window.URL.createObjectURL(res);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName; // Change the file name if needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
}