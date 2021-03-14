import { DataTrasferService } from '../../../../services/data-transfer.service';
import { ProductsLocalStorageModel, ProductsModel } from './../../models/products.model';
import { ProductsService } from './../../services/http/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: ProductsModel[] = [];
  productSub: Subscription;


  constructor(private productsService: ProductsService, private cartService: DataTrasferService) { }

  ngOnInit(): void {
    this.productSub = this.productsService.getProducts().subscribe((result: ProductsModel[]) => {
      this.products = result
    });

  }

  addItemToCart(product: ProductsModel) {
    let products = new Array<ProductsModel>();
    let productsObj = new ProductsLocalStorageModel();
    product.qty = 1;
    productsObj = this.cartService.getItemFromCart();
    products = productsObj.products;
    if (productsObj.products.every(item => item.id !== product.id)) {
      products.push(product);
    } else {
      ++products.find(item => item.id === product.id).qty;
    }
    this.cartService.addOrRemoveItemToCart(products)
  }

  ngOnDestroy() {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }

}
