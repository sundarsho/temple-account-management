import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { Member } from '../../models/temple.model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'popup-component',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  inputdata: any;
  editMember: any;
  member!: Member;
  currentMemberData!: Member;
  MemberUpdateForm: FormGroup;
  statusInd: boolean = false;

  closemessage = 'closed using directive'

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<PopupComponent>,
    private service: MasterService) {

      this.MemberUpdateForm = new FormGroup({
        name: new FormControl(''),
        memberId: new FormControl(''),
        fatherName: new FormControl(''),
        gender: new FormControl(''),
        streetAddress1: new FormControl(''),
        streetAddress2: new FormControl(''),
        streetAddress3: new FormControl(''),
        city: new FormControl(''),
        state: new FormControl(''),
        zipCode: new FormControl(''),
        ancestorVillage: new FormControl(''),
        phone: new FormControl(''),
        whatsApp: new FormControl(''),
        emailId: new FormControl(''),
        notes: new FormControl(''),
        statusInd:new FormControl('')
      });

  }
  ngOnInit(): void {
    this.inputdata = this.data;

      this.currentMemberData = this.data.rowdata;
      this.member = <Member>{
        memberId: this.currentMemberData.memberId,
        name: this.currentMemberData.name,
        fatherName: this.currentMemberData.fatherName,
        gender: this.currentMemberData.gender,
        streetAddress1: this.currentMemberData.streetAddress1,
        streetAddress2: this.currentMemberData.streetAddress2,
        streetAddress3: this.currentMemberData.streetAddress3,
        city: this.currentMemberData.city,
        state: this.currentMemberData.state,
        zipCode: this.currentMemberData.zipCode,
        ancestorVillage: this.currentMemberData.ancestorVillage,
        phone: this.currentMemberData.phone,
        whatsApp: this.currentMemberData.whatsApp,
        emailId: this.currentMemberData.emailId,
        notes: this.currentMemberData.notes,
        createdDt: this.currentMemberData.createdDt,
        createdBy: this.currentMemberData.createdBy,
        status: this.currentMemberData.status
      }

      if(this.member.status!=null && this.member.status!='undefined'){
        if(this.member.status == 'Active'){
          this.statusInd = true;
        }else{
          this.statusInd = false;
        }
      }

  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  saveMember() {
    if(this.MemberUpdateForm.dirty){
      if(this.statusInd == true){
        this.member.status = 'Active';
      }else{
        this.member.status = 'InActive';
      }
      this.service.saveMember(this.member).subscribe(data => {
        this.editMember = data;
        console.log("Member Saved Successfully");
        this.closepopup();
      });
    }
    this.closepopup();
  }


}
