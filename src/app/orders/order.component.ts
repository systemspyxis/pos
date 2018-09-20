import { Component, OnInit } from '@angular/core';
import { formatDate } from "@angular/common";
import { Product, CustomerOrder, OrderItem, PaymentMethod } from '../models/data-model';
import { ProductService } from "../services/product.service";
import { OrderService } from "../services/order.service";
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: Product[] = new Array<Product>();
  order: CustomerOrder = new CustomerOrder();
  searchText: string;
  constructor(private producService: ProductService, private orderService: OrderService, private appservice: AppService) { }

  ngOnInit() {
    if (!this.appservice.appSettings) {
      this.appservice.getSettings().subscribe(res => {
        this.appservice.appSettings = res;
        console.log(res);
        this.getProducts();
      });
    } else {
      this.getProducts();
    }
    window.dispatchEvent(new Event('resize'));

  }

  getProducts(): void {
    this.producService.getProducts(this.appservice.appSettings.apiUrl).subscribe(
      products => {
        this.products = products;
        console.log(products)
      });
  }
  buyProduct(prod: Product): void {
    if (!this.order.Items) {
      this.order = {
        Items: [
          {
            Product: prod.ProductDescription, Price: prod.SellPrice, Quantity: 1, Subtotal: prod.SellPrice,
            ProductID: prod.ProductID, ProductCount: prod.ProductCount, BuyPrice: prod.BuyPrice
          }
        ],
        TotalItems: 1,
        Discount: 0,
        TotalPayable: prod.SellPrice,
        PaymentMethods: [
          { name: "Cash", amount: 0, options: ["Cash", "Credit", "MPesa", "Other"], disabled: false }
        ],
        PaymetNote: " ",
        CustomerId: "0",
        OrderStatus: "OPEN",
        PaidStatus: "PENDING",
        TransactionRef: "",
        ServedBy: "Admin",
        OpenTime: new Date(),
        CloseTime: new Date(),
        OrderID: formatDate(new Date(), 'yyyymmddHHMMssSSS', 'en-GB'),
        Balance: 0
      }

    } else {
      var x = this.order.Items.findIndex(function (it: OrderItem) {
        return it.Product === prod.ProductDescription;
      });
      if (x === -1) {
        this.order.Items.push({
          Product: prod.ProductDescription, Price: prod.SellPrice, Quantity: 1, Subtotal: prod.SellPrice,
          ProductID: prod.ProductID, ProductCount: prod.ProductCount, BuyPrice: prod.BuyPrice
        })
        this.order.TotalItems++;
        this.order.TotalPayable += prod.SellPrice;
      } else {
        this.order.Items[x].Subtotal += prod.SellPrice;
        this.order.Items[x].Quantity++;
        this.order.TotalItems++;
        this.order.TotalPayable += prod.SellPrice;
      }

    }
    this.updateOrderService();
    console.log(formatDate(this.order.OpenTime, 'yyyymmddHHMMssSSS', 'en-GB'));
  }
  removeProduct(prod: OrderItem): void {
    var x = this.order.Items.findIndex(function (it: OrderItem) {
      return it.Product === prod.Product;
    });
    var removedItem = this.order.Items.splice(x, 1)
    this.order.TotalItems -= removedItem[0].Quantity;
    this.order.TotalPayable -= removedItem[0].Subtotal;
    this.orderService.order = this.order;
  }
  updateOrderService(): void {
    this.orderService.order = JSON.parse(JSON.stringify(this.order));
    this.orderService.Mainorder = this.order;
    console.log('updateOrderService');
    console.log(this.order);

    this.orderService.order.PaymentMethods[0].amount = this.orderService.order.TotalPayable;
    //this.balance = this.order.PaymentMethods[0].amount - this.order.TotalPayable

  }

}
