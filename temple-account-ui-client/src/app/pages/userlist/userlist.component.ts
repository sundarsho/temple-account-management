import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/userdetails.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { PopupComponent } from '../popup/popup.component';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})
export class UserlistComponent implements OnInit {

  public params : any;
  userlist !: User[];
  dataSource: any;
  displayedColumns: string[] = ["edit", "userId", "name", "fatherName", "gender", "Address",
   "city","state", "phone", "whatsApp","emailId", "notes"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {
    this.loadUserDetails();    
  }

  ngOnInit(): void {

  }
  
  loadUserDetails() {
    this.service.GetUsers().subscribe(res => {
      this.userlist = res;
      this.dataSource = new MatTableDataSource<User>(this.userlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
        return data.userId.toString() === filter || 
        data.name.toLowerCase().includes(filter) || 
        data.fatherName.toLowerCase().includes(filter) ||
        data.ancestorVillage.toLowerCase().includes(filter) ||
        data.city.toLowerCase().includes(filter) ||
        data.state.toLowerCase().includes(filter) ||
        data.emailId.toLowerCase().includes(filter) 
      };

    });
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editUser(element: User) {    
    this.Openpopup(element, 'Edit User', PopupComponent);
  }

  deleteUser(element: User) {  
    this.OpenDialog(element, 'Delete User', DialogComponent);
      
  }

  OpenDialog(user: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '25%',
      enterAnimationDuration: '10ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        rowdata: user
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadUserDetails();
    })
  }
  

  Openpopup(user: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        rowdata: user
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadUserDetails();
    })
  }

}
