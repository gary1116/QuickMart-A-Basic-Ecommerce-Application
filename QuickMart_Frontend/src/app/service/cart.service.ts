import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs/internal/Subject';
import { TypeModifier } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();


  constructor() { }

  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart

    let alreadyExistInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {

      // find the item in the cart based on item id
      for (let tempCartItem of this.cartItems) {

        if (tempCartItem.id === theCartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }

      }

      // check if we found it
      alreadyExistInCart = (existingCartItem != undefined);

    }

    if (alreadyExistInCart) {
      existingCartItem.quantity++;
    } else {
      // just add the item to the array
      this.cartItems.push(theCartItem);

    }
    // compute the cart total price and total quantity
    this.computeCartTotals();

  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.uniPrice;
      totalQuantityValue += currentCartItem.quantity;


    }
    // publish the new values ... all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //log cart data just for debugging purposes
    this.logCartData(totalPriceValue, totalQuantityValue);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('contents of the cart');
    for (let tempcart of this.cartItems) {
      const subtotal = tempcart.quantity * tempcart.uniPrice;
      console.log(`name: ${tempcart.name}, quantity=${tempcart.quantity}, unitprice = ${tempcart.uniPrice}`);
    }
    console.log(`total price= ${totalPriceValue.toFixed(2)}`);
  }
}
