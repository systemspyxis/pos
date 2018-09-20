import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { OrderComponent } from './orders/order.component';
import { AddProductComponent } from './products/add-product.component';
import{ProductService} from './services/product.service'
import{OrderService} from './services/order.service';
import { EditComponent } from './products/edit.component';
import { ProductsPipe } from './Pipes/products.pipe';
import { AddUserComponent } from './users/add-user.component';
import { UserLoginComponent } from './users/user-login.component';
import { RemoveProductComponent } from './products/remove-product.component'

@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    AddProductComponent,
    EditComponent,
    ProductsPipe,
    AddUserComponent,
    UserLoginComponent,
    RemoveProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlashMessagesModule.forRoot()
],
  providers: [ProductService,OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
