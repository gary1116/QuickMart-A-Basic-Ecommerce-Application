import { Product } from "./product";

export class CartItem {


    id:number;
    name:String;
    imageUrl:String;
    uniPrice:number;
    quantity:number;

constructor(product: Product){

    this.id=product.id;
    this.name=product.name;
    this.imageUrl=product.imageUrl;
    this.uniPrice=product.unitPrice;
    this.quantity=  1;
}

}

