import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';
import { of } from 'rxjs/index';
import { throwError } from 'rxjs/index';
import { Product, User } from "../models/data-model";
import{environment} from "../../environments/environment"

import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class ProductService {
  curentUser:User=new User();
  newProductUrl='/products/create'; 
  updateProductUrl='/products/update';
  deleteProductUrl='/products/delete';
  getProductUrl='/products';


  constructor(private http: HttpClient) { }

  createProduct (url:string,product: Product): Observable<Product> {
    return this.http.post<Product>(url+this.newProductUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('createProduct', product))
      );
  }
  updateProduct (url:string,product: Product): Observable<Product> {
    return this.http.post<Product>(url+this.updateProductUrl, product, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', product))
      );
  }
  
  deleteProduct (url:string,productID: String): Observable<String> {
    return this.http.post<String>(url+this.deleteProductUrl, {"id":productID}, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct', productID))
      );
  }

  getProducts (url:string): Observable<Product[]> {
    return this.http.get<Product[]>(url+this.getProductUrl, httpOptions)
      .pipe(
        catchError(this.handleError('getProducts', []))
      );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('erro handled');
      console.log(error);
      console.log('result');
      console.log(result);
      console.error(error); // log to console instead
      return of(error as T);
    };
  }
}