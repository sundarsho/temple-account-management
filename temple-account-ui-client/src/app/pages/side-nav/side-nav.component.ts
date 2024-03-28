import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
  ngOnInit(): void {
  }

  @ViewChild('side-nav', { static: true })
  sidenav!: MatSidenav;
  reason = '';

  close(reason: string){
    this.reason = reason;
    this.sidenav.close();
  }

}
