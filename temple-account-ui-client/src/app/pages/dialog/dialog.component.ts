import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { User } from '../../models/userdetails.model';

@Component({
  selector: 'dialog-component',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {

  currentUserData!: User;
  user!: User;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DialogComponent>,
    private service: MasterService) {
      
    }

    ngOnInit(): void {
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

  deleteUser(userId: any) { 
      this.service.deleteUser(userId).subscribe(res => {
        console.log("User Deleted Successfully.");
      });
      this.closepopup();
  }

  closepopup() {
    this.ref.close('Closed using function');
  }


}
