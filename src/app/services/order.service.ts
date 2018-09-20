import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/index';
import { formatDate } from "@angular/common";
import { Observable } from 'rxjs';
import { catchError, retry, tap} from 'rxjs/operators';
import{CustomerOrder } from '../models/data-model';
import{environment} from "../../environments/environment"

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  checkoutUrl='/order/create'; 
  order: CustomerOrder=new CustomerOrder();
  Mainorder: CustomerOrder=new CustomerOrder();
  constructor(private http: HttpClient) { }

  checkout (url:string): Observable<CustomerOrder> {
    return this.http.post<CustomerOrder>(url+this.checkoutUrl, this.order, httpOptions)
      .pipe(
        catchError(this.handleError('createProduct', this.order))
      );
  }
  resetOrder():void{
    this.Mainorder.Items=[];
    this.Mainorder.TotalItems=0;
    this.Mainorder.Discount=0;
    this.Mainorder.TotalPayable=0;
    this.Mainorder.PaymentMethods=[{name:"Cash",amount:0,options:["Cash","Credit","MPesa","Other"],disabled:false}]
    this.Mainorder.PaymetNote=" ";
    this.Mainorder.CustomerId="0";
    this.Mainorder.OrderStatus="OPEN";
    this.Mainorder.PaidStatus="PENDING";
    this.Mainorder.TransactionRef="";
    this.Mainorder.ServedBy="Admin";
    this.Mainorder.OpenTime=new Date();
    this.Mainorder.CloseTime=new Date();
    this.Mainorder.OrderID=formatDate(new Date(),'yyyymmddHHMMssSSS','en-GB');
    this.Mainorder.Balance=0;
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumptio
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
