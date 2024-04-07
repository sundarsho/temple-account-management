import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { SearchUserQuery, User } from '../models/userdetails.model';
import { MasterService } from '../services/master.service';

import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'search-user',
  templateUrl: './search-user.component.html',
  styleUrl: './search-user.component.css'
})
export class SearchUserComponent {
  public params : any;
  userlist !: User[];
  dataSource: any;
  currentUserData!: User;
  userSearchform!: FormGroup;
  searchQuery!: SearchUserQuery;

  displayedColumns: string[] = ["payment", "userId", "name", "fatherName", 
  "gender", "Address", "city", "phone"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.userSearchform = new FormGroup({
      name: new FormControl(''),
      userId: new FormControl(''),
      fatherName: new FormControl(''),
      gender: new FormControl(''),
      city: new FormControl(''),
      //zipCode: new FormControl(''),
      //ancestorVillage: new FormControl(''),
      phone: new FormControl('')
      //whatsApp: new FormControl(''),
      //emailId: new FormControl('')
    });
  }
  
  loadUserDetails(params: HttpParams) {
    return this.service.searchUser(params).subscribe((res: User[]) => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource<User>(this.userlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      // this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
      //   return data.userId.toString() === filter || 
      //   data.name.toLowerCase().includes(filter) || 
      //   data.fatherName.toLowerCase().includes(filter) ||
      //   data.ancestorVillage.toLowerCase().includes(filter) ||
      //   data.city.toLowerCase().includes(filter) ||
      //   data.emailId.toLowerCase().includes(filter) 
      // };

    });
  }

  searchUser() {    
      
    //this.Openpopup(element, 'Edit User', PopupComponent);
    if(this.userSearchform.dirty){
       this.searchQuery = this.userSearchform.value; 
      let params = new HttpParams();
      params = this.searchQuery.userId? params.set("userId", this.searchQuery.userId) : params;
      params = this.searchQuery.name? params.set("name", this.searchQuery.name) : params;
      params = this.searchQuery.gender? params.set("gender", this.searchQuery.gender) : params;      
      params = this.searchQuery.fatherName? params.set("fatherName", this.searchQuery.fatherName) : params;
      params = this.searchQuery.city? params.set("city", this.searchQuery.city) : params;      
      params = this.searchQuery.phone? params.set("phone", this.searchQuery.phone) : params;
      //params = this.searchQuery.zipCode? params.set("zipCode", this.searchQuery.zipCode) : params;
      //params = this.searchQuery.whatsApp? params.set("whatsApp", this.searchQuery.whatsApp) : params;
      //params = this.searchQuery.emailId? params.set("emailId", this.searchQuery.emailId) : params;
      this.resetDataSource();
      this.loadUserDetails(params);
    }
  }

  resetDataSource(){
    if(this.dataSource){
      this.dataSource = [];
    }
  }

  ngOnDestroy(): void {
    this.resetDataSource();
  }
  
  redirectPaymentPage(userId: number) {    

    this.router.navigate(['payment'], {
      state: {
        response: { data: userId },
      },
    });
    //this.Openpopup(element, 'Edit User', PopupComponent);
  }

  clearform(){
    this.userSearchform.reset();
  }  
  
}
