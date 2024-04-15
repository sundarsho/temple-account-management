import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../../models/temple.model';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  constructor(private service: MasterService, private route: ActivatedRoute) {    
  }

  memberDetails!: any;
  
  ngOnInit() {
    //let userId = this.route.snapshot.paramMap.get('userId');
    
    // if(this.userId!=null && this.userId!='undefined'){
    //   this.service.GetUsers().subscribe(res => {
    //     this.userDetails = res;
    //   });
    // }else{
    //   this.userId = '';
    // }

    this.route.queryParamMap.subscribe(params => {
      const memberId = params.get('memberId');
      if(memberId!=null && memberId!='undefined'){   
        this.service.GetMemberById(memberId).subscribe(res => {
          this.memberDetails = res;
        });
      }else{
        this.memberDetails = null;
      }           
    });


  }
}
