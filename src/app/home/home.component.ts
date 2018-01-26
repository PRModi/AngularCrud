import { DataService } from './../services/data.service';
import { Product } from './../model/productModel';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public productList: Product[] = [];
  public productForm: FormGroup;
  public editIndex: number;

  constructor(private dataService: DataService,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.productList = this.dataService.getProducts();
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productPrice: ['', Validators.required],
      isEdit: [false]
    });

  }

  deleteProduct(i: number) {
    this.dataService.deleteProduct(i);
    this.productList = this.dataService.getProducts();
  }
  addProduct() {
    this.productForm.get('productName').setValue('');
    this.productForm.get('productPrice').setValue('');
    this.productForm.get('isEdit').setValue(false);
  }

  editProduct(i: number) {
    let productToUpdate = new Product(this.productList[i].name, this.productList[i].price);
    this.productForm.get('productName').setValue(productToUpdate.name);
    this.productForm.get('productPrice').setValue(productToUpdate.price);
    this.productForm.get('isEdit').setValue(true);
    this.editIndex = i;
  }

  submit() {
    const name = this.productForm.value.productName;
    const price = this.productForm.value.productPrice;
    if (this.productForm.value.isEdit) {
      this.dataService.editProduct(new Product(name, price), this.editIndex);
    }
    else {
      this.dataService.addProduct(new Product(name, price));
    }
    this.productList = this.dataService.getProducts();

  }

}
