import { Component, OnInit } from '@angular/core';

import { Product } from './../../../core/models/product.model';
import { ProductsService } from './../../../core/services/products/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  clickProduct(id: number) {
    console.log('product');
    console.log(id);
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      });
  }

  createProduct() {
    const newProduct: Product = {
      id:'223',
      title: 'Test desde angular',
      image: 'https://s1.thcdn.com/productimg/1600/1600/11836648-1654634421137169.jpeg',
      price: 100,
      description: 'Katara Rules'
    }
    this.productsService.createProduct(newProduct)
      .subscribe(product => {
        console.log(product)
      })
  }

  updateProduct(){
    const newProduct:Partial<Product>= {
      id:'223',
      title: 'Holiws',
      price: 99,
      description: 'Kataraa'
    }
    this.productsService.updateProduct(newProduct.id, newProduct)
      .subscribe(product => {
        console.log(product)
      })
  }

}
