import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { Member } from '../../models/temple.model';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  currentMemberData!: Member;
  member!: Member;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DialogComponent>,
    private service: MasterService) {

    }

    ngOnInit(): void {
      this.currentMemberData = this.data.rowdata;
      this.member = <Member>{
        memberId: this.currentMemberData.memberId,
        name: this.currentMemberData.name,
        fatherName: this.currentMemberData.fatherName,
        streetAddress1: this.currentMemberData.streetAddress1,
        streetAddress2: this.currentMemberData.streetAddress2,
        city: this.currentMemberData.city,
        state: this.currentMemberData.state,
        zipCode: this.currentMemberData.zipCode,
        ancestorVillage: this.currentMemberData.ancestorVillage,
        phone: this.currentMemberData.phone,
        whatsApp: this.currentMemberData.whatsApp,
        emailId: this.currentMemberData.emailId,
        notes: this.currentMemberData.notes
      }

  }

  deleteUser(memberId: any) {
      this.service.deleteMember(memberId).subscribe(res => {
        console.log("User Deleted Successfully.");
      });
      this.closepopup();
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


}
