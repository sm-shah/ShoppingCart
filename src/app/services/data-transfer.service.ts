import { ProductsLocalStorageModel } from './../modules/products/models/products.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsModel } from '../modules/products/models/products.model';

@Injectable({
  providedIn: 'root'
})
export class DataTrasferService {


  constructor() { }

  addOrRemoveItemToCart(products: ProductsModel[]) {
    let productsObj: ProductsLocalStorageModel = new ProductsLocalStorageModel();
    productsObj.products = products;
    localStorage.setItem('products', JSON.stringify(productsObj));
  }

  getItemFromCart() {
    let productsObj: ProductsLocalStorageModel = new ProductsLocalStorageModel();

    if (JSON.parse(localStorage.getItem('products'))) {
      productsObj = JSON.parse(localStorage.getItem('products'))
    }
    return productsObj;
  }
}
