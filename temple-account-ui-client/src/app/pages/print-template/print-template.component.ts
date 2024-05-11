import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { Member, Payment } from '../../models/temple.model';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-print-template',
  templateUrl: './print-template.component.html',
  styleUrl: './print-template.component.css'
})
export class PrintTemplateComponent {
  isLoading: boolean = false;
  currentMemberData!: Member;
  member!: Member;
  memberDetails!: any;

  pageTitle: any;
  pagePrint: any;

  currentPaymentData!: Payment;
  payment!: Payment;

  @ViewChild('printContent')
  el!: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PrintTemplateComponent>,
  private service: MasterService) {

  }
  ngOnInit(): void {
    this.pageTitle = this.data.title;
    if(this.data.title == 'ViewPayment'){
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
        financialYear: this.currentPaymentData.financialYear,
        receivedBy: this.currentPaymentData.receivedBy,
        comments: this.currentPaymentData.comments
      }
    }
}

  printPayment(paymentId: any) { 
    this.isLoading = true;
    this.generatePDF(paymentId);
    this.closepopup();
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  generatePDF(paymentId: any) {
    // this.el.nativeElement.style.display='block';
    //  console.log(this.el.nativeElement);
     const element: any = document.getElementById('printContent'); 
    
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      //const pdf = new jspdf('p','px','a4');
      const pdf = new jspdf('l','px','a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0.25, 0, pdfWidth, pdfHeight);
      let fileName = 'Receipt_'+paymentId+'_'+this.memberDetails.memberId+'.pdf';
      pdf.save(fileName);
      this.isLoading = false;
    });
    

}
}
