import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [
    { id: 1, name: 'Coffee', price: 20, image: 'assets/images/coffee.jpg' },
    { id: 2, name: 'Tea', price: 15, image: 'assets/images/tea.jpg' },
    { id: 3, name: 'Chips', price: 10, image: 'assets/images/chips.jpg' },
    { id: 4, name: 'Biscuits', price: 12, image: 'assets/images/biscuits.jpg' },
    { id: 5, name: 'Chocolate Bar', price: 25, image: 'assets/images/chocolate.jpg' },
    { id: 6, name: 'Soft Drink', price: 18, image: 'assets/images/softdrink.jpg' },
    { id: 7, name: 'Juice', price: 22, image: 'assets/images/juice.jpg' },
    { id: 8, name: 'Water Bottle', price: 5, image: 'assets/images/water.jpg' },
    { id: 9, name: 'Cake Slice', price: 30, image: 'assets/images/cake.jpg' },
    { id: 10, name: 'Ice Cream', price: 28, image: 'assets/images/icecream.jpg' }
   
  ];

  addToCart(product: any) {
    console.log(`Added to cart: ${product.name}`);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
