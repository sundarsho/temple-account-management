import { Component, ViewChild } from '@angular/core';
import { User } from '../../models/userdetails.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../services/master.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent {


  userlist !: User[];
  dataSource: any;
  displayedColumns: string[] = ["edit", "userId", "name", "fatherName", "Address",
   "city","state", "phone", "whatsApp","emailId", "notes"];
  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.service.GetUsers().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource<User>(this.userlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;
    });
  }

  editDialog(userId: number) {
    throw new Error('Method not implemented.');
  }

  // GetUsers():Observable<User[]>{
  //   return this.http.get<User[]>("http://localhost:8080/user/all");
  // }

}
