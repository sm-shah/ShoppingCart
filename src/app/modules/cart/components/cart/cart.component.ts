import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductsLocalStorageModel, ProductsModel } from 'src/app/modules/products/models/products.model';
import { DataTrasferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItemSub: Subscription;
  products: ProductsModel[] = [];

  constructor(private cartService: DataTrasferService) { }

  ngOnInit(): void {
    this.getItemsFromCart();
  }

  getItemsFromCart() {
    let productsObj = new ProductsLocalStorageModel();

    productsObj = this.cartService.getItemFromCart();
    this.products = productsObj.products || [];

  }

  removeItemToCart(product: ProductsModel) {
    let productsObj = new ProductsLocalStorageModel();

    productsObj = this.cartService.getItemFromCart();
    this.products = productsObj.products || [];

    if (productsObj.products.some(item => item.id === product.id)) {
      this.products.forEach((item, index) => {
        if (item.id === product.id) {
          this.products.splice(index, 1);
        }
      });
      this.cartService.addOrRemoveItemToCart(this.products)
    }

  }
  getQuentity(product: ProductsModel) {
    return this.products.filter(item => item.id === product.id).length;
  }

  ngOnDestroy() {
    if (this.cartItemSub) {
      this.cartItemSub.unsubscribe();
    }
  }

}
