import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from './../../models/product.model';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(environment.API_URL+'/products');
  }

  getProduct(id: string) {
    return this.http.get<Product>(environment.API_URL+'/products/' + id);
  }

  createProduct(product: Product){
    return this.http.post(environment.API_URL+'/products', product);
  }
}
