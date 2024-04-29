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
import { MemberlistComponent } from './pages/memberlist/memberlist.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './pages/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaymentComponent } from './pages/payment/payment.component';
import { SearchMemberComponent } from './pages/search-member/search-member.component';
import { MemberComponent } from './pages/member/member.component';
import { EditPaymentComponent } from './pages/edit-payment/edit-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    MemberlistComponent,
    PopupComponent,
    HomeComponent,
    DialogComponent,
    SearchMemberComponent,
    PaymentComponent,
    MemberComponent,
    EditPaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
