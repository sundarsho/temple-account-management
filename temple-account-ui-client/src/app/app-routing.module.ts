import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserlistComponent } from './pages/userlist/userlist.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path:'userlist',component: UserlistComponent},
  {path:'user',component: UserComponent},
  {path:'home',component:HomeComponent}
  // {path:'table',component:TableComponent},
  // {path:'form',component:FormdesignComponent},
  // {path:'associate',component:AssociateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
