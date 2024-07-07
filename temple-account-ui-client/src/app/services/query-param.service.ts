import { Injectable } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Params, Router } from "@angular/router";
import { Observable} from "rxjs";
import { filter, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class QueryParamService{
    readonly paramsChanged!: Observable<Params>;

    readonly pathChanged!: Observable<string>;

    constructor(private route: ActivatedRoute, private router: Router){
        let currentPath: string;
        this.pathChanged = this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd), map((e:NavigationEnd) => e.url), filter(url => {
            const path = router.parseUrl(url).root.children['primary'].segments.map(it => it.path).join('/');
            const pathChanged = path !==currentPath;
            if(pathChanged) currentPath = path;
            return pathChanged;
        }));

        this.paramsChanged = this.route.queryParams;
    }

    setParam(paramName: string, paramValue:any): Promise<boolean>{
        const params: Params = {};
        if(paramName) params[paramName] = paramValue;
        return this.router.navigate([],{
            queryParamsHandling: 'merge',
            skipLocationChange: false,
            relativeTo: this.route,
            queryParams: params
        });
    }
}