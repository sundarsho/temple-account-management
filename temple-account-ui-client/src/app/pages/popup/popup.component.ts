import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { User } from '../../models/userdetails.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  user!: User;
  currentUserData!: User;
  UserUpdateForm: FormGroup;

  closemessage = 'closed using directive'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>,
    private service: MasterService) {

      this.UserUpdateForm = new FormGroup({
        name: new FormControl(''),
        userId: new FormControl(''),
        fatherName: new FormControl(''),
        streetAddress1: new FormControl(''),
        streetAddress2: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
        ancestorVillage: new FormControl(''),
        phone: new FormControl(''),
        whatsApp: new FormControl(''),
        emailId: new FormControl(''),
        notes: new FormControl('')
      });

  }
  ngOnInit(): void {
    this.inputdata = this.data;

      this.currentUserData = this.data.rowdata;
      this.user = <User>{
        userId: this.currentUserData.userId,
        name: this.currentUserData.name,
        fatherName: this.currentUserData.fatherName,
        streetAddress1: this.currentUserData.streetAddress1,
        streetAddress2: this.currentUserData.streetAddress2,
        city: this.currentUserData.city,
        state: this.currentUserData.state,
        zipCode: this.currentUserData.zipCode,
        ancestorVillage: this.currentUserData.ancestorVillage,
        phone: this.currentUserData.phone,
        whatsApp: this.currentUserData.whatsApp,
        emailId: this.currentUserData.emailId,
        notes: this.currentUserData.notes
      }

  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  saveUser() {
    if(this.UserUpdateForm.dirty){
      this.service.saveUser(this.user).subscribe(data => {
        console.log("User Saved Successfully");
        this.closepopup();
      });
    }
    this.closepopup();
  }


}
