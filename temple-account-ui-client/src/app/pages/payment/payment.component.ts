import { Component, Input, OnInit, signal, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Member, Occasion, Payment, SearchPaymentQuery } from '../../models/temple.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MasterService } from '../../services/master.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { PrintTemplateComponent } from '../print-template/print-template.component';
import { ReferenceData } from '../../models/reference-data.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  public params : any;
  paymentlist !: Payment[];
  dataSource: any;
  payment!: any;
  member!: Member;
  //currentPaymentData!: Payment;
  paymentform!: FormGroup;
  memberform!: FormGroup;
  searchQuery!: SearchPaymentQuery;
  paymentDate = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  displayedColumns: string[] = ["Action", "paymentId", "receiptNo",
  "occasionDesc","paymentType", "paymentAmount", "financialYear", "paymentDate","paymentMode", "receivedBy", "comments"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private service: MasterService, private route: ActivatedRoute, 
    private _snackBar: MatSnackBar, private dialog: MatDialog, private fb: FormBuilder) {    

    this.paymentform = new FormGroup({
      memberId: new FormControl(''),
      paymentDate: new FormControl(''),
      occasionCd: new FormControl(''),      
      paymentType: new FormControl(''),
      paymentMode: new FormControl(''),
      paymentAmount: new FormControl(''),
      financialYear: new FormControl(''),
      receivedBy: new FormControl(''),
      comments: new FormControl('')
    });   
    
    this.paymentform = this.fb.group({
      paymentDate: ['', Validators.required],
      financialYear: ['', Validators.required],
      occasionCd: ['', Validators.required],
      paymentType: ['', Validators.required],
      paymentMode: ['', Validators.required],
      paymentAmount: ['', Validators.required],
      receivedBy: ['', Validators.required]
    });

    this.memberform = new FormGroup({
      memberId: new FormControl('')
    });
  }

  memberDetails!: any;

  occasions: Occasion[] = ReferenceData.DEFAULT_OCCASIONS;

  paymentTypes=ReferenceData.DEFAULT_PAYMENT_TYPES;
  paymentModes=ReferenceData.DEFAULT_PAYMENT_MODES;
  financialYears = ReferenceData.DEFAULT_FINANCIAL_YEARS;

  ngOnInit() {    
    this.loadMemberAndPayments();
  }

  loadMemberAndPayments(){
    this.route.queryParamMap.subscribe(params => {
      const memberId = params.get('memberId');
      if(memberId!=null && memberId!='undefined'){  
        this.loadMember(memberId);
        this.loadPayments(memberId);
      }else{
        this.memberDetails = null;
      }           
    });
  }

  loadPayments(memberId:any){      
      let params = new HttpParams();
      params = params.set("memberId", memberId);
      this.resetDataSource();
      this.searchPayment(params);
  }

  searchPayment(params: HttpParams) {
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

  submitPayment() {
    //if(this.paymentform.dirty){
      if (this.paymentform.valid) {
          this.paymentform.value.member = this.memberDetails;
          this.service.savePayment(this.paymentform.value).subscribe(data => {
          this.payment = data;
          //this.openSnackBar("Member Added Successfully - [ Member ID - "+this.member.memberId+" ]", "Close")
          this.loadPayments(this.memberDetails?.memberId);
          this.printPayment(this.payment);
          console.log("Payment Added Successfully");
        });
        console.warn('Payment Added Successfully', this.paymentform.value);
        this.paymentform.reset();
      }else{
        this.paymentform.markAllAsTouched();
      }      
    //}
    
  }

  editPayment(element: Payment) {
    this.OpenEditPayment(element, 'Edit Member', EditPaymentComponent);
  }

  deletePayment(element: Payment) {
    this.OpenDialog(element, 'Payment', DialogComponent);
  }

  loadMember(memberId:any){
    this.service.GetMemberById(memberId).subscribe(res => {
      this.memberDetails = res;      
    });
  }

  submitMember(){
    if(this.memberform.dirty){
      this.member = this.memberform.value
      this.loadMember(this.member.memberId);
      this.loadPayments(this.member.memberId);
    }
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  
  printPayment(element: Payment) {
    this.OpenDialog(element, 'ViewPayment', PrintTemplateComponent);
  }

  OpenEditPayment(payment: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        memberDetails: this.memberDetails,
        title: title,
        rowdata: payment
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadPayments(this.memberDetails?.memberId);
    })
  }

  OpenDialog(payment: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '80%',
      enterAnimationDuration: '10ms',
      exitAnimationDuration: '300ms',
      data: {
        memberDetails: this.memberDetails,
        title: title,
        rowdata: payment
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadPayments(this.memberDetails?.memberId);
    })
  }

exportPayment(memberId:any){
  const timestamp = new Date().getTime(); // Get the current timestamp
  const fileName = `exported_payments_${memberId}_${timestamp}.csv`; // Append timestamp to the file name
  let params = new HttpParams();
  params = params.set("memberId", memberId);
  this.service.exportPaymentsToCsv(params).subscribe((res: any) => {
    const url = window.URL.createObjectURL(res);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Change the file name if needed
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
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
    this.paymentform.reset();
    this.resetDataSource();
  }
  

}
