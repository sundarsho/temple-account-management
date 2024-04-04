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
    
    
  }  

  saveUser() {
    if(this.userform.dirty){
      this.service.saveUser(this.userform.value).subscribe(data => {
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
