import { Component, OnInit } from '@angular/core';
import { CustomerOrder, PaymentMethod } from "./models/data-model";
import { OrderService } from "./services/order.service";
import { AppService } from "./services/app.service";
import { AppSettings } from "./models/app-settings";
import * as $ from 'jquery';
import { EventEmitter } from 'selenium-webdriver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  order: CustomerOrder = new CustomerOrder();
  balance: number;
  minimumPaymentMethods: number;
  constructor(private orderService: OrderService,private appService:AppService) { }


   ngOnInit() {
  
  }

  updateOrder(): void {
    console.log('updateOrder');
    this.order = this.orderService.order;
    console.log(this.orderService.order);
    console.log(this.order);
    this.order.PaymentMethods[0].amount = this.order.TotalPayable;
    this.balance = this.order.PaymentMethods[0].amount - this.order.TotalPayable
  }
  amountChanged(): void {
    console.log("amountChanged");
    this.balance = this.getTotalAmount() - this.orderService.order.TotalPayable
    this.orderService.order.Balance=this.balance;
    console.log(this.orderService.order.PaymentMethods);
    if (this.orderService.order.PaymentMethods.length > 1 && this.minimumPaymentMethods > 0) {
      this.orderService.order.PaymentMethods.splice(this.minimumPaymentMethods)
    }

  }
  payTypeChanged(paymentOption, od: PaymentMethod): void {
    console.log("payTypeChanged");
    od.name = paymentOption;
  }
  addPayment(payMethod: PaymentMethod): void {
    let payoptions: string[] = [];
    payMethod.options.forEach(x => {
      if (x !== payMethod.name) {
        payoptions.push(x);
      }
    });
    payMethod.disabled = true;
    this.orderService.order.PaymentMethods.push({ name: payoptions[0], amount: -1 * this.balance, options: payoptions, disabled: false });
  }
  removePayment(payMethod: PaymentMethod): void {
    if (this.orderService.order.PaymentMethods.length > 1) {
      this.orderService.order.PaymentMethods.pop();
      this.orderService.order.PaymentMethods[this.orderService.order.PaymentMethods.length - 1].disabled = false;
    }

  }
  getTotalAmount(): number {
    console.log("getTotalAmount");
    let x: number = 0;
    this.orderService.order.PaymentMethods.every((payment, y, ee) => {
      x += payment.amount;
      console.log(!!(x >= this.orderService.order.TotalPayable && y < (ee.length - 1)))
      if (x >= this.orderService.order.TotalPayable && y < (ee.length - 1)) {
        this.minimumPaymentMethods = y + 1;
        console.log('amount=' + x + ' and y=' + y);
        return false;
      }
      else {
        return true;
      }
    });
    console.log('amount=' + x);
    return x;
  }
  checkOut(xx:HTMLElement) {

    if (!this.appService.appSettings) {
      this.appService.getSettings().subscribe(res=>{
        this.appService.appSettings=res;
        console.log(res);
        this.completeOrder();
      });
     } else {
      this.completeOrder();
     }

    console.log(xx);
    xx.hideFocus=true;
    $('#closeModal').click();
    this.orderService.checkout(this.appService.appSettings.apiUrl).subscribe(sold => {
      console.log(sold);
      this.order=new CustomerOrder();
      this.orderService.resetOrder();
    });
  }
  completeOrder():void{

  }
}
