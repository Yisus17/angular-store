import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../../core/services/products/products.service';
import { Product } from 'src/app/core/models/product.model';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  products: Product[] = [];
  displayedColumns: string[] = ['id', 'title', 'price', 'actions'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe(products => {
        this.products = products;
      })
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
      .subscribe(response => {
        if (response) {
          //borramos el producto de la lista para la que renderice la tabla
          const index = this.products.findIndex((product) => product.id === id);
          this.products.splice(index, 1);
          this.products = [...this.products];
        }
      })
  }

}
