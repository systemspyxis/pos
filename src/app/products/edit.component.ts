import { Component, OnInit } from '@angular/core';
import { Product } from "../models/data-model";
import { ProductService } from "../services/product.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: Product;
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
    this.product = new Product();
    this.product.ProductID = this.selectedProduct.ProductID;
    this.product.ProductSize = form.value['ProductSize1'];
    this.product.UnitType = form.value['UnitType1'];
    this.product.BuyPrice = form.value['BuyPrice1'];
    this.product.SellPrice = form.value['SellPrice1'];
    this.product.ProductDescription = form.value['ProductDescription1'];
    console.log('About to update');
    console.log(form.value);
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.updateProduct(form);
      });
    } else {
      this.updateProduct(form);
    }

  }
  updateProduct(form: NgForm):void{
    this.producService.updateProduct(this.appservice.appSettings.apiUrl,this.product).subscribe(prods => {
      console.log(prods);
      console.log(typeof prods);
      if ((typeof prods) === 'object' as String) {
        this._flashMessagesService.show(prods.ProductDescription.toString() + ' updated Successfully', { cssClass: 'alert-success', timeout: 5000 });
        form.reset();
        this.getProducts();
      } else {
        this._flashMessagesService.show('An Error Occured' + prods, { cssClass: 'alert-danger', timeout: 5000 });
      }

    }
    );
  }
}
