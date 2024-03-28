import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FooterComponent } from './pages/footer/footer.component';
import { SideNavComponent } from './pages/side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { UserComponent } from './pages/user/user.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    UserlistComponent,
    UserComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
