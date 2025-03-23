import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems= [
    { id: 1, name: 'Coffee', price: 20, quantity: 2, image: 'https://source.unsplash.com/100x100/?coffee' },
    { id: 2, name: 'Tea', price: 15, quantity: 1, image: 'https://source.unsplash.com/100x100/?tea' },
    { id: 3, name: 'Chips', price: 10, quantity: 3, image: 'https://source.unsplash.com/100x100/?chips' },
  ];
  constructor() { }

  ngOnInit(): void {
  }
  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  increaseQuantity(item) {
    item.quantity++;
  }
  decreaseQuantity(item) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
  }

}
