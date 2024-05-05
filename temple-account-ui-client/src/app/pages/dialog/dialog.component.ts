import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { Member, Payment } from '../../models/temple.model';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  currentMemberData!: Member;
  member!: Member;
  memberDetails!: any;

  pageTitle: any;
  pagePrint: any;

  currentPaymentData!: Payment;
  payment!: Payment;

  @ViewChild('printContent')
  el!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DialogComponent>,
    private service: MasterService) {

    }

    ngOnInit(): void {
      this.pageTitle = this.data.title;
      if(this.data.title == 'Member'){        
        this.currentMemberData = this.data.rowdata;
        this.member = <Member>{
          memberId: this.currentMemberData.memberId,
          name: this.currentMemberData.name,
          fatherName: this.currentMemberData.fatherName
        }
      }else if(this.data.title == 'Payment'){
        this.currentPaymentData = this.data.rowdata;
        this.payment = <Payment>{
          paymentId: this.currentPaymentData.paymentId,
          receiptNo: this.currentPaymentData.receiptNo,
          occasionDesc: this.currentPaymentData.occasionDesc
        }
      }else if(this.data.title == 'ViewPayment'){
        this.memberDetails = this.data.memberDetails
        this.currentPaymentData = this.data.rowdata;
        this.payment = <Payment>{
          paymentId: this.currentPaymentData.paymentId,
          receiptNo: this.currentPaymentData.receiptNo,
          occasionDesc: this.currentPaymentData.occasionDesc,
          paymentType: this.currentPaymentData.paymentType,
          paymentDate: this.currentPaymentData.paymentDate,
          paymentMode: this.currentPaymentData.paymentMode,
          paymentAmount: this.currentPaymentData.paymentAmount,
          financialYear: this.currentPaymentData.financialYear
        }
      }
  }

  deleteMember(memberId: any) {
      this.service.deleteMember(memberId).subscribe(res => {
        console.log("Member Deleted Successfully.");
      });
      this.closepopup();
  }

  deletePayment(paymentId: any) {
    this.service.deletePayment(paymentId).subscribe(res => {
      console.log("Payment Deleted Successfully.");
    });
    this.closepopup();
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

}
