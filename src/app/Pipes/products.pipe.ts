import { Pipe, PipeTransform } from '@angular/core';
import { Product } from "../models/data-model";

@Pipe({
  name: 'products'
})
export class ProductsPipe implements PipeTransform {

  transform(products: Product[], field: string, value: string): Product[] {
    console.log(products);
    console.log(value==='');
    if (!products) return [];
    if (value==='' || !value) return products;
   return products.filter(it => it.ProductDescription.toLowerCase().indexOf(value.toLowerCase()) > -1);
  }

}
