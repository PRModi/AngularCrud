import { OnInit } from '@angular/core';
import { Product } from './../model/productModel';


export class DataService implements OnInit {
    public productList: Product[] = [];
    constructor() {

        // providing dummy data to the ProductList array
        let p1 = new Product("productOne", "22");
        let p2 = new Product("productTwo", "25");
        let p3 = new Product("productThree", "28");

        this.productList.push(p1);
        this.productList.push(p2);
        this.productList.push(p3);
    }
    ngOnInit() {


    }



    getProducts() {
        return this.productList.slice();
    }
    addProduct(product: Product) {
        this.productList.push(product);
    }
    deleteProduct(index: number) {
        this.productList.splice(index, 1);
    }
    editProduct(product: Product, index: number) {
        this.productList[index].name = product.name;
        this.productList[index].price = product.price;
    }



}