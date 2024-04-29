import { Component, Inject } from '@angular/core';
import { Occasion, Payment } from '../../models/temple.model';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-edit-payment',
  templateUrl: './edit-payment.component.html',
  styleUrl: './edit-payment.component.css'
})
export class EditPaymentComponent {
  editPayment: any;
  payment!: Payment;
  currentPaymentData!: Payment;
  editPaymentform: FormGroup;
  memberDetails!: any;

  closemessage = 'closed using directive'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EditPaymentComponent>,
    private service: MasterService) {

      this.editPaymentform = new FormGroup({
        paymentId: new FormControl(''), 
        memberId: new FormControl(''),
        receiptNo: new FormControl(''), 
        paymentDate: new FormControl(''),
        occasionCd: new FormControl(''),      
        paymentType: new FormControl(''),
        paymentMode: new FormControl(''),
        paymentAmount: new FormControl(''),
        financialYear: new FormControl('')
      });  
  }

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

  ngOnInit(): void {
      this.memberDetails = this.data.memberDetails
      this.currentPaymentData = this.data.rowdata;
      this.payment = <Payment>{
        paymentId: this.currentPaymentData.paymentId,
        receiptNo: this.currentPaymentData.receiptNo,
        paymentDate: this.currentPaymentData.paymentDate,
        occasionCd: this.currentPaymentData.occasionCd,
        paymentType: this.currentPaymentData.paymentType,
        paymentMode: this.currentPaymentData.paymentMode,
        paymentAmount: this.currentPaymentData.paymentAmount,
        financialYear: this.currentPaymentData.financialYear
      }

      this.payment.paymentDate = this.formatDate(this.payment.paymentDate);

  }

  formatDate(paymentDate: any){
    var strInputValue =  paymentDate.replace(/-/, '/')  // replace 1st "-" with "/"
                             .replace(/-/, '/'); // replace 2nd "-" with "/"
    return new Date(strInputValue);
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  savePayment() {
    if(this.editPaymentform.dirty){
      this.payment.member = this.memberDetails;
      this.service.savePayment(this.payment).subscribe(data => {
        console.log("Payment Updated Successfully");
        this.closepopup();
      });      
    }
    this.closepopup();
  }

}
