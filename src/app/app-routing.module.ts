import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from "./orders/order.component";
import {AddProductComponent} from "./products/add-product.component";
import {EditComponent} from "./products/edit.component";
import {RemoveProductComponent} from "./products/remove-product.component";
import {AddUserComponent} from "./users/add-user.component";
import {UserLoginComponent} from "./users/user-login.component";

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'pos', component: OrderComponent },
  {path:'product/new',component:AddProductComponent},
  {path:'product/edit',component:EditComponent},
  {path:'product/remove',component:RemoveProductComponent},
  {path:'user/new',component:AddUserComponent},
  {path:'user/login',component:UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
