import { Component, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../models/temple.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {
  member!: any;
  currentMemberData!: Member;
  memberform: FormGroup;

  closemessage = 'closed using directive'

  constructor(private service: MasterService, private _snackBar: MatSnackBar) {
    this.memberform = new FormGroup({
      name: new FormControl(''),
      fatherName: new FormControl(''),
      gender: new FormControl('Male'),
      streetAddress1: new FormControl(''),
      streetAddress2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zipCode: new FormControl(''),
      ancestorVillage: new FormControl(''),
      phone: new FormControl(''),
      whatsApp: new FormControl(''),
      emailId: new FormControl(''),
      notes: new FormControl(''),
      status:new FormControl(true),
    });

  }

  ngOnInit(): void {


  }

  saveMember() {
    if(this.memberform.dirty){
      this.memberform.value.status = 'Active';
      this.service.saveMember(this.memberform.value).subscribe(data => {
        this.member = data;
        this.openSnackBar("Member Added Successfully - [ Member ID - "+this.member.memberId+" ]", "Close")
        console.log("Member Added Successfully");
      });
    }
    console.warn('Member Added Successfully', this.memberform.value);
    this.memberform.reset();
  }

  clearform(){
    this.memberform.reset();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
