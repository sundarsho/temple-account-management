import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Member, Occasion, Payment, SearchPaymentQuery } from '../../models/temple.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { EditPaymentComponent } from '../edit-payment/edit-payment.component';
import { PrintTemplateComponent } from '../print-template/print-template.component';

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
    private _snackBar: MatSnackBar, private dialog: MatDialog) {    

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

    this.memberform = new FormGroup({
      memberId: new FormControl('')
    });
  }

  memberDetails!: any;

  occasions: Occasion[] = [
    {value: 'MSRP', viewValue: 'Maha Sivarathri Poojai'},
    {value: 'MDP', viewValue: 'Mandala Poojai'},
    {value: 'VIL', viewValue: 'Vilakku Poojai'},
    {value: 'VAR', viewValue: 'Varushabisegam'},
    {value: 'LAK', viewValue: 'Laksharchanai'},
    {value: 'KUB', viewValue: 'Kumbabisegam'},
    {value: 'TKP', viewValue: 'Thiru Karthigai Poojai'},
    {value: 'SP', viewValue: 'Special Poojai'},
    {value: 'RP', viewValue: 'Regular Poojai'},
    {value: 'GEN', viewValue: 'General'},
  ];

  paymentTypeList=['Tax','Donation','Hundiyal','Poojai']
  paymentModeList=['Cash','UPI','Bank']
  financialYearList = ['2024-2025','2023-2024','2022-2023']

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
    if(this.paymentform.dirty){
      this.paymentform.value.member = this.memberDetails;
      this.service.savePayment(this.paymentform.value).subscribe(data => {
        this.payment = data;
        //this.openSnackBar("Member Added Successfully - [ Member ID - "+this.member.memberId+" ]", "Close")
        this.loadPayments(this.memberDetails?.memberId);
        this.printPayment(this.payment);
        console.log("Payment Added Successfully");
      });
    }
    console.warn('Payment Added Successfully', this.paymentform.value);
    this.paymentform.reset();
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
  }



}
