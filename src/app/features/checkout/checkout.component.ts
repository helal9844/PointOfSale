import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  cart= [
    { id: 1, name: 'Coffee', price: 20, quantity: 2 },
    { id: 2, name: 'Tea', price: 15, quantity: 1 },
    { id: 3, name: 'Chips', price: 10, quantity: 3 },
  ];

  taxRate = 0.05;

  getSubtotal(): number {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getTax(): number {
    return this.getSubtotal() * this.taxRate;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  processPayment() {
    alert('Payment Successful! Thank you for your purchase.');
  }

}
