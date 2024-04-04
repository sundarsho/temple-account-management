import { Component, Inject } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/userdetails.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user!: User;
  currentUserData!: User;
  userform: FormGroup;

  closemessage = 'closed using directive'

  countrylist=['India','USA','Singapore','UK']
  termlist=['15days','30days','45days','60days']

  constructor(private service: MasterService) {
    this.userform = new FormGroup({
      name: new FormControl(''),
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
    this.currentUserData = this.userform.value;
    
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

  saveUser() {
    if(this.userform.dirty){
      this.service.saveUser(this.user).subscribe(data => {
        console.log("User Added Successfully");
      });
    }
    console.warn('User Added Successfully', this.userform.value);
    this.userform.reset();
  }

  clearform(){
    this.userform.reset();
  }


}
