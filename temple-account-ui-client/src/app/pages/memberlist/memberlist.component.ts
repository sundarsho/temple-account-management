import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../models/temple.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MasterService } from '../../services/master.service';
import { PopupComponent } from '../popup/popup.component';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrl: './memberlist.component.css'
})
export class MemberlistComponent implements OnInit {
[x: string]: any;

  public params : any;
  memberlist !: Member[];
  dataSource: any;
  dataSourceExport: any;
  displayedColumns: string[] = ["edit", "memberId", "name", "fatherName", "gender", "Address",
   "city","state", "phone", "whatsApp","emailId", "notes"];

  @ViewChild(MatPaginator) paginatior !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {
    this.loadMemberDetails();
  }

  ngOnInit(): void {
  }

  loadMemberDetails() {
    this.service.GetMembers().subscribe(res => {
      this.memberlist = res;
      this.dataSource = new MatTableDataSource<Member>(this.memberlist);
      this.dataSource.paginator = this.paginatior;
      this.dataSource.sort = this.sort;

      this.dataSource.filterPredicate = function(data: any, filter: string): boolean {
        return data.memberId.toString() === filter ||
        data.name.toLowerCase().includes(filter) ||
        data.fatherName.toLowerCase().includes(filter) ||
        data.ancestorVillage.toLowerCase().includes(filter) ||
        data.city.toLowerCase().includes(filter) ||
        data.state.toLowerCase().includes(filter) ||
        data.emailId.toLowerCase().includes(filter) ||
        data.gender?.toLowerCase().includes(filter)
      };

    });

  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  editMember(element: Member) {
    this.Openpopup(element, 'Edit Member', PopupComponent);
  }

  deleteMember(element: Member) {
    this.OpenDialog(element, 'Member', DialogComponent);
  }

  exportMember(){
    const timestamp = new Date().getTime(); // Get the current timestamp
    const fileName = `exported_file_${timestamp}.csv`; // Append timestamp to the file name
    this.service.exportMembersToCsv().subscribe((res: any) => {
      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Change the file name if needed
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  }

  OpenDialog(member: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '25%',
      enterAnimationDuration: '10ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        rowdata: member
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadMemberDetails();
    })
  }


  Openpopup(member: any, title: any,component:any) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {
        title: title,
        rowdata: member
      }
    });
    _popup.afterClosed().subscribe(item => {
      this.loadMemberDetails();
    })
  }

}
