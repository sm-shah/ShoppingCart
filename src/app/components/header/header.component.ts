import { Component, OnInit } from '@angular/core';
import { ProductsLocalStorageModel, ProductsModel } from 'src/app/modules/products/models/products.model';
import { DataTrasferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  products: ProductsModel[] = [];

  constructor(private cartService: DataTrasferService) { }

  ngOnInit(): void {
  }
  getProductsCount() {
    let totalQty = 0
    let productsObj = new ProductsLocalStorageModel();
    this.products = new Array<ProductsModel>();
    productsObj = this.cartService.getItemFromCart();
    this.products = productsObj.products || [];
    this.products.forEach(product => {
      totalQty += product.qty;
    });
    return totalQty;
  }

}
