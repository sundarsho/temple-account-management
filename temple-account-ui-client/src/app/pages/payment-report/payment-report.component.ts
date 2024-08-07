import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Member, Occasion, Payment, SearchPaymentQuery } from '../../models/temple.model';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { UtilService } from '../../services/util.service';
import { ReferenceData } from '../../models/reference-data.model';

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrl: './payment-report.component.css'
})
export class PaymentReportComponent {
  public params : any;
  paymentlist !: Payment[];
  dataSource: any;
  payment!: any;
  paymentsearchform!: FormGroup;
  searchQuery!: SearchPaymentQuery;
  paymentDate = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  displayedColumns: string[] = ["paymentId", "receiptNo",
  "occasionDesc","paymentType", "paymentAmount", "financialYear", "paymentDate","paymentMode", "receivedBy", "comments"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private service: MasterService, public datepipe: DatePipe,
    private utilService: UtilService) {    

    this.paymentsearchform = new FormGroup({
      memberId: new FormControl(''),
      paymentDate: new FormControl(''),
      occasionCd: new FormControl(''),      
      paymentType: new FormControl(''),
      paymentMode: new FormControl(''),
      paymentAmount: new FormControl(''),
      financialYear: new FormControl('2024-2025'),
      receivedBy: new FormControl(''),
      comments: new FormControl('')
    });    

  }

  occasions: Occasion[] = ReferenceData.DEFAULT_OCCASIONS;

  paymentTypes=ReferenceData.DEFAULT_PAYMENT_TYPES;
  paymentModes=ReferenceData.DEFAULT_PAYMENT_MODES;
  financialYears = ReferenceData.DEFAULT_FINANCIAL_YEARS;

  ngOnInit() {    

  }
  
  loadPayments(params: HttpParams){   
    return this.service.searchPayment(params).subscribe((res: Payment[]) => {
      this.paymentlist = res;
      this.dataSource = new MatTableDataSource<Payment>(this.paymentlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
        return data.paymentId.toString() === filter ||
        data.receiptNo.toString() === filter ||
        data.financialYear.toLowerCase().includes(filter) 
      };
    });
  }

  searchPayment() {
    //if(this.paymentsearchform.dirty){
      this.searchQuery = this.paymentsearchform.value;
     let params = new HttpParams();
     let paymentDateStr : any = this.datepipe.transform(this.searchQuery.paymentDate, 'yyyy-MM-dd')?.toString();
     params = this.searchQuery.memberId? params.set("memberId", this.searchQuery.memberId) : params;
     params = this.searchQuery.paymentId? params.set("paymentId", this.searchQuery.paymentId) : params;
     params = this.searchQuery.receiptNo? params.set("receiptNo", this.searchQuery.receiptNo) : params;
     params = this.searchQuery.occasionCd? params.set("occasionCd", this.searchQuery.occasionCd) : params;
     params = this.searchQuery.paymentType? params.set("paymentType", this.searchQuery.paymentType) : params;
     params = this.searchQuery.financialYear? params.set("financialYear", this.searchQuery.financialYear) : params;
     params = this.searchQuery.paymentDate? params.set("paymentDate", paymentDateStr) : params;
     params = this.searchQuery.paymentMode? params.set("paymentMode", this.searchQuery.paymentMode) : params;
     params = this.searchQuery.receivedBy? params.set("receivedBy", this.searchQuery.receivedBy) : params;
     //params = this.searchQuery.whatsApp? params.set("whatsApp", this.searchQuery.whatsApp) : params;
     //params = this.searchQuery.emailId? params.set("emailId", this.searchQuery.emailId) : params;
     this.resetDataSource();
     this.params = params;
     this.loadPayments(params);
   //}
  }

  formatDate(paymentDate: any){
    // var strInputValue =  paymentDate;
    // return new Date(strInputValue);
    if(paymentDate!=null && paymentDate!='undefined'){
      return this.datepipe.transform(this.searchQuery.paymentDate, 'yyyy-MM-dd')?.toString();
    }else{
      return null;
    }
    
  }

exportPayment(params: HttpParams){
  const timestamp = new Date().getTime(); // Get the current timestamp
  const fileName = `exported_file_${timestamp}.csv`; // Append timestamp to the file name
  this.service.exportPaymentsToCsv(params).subscribe((res: any) => {
    this.utilService.exportReport(res, fileName);
  });
    
}

  resetDataSource(){
    if(this.dataSource){
      this.dataSource = [];
    }
  }

  ngOnDestroy(): void {
    this.resetDataSource();
  }

  clearform(){
    this.paymentsearchform.reset();
    this.resetDataSource();
  }
}