import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path:'userlist',component: UserlistComponent},
  {path:'user',component: UserComponent},
  {path:'home',component:HomeComponent},
  {path:'searchUser',component:SearchUserComponent},
  {path:'payment',component:PaymentComponent}
  // {path:'associate',component:AssociateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
