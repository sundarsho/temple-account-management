import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SearchMemberComponent } from './pages/search-member/search-member.component';
import { MemberComponent } from './pages/member/member.component';
import { MemberlistComponent } from './pages/memberlist/memberlist.component';
import { PaymentReportComponent } from './pages/payment-report/payment-report.component';
import { MemberReportComponent } from './pages/member-report/member-report.component';

const routes: Routes = [
  {path:'memberlist',component: MemberlistComponent},
  {path:'member',component: MemberComponent},
  {path:'home',component:HomeComponent},
  {path:'searchMember',component:SearchMemberComponent},
  {path:'payment',component:PaymentComponent},
  {path:'paymentReport',component:PaymentReportComponent},
  {path:'memberReport',component:MemberReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
