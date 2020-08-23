import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from './../../../core/services/products/products.service';
import { Router } from '@angular/router';
import { MyValidators } from './../../../utils/validators';
import { AngularFireStorage } from '@angular/fire/storage'
import { finalize } from 'rxjs/operators'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  form: FormGroup;
  image$: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private angularFireStorage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [MyValidators.isPriceValid]],
      image: [''],
      description: ['', [Validators.required]],
    });
  }

  //Un formulario por defecto en html al enviar intentara recargar la pagina, al hacer preventDefault del event quitamos ese comportamiento
  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.createProduct(product)
        .subscribe((newProduct) => {
          console.log(newProduct);
          this.router.navigate(['./admin/products']);
        });
    }
    console.log(this.form.value)
  }

  get priceField() {
    return this.form.get('price');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = 'image.png'; //esto lo puedes cambiar al nombre de conveniencia para la imagen en firebase storage
    const fileRef = this.angularFireStorage.ref(name);
    const task = this.angularFireStorage.upload(name, file);

    task.snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            console.log(url)
            this.form.get('image').setValue(url)
          })
        })
      )
      .subscribe();
  }

}
