import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{


  @ViewChild('drawer', { static: true })
  sidenav!: MatSidenav;

  ngOnInit(): void {
  }

  
  
}
