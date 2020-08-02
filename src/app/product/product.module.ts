import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
    declarations: [
        ProductComponent,
        ProductDetailComponent,
        ProductsComponent
    ],
    imports: [
        ProductRoutingModule,
        CommonModule,
        SharedModule
    ],
    providers: [],
    bootstrap: []
})
export class ProductModule {

}