import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { UserlistComponent } from './pages/userlist/userlist.component';

const routes: Routes = [
  {path:'userlist',component: UserlistComponent},
  {path:'user',component: UserComponent}
  // {path:'slider',component:SliderComponent},
  // {path:'table',component:TableComponent},
  // {path:'form',component:FormdesignComponent},
  // {path:'associate',component:AssociateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
