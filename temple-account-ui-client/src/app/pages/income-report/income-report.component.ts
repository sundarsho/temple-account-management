import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupBy, GroupSummaryStatistics, Payment, QueryParams, SearchPaymentQuery } from '../../models/temple.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { QueryParamService } from '../../services/query-param.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrl: './income-report.component.css',
  encapsulation: ViewEncapsulation.None
})
export class IncomeReportComponent implements OnInit, OnDestroy{

  onDestroy: Subject<void> = new Subject();
  public params : any;
  public pieChartData: any;
  public groupByField: string = QueryParams.DEFAULT_GROUP_BY_FIELD;
  public aggregationField: string = QueryParams.DEFAULT_AGGREGATION;
  public financialYear: string = QueryParams.DEFAULT_FINANCIAL_YEAR;
  public pieChartLoading = false;  
  public selectedDateStr: string | null = '';

  paymentlist !: Payment[];
  groupSummaryList !: GroupSummaryStatistics[];
  pieChartSubscription!: Subscription;
  public paymentData: any;
  dataSource: any;
  today = new Date();
  groupByForm!: FormGroup;
  searchQuery!: SearchPaymentQuery;
  paymentDate = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());
  displayedColumns: string[] = ["description","count", "sum"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  

  constructor(private service: MasterService, public datepipe: DatePipe, 
    private paramService: QueryParamService, private utilService: UtilService) {
    this.paramService.paramsChanged.pipe(takeUntil(this.onDestroy)).subscribe(params =>{
      if(!params){
        return;
      }      
      const msg: string = 'hello';
      msg.replace('\n', '&#13;');
      const newGroupByField: string = params['grouping'] ? params['grouping'] : QueryParams.DEFAULT_GROUP_BY_FIELD;
      const groupByChange: boolean = !this.groupByField || newGroupByField !== this.groupByField;

      const newfinancialYearField: string = params['financialYear'] ? params['financialYear'] : QueryParams.DEFAULT_FINANCIAL_YEAR;
      const financialYearChange: boolean = !this.financialYear || newfinancialYearField !== this.financialYear;

      const newselectedDateStrField: string = params['selectedDateStr'] ? params['selectedDateStr'] : '';
      const selectedDateStrChange: boolean = !this.selectedDateStr || newselectedDateStrField !== this.selectedDateStr;
      
      if(groupByChange || financialYearChange || selectedDateStrChange){
        this.groupByField = newGroupByField;
        this.selectedDateStr = newselectedDateStrField;
        this.financialYear = newfinancialYearField;
        this.updatePieChart();
      }  
      
    });
    
  }
 

  ngOnInit(): void {
    this.updatePieChart();
  }
  ngOnDestroy(): void {    
  }

  

  public updatePieChart(){
    this.pieChartLoading = true;
    
    if(this.pieChartSubscription) this.pieChartSubscription.unsubscribe;  

    //this.searchQuery = this.groupByForm.value;
     let params = new HttpParams();
     //let paymentDateStr : any = this.datepipe.transform(this.searchQuery.paymentDate, 'yyyy-MM-dd')?.toString();
     params = this.financialYear != '--Select--'? params.set("financialYear", this.financialYear) : params;
     params = this.selectedDateStr ? params.set("paymentDate", this.selectedDateStr) : params;
     params = this.groupByField? params.set("groupByField", this.groupByField) : params.set("groupByField", "paymentType");
     params = this.aggregationField? params.set("aggregationField", this.aggregationField) : params.set("aggregationField", "paymentAmount");
     //params = this.searchQuery.aggregationType? params.set("aggregationType", this.searchQuery.aggregationType) : params.set("aggregationType", "Sum");
     this.params = params;
     this.resetDataSource();
     this.pieChartSubscription = this.service.incomeGroupByReportService(params).subscribe((res: GroupSummaryStatistics[]) => {
      this.groupSummaryList = res;
      this.dataSource = new MatTableDataSource<GroupSummaryStatistics>(this.groupSummaryList);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
        return data.description.toLowerCase().includes(filter) ||
        data.paymentAmount.toString() === filter ||
        data.financialYear.toLowerCase().includes(filter) 
      };
      
      this.pieChartLoading = false;
      this.pieChartData = res ? res.map(o => new Object({name: o.description ? o.description: 'N/A', value: o.sum ? o.sum : 0})) :[];

    }, err => {
      this.pieChartLoading = false;
      this.pieChartData = [];
    });
  }

  changeFinancialValue(financialYear: string): void{
    this.financialYear = financialYear;
    this.updatePieChart();
  }

  onDateSelected(event: MatDatepickerInputEvent<Date>){
      this.selectedDateStr = this.datepipe.transform(event.value, 'yyyy-MM-dd');
      this.updatePieChart();
  }

  resetDataSource(){
    if(this.dataSource){
      this.dataSource = [];
    }
  }

  openExportSheet(event?: any){
    
  }

  openExport(params: HttpParams){
    const timestamp = new Date().getTime(); // Get the current timestamp
    const fileName = `exported_file_${timestamp}.csv`; // Append timestamp to the file name
    if(params!=null && params.toString()!='undefined'){
      this.service.exportGrouByStatsToCsv(params).subscribe((res: any) => {
        this.utilService.exportReport(res, fileName);
      });
    }
  }

}
