import { Component, OnInit } from '@angular/core';
import { SwalService } from 'src/app/core/services/swal.service';
import { CategoryService } from 'src/app/core/services/SalesOrders/category.service';
import { ProductService } from 'src/app/core/services/SalesOrders/product.service';
import { OrderService } from 'src/app/core/services/SalesOrders/order.service';
import { OrderHeader } from 'src/app/core/models/SalesOrders/OrderHeader';
import { Cashier } from 'src/app/core/models/Cashier';

@Component({
  selector: 'app-casher',
  templateUrl: './casher.component.html',
  styleUrls: ['./casher.component.css']
})
export class CasherComponent implements OnInit {

  loggedInUser: Cashier; 
  sessionActive: boolean = false;
  sessionTotal: number = 0;
  categories: any[] = [];
  products: any[] = [];
  order: any[] = [];
  selectedCategory: number | null = null;
  subtotal = 0;
  discount = 0; 
  taxRate = 0.14;
  tax = 0;
  totalAmount = 0;
  searchTerm = '';
  constructor(private productService: ProductService,
    private categoryService: CategoryService,private orderService:OrderService,private swalService: SwalService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => 
        {
          this.categories = data;
          console.log(data);
        },
      (error) => console.error("Error fetching categories:", error)
    );
  }
  selectCategory(categoryId: number) {
    this.selectedCategory = categoryId;
    this.productService.getAllProducts().subscribe(
      (data) =>{
        this.products = data.filter(e=>e.categoryId === this.selectedCategory),
        console.log("Products loaded for category:", categoryId, this.products);
      },
      (error) => console.error("Error fetching products:", error)
    );
  }
  startSession() {
    const user =JSON.parse(localStorage.getItem('user'));
    this.sessionActive = true;
    this.sessionTotal = 0;
    this.order = [];
    this.totalAmount = 0;
    this.loggedInUser = {

      cashierUser:user.token.userName , 

      startTime: new Date(),
      endTime: null,
      isActive: true,
      sessionTotal: 0
    };
    localStorage.setItem('sessionActive', JSON.stringify(this.sessionActive));
    localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
    this.swalService.success('Session has started successfully!');
  }
  filteredProducts() {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  closeSession() {
    this.swalService.confirm('Do you really want to close the session?').then((result) => {
      if (result.isConfirmed) {
        this.sessionActive = false;
        localStorage.removeItem('sessionActive');
        localStorage.removeItem('loggedInUser');
        this.swalService.success('Session closed successfully!');
      }
    });
  }
  

  addToOrder(product: any) {
    if (!this.sessionActive) {
      alert("Start a session first!");
      return;
    }

    let existingItem = this.order.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.order.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
      console.log(this.order);
    }

    this.updateTotal();
  }

  removeFromOrder(product: any) {
    this.order = this.order.filter(item => item.productId !== product.productId);
    this.updateTotal();
  }

  updateTotal() {
    this.subtotal = this.order.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.tax = this.subtotal * this.taxRate;
    this.totalAmount = this.subtotal + this.tax - this.discount;
  }

  placeOrder() {
    if (!this.sessionActive || this.order.length === 0) {
      this.swalService.error("Start a session and add items before placing an order!");
      return;
    }

    let newOrder: OrderHeader = {

      sessionId: 2,  
      orderDate: new Date(),  
      subtotal: this.subtotal,
      discount: this.discount,
      tax: this.tax,
      total: this.totalAmount,
      orderLines: this.order.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        Price: item.price,
        totalPrice: item.price * item.quantity
      }))
    };
    console.log("Order Payload:", JSON.stringify(newOrder));

    this.orderService.createOrder(newOrder).subscribe(
      (response) => {
        this.swalService.success("Order placed successfully!");
        this.sessionTotal += this.totalAmount;
        this.order = [];
       this.updateTotal();
      },
      (error) => {
        console.error("Error placing order:", error);
        this.swalService.error("Failed to place order!");
      }
    );
  }
  
}
