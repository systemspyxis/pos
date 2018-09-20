import { Component, OnInit } from '@angular/core';
import { Product } from "../models/data-model";
import { ProductService } from "../services/product.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {
  productID: String;
  searchText:string;
  selectedProduct: Product;
  products: Product[] = new Array<Product>();
  constructor(private producService: ProductService, private _flashMessagesService: FlashMessagesService,private appservice:AppService,) { }

  ngOnInit() {
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res=>{
        this.appservice.appSettings=res;
        console.log(res);
        this.getProducts();
      });
     } else {
      this.getProducts();
     }
     window.dispatchEvent(new Event('resize'));
  }

  onSelect(prod: Product): void {
    this.selectedProduct = JSON.parse(JSON.stringify(prod));
  }
  getProducts(): void {
    this.producService.getProducts(this.appservice.appSettings.apiUrl).subscribe(
      products => {
        this.products = products;
        console.log(products)
      });
  }
  onSubmit(form: NgForm): void {

    this.productID = this.selectedProduct.ProductID;
   
    console.log('About to update');
    console.log(form.value);
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.deleteProduct(form);
      });
    } else {
      this.deleteProduct(form);
    }

  }
  deleteProduct(form: NgForm):void{
    this.producService.deleteProduct(this.appservice.appSettings.apiUrl,this.productID).subscribe(prods => {
      console.log(prods);
      console.log(typeof prods);
      if ((typeof prods) === 'object' as String) {
        this._flashMessagesService.show(this.selectedProduct.ProductDescription.toString() + ' Deleted Successfully', { cssClass: 'alert-success', timeout: 5000 });
        form.reset();
        this.getProducts();
      } else {
        this._flashMessagesService.show('An Error Occured' + prods, { cssClass: 'alert-danger', timeout: 5000 });
      }

    }
    );
  }

}
