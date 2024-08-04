import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SearchMemberQuery, Member } from '../../models/temple.model';
import { MasterService } from '../../services/master.service';

import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-member-report',
  templateUrl: './member-report.component.html',
  styleUrl: './member-report.component.css'
})
export class MemberReportComponent {
  public params : any;
  //queryParams: any;
  memberlist !: Member[];
  dataSource: any;
  currentMemberData!: Member;
  memberSearchform!: FormGroup;
  searchQuery!: SearchMemberQuery;

  displayedColumns: string[] = ["memberId", "name", "fatherName",
  "gender", "Address", "ancestorVillage","city", "phone"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private router: Router, 
    private utilService: UtilService) {

  }

  ngOnInit(): void {
    this.memberSearchform = new FormGroup({
      name: new FormControl(''),
      memberId: new FormControl(''),
      fatherName: new FormControl(''),
      gender: new FormControl(''),
      city: new FormControl(''),
      //zipCode: new FormControl(''),
      ancestorVillage: new FormControl(''),
      phone: new FormControl('')
      //whatsApp: new FormControl(''),
      //emailId: new FormControl('')
    });
  }

  loadMemberDetails(params: HttpParams) {
    return this.service.searchMember(params).subscribe((res: Member[]) => {
      this.memberlist = res;
      this.dataSource = new MatTableDataSource<Member>(this.memberlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  searchMember() {

    if(this.memberSearchform.dirty){
       this.searchQuery = this.memberSearchform.value;
      let params = new HttpParams();
      params = this.searchQuery.memberId? params.set("memberId", this.searchQuery.memberId) : params;
      params = this.searchQuery.name? params.set("name", this.searchQuery.name) : params;
      params = this.searchQuery.gender? params.set("gender", this.searchQuery.gender) : params;
      params = this.searchQuery.fatherName? params.set("fatherName", this.searchQuery.fatherName) : params;
      params = this.searchQuery.city? params.set("city", this.searchQuery.city) : params;
      params = this.searchQuery.phone? params.set("phone", this.searchQuery.phone) : params;
      params = this.searchQuery.phone? params.set("ancestorVillage", this.searchQuery.ancestorVillage) : params;
      //params = this.searchQuery.zipCode? params.set("zipCode", this.searchQuery.zipCode) : params;
      //params = this.searchQuery.whatsApp? params.set("whatsApp", this.searchQuery.whatsApp) : params;
      //params = this.searchQuery.emailId? params.set("emailId", this.searchQuery.emailId) : params;
      this.resetDataSource();
      this.params = params;
      this.loadMemberDetails(params);
    }
  }

  exportMembers(params: HttpParams){
    const timestamp = new Date().getTime(); // Get the current timestamp
    const fileName = `exported_file_${timestamp}.csv`; // Append timestamp to the file name
    if(params!=null && params.toString()!='undefined'){
      this.service.exportSearchMembersToCsv(params).subscribe((res: any) => {
        this.utilService.exportReport(res, fileName);
      });
    }else{
      this.service.exportMembersToCsv().subscribe((res: any) => {
        this.utilService.exportReport(res, fileName);
      });
    }
  }

  exportAllMembers(){
    const timestamp = new Date().getTime(); // Get the current timestamp
    const fileName = `exported_file_${timestamp}.csv`; // Append timestamp to the file name
      this.service.exportMembersToCsv().subscribe((res: any) => {
        this.utilService.exportReport(res, fileName);
      });    
  }

  resetDataSource(){
    if(this.dataSource){
      this.dataSource = [];
    }
  }

  ngOnDestroy(): void {
    this.resetDataSource();
  }

  redirectPaymentPage(memberId: number) {

    this.router.navigate(['payment'], {
      state: {
        response: { data: memberId },
      },
    });
    //this.Openpopup(element, 'Edit User', PopupComponent);
  }

  clearform(){
    this.memberSearchform.reset();
    this.resetDataSource();
  }

}
