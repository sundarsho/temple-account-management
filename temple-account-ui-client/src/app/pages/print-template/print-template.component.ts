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
    this.generatePDF();
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  generatePDF() {
    this.el.nativeElement.style.display='block';
     console.log(this.el.nativeElement);
    //  var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    //  mywindow?.document.write('<html><head><title>' + document.title  + '</title>');
    //  //mywindow?.document.write('<style>.h1{}</style>');
    //  mywindow?.document.write('</head><body >');
    //  mywindow?.document.write('<h1>' + document.title  + '</h1>');
    //  mywindow?.document.write(this.el.nativeElement.innerHTML);
    //  mywindow?.document.write('</body></html>');
 
    //  mywindow?.document.close(); // necessary for IE >= 10
    //  mywindow?.focus(); // necessary for IE >= 10*/
 
    //  mywindow?.print();
    //  mywindow?.close();
     const element: any = document.getElementById('printContent'); // Replace with your template's element ID
    
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf('p','px','a4');
      //pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      console.log(pdfWidth+"----"+pdfHeight);
      //pdf.addImage(imgData, 'PNG', 100, 100, pdfWidth, pdfHeight);
      pdf.addImage(imgData, 'PNG', 0.25, 0, pdfWidth, pdfHeight);
      pdf.save('template.pdf');
    });

    // html2canvas(element).then(canvas => {
    //   const imgData = canvas.toDataURL('image/png');
    //   const pdf = new jspdf('p','px','a4');
    //   const imgWidth = 210;
    //   const pageHeight = 297;
    //   console.log(canvas.height +"----"+canvas.width);
    //   const imgHeight = canvas.height * imgWidth / canvas.width;
    //   let heightLeft = imgHeight;
    //   let position = 0;

    //   pdf.addImage(imgData, 'PNG', 50, position, imgWidth, imgHeight);
    //   heightLeft -= pageHeight;

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight;
    //     pdf.addPage();
    //     pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;
    //   }

    //   pdf.save('template.pdf');
    // });
}
}
