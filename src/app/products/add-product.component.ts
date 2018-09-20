import { Component, OnInit } from '@angular/core';
import { Product } from "../models/data-model";
import { ProductService } from "../services/product.service";
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product;
  constructor(private producService: ProductService, private _flashMessagesService: FlashMessagesService,private appservice:AppService) { }

  ngOnInit() {

  }
  onSubmit(form: NgForm): void {
    this.product = new Product();
    this.product.ProductID = form.value['ProductID1'];
    this.product.ProductSize = form.value['ProductSize1'];
    this.product.UnitType = form.value['UnitType1'];
    this.product.BuyPrice = form.value['BuyPrice1'];
    this.product.SellPrice = form.value['SellPrice1'];
    this.product.ProductDescription = form.value['ProductDescription1'];

    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.createProduct(form);
      });
    } else {
      this.createProduct(form);
    }

  }
  createProduct(form: NgForm):void{
    this.producService.createProduct(this.appservice.appSettings.apiUrl,this.product).subscribe(prods => {
      console.log(prods);
      console.log(typeof prods);
      if ((typeof prods) === 'object' as String) {
        this._flashMessagesService.show(prods.ProductDescription.toString() + ' Added Successfully', { cssClass: 'alert-success', timeout: 5000 });
        form.reset();
      } else {
        this._flashMessagesService.show('An Error Occured' + prods, { cssClass: 'alert-danger', timeout: 5000 });
      }

    }
    );
  }
}

