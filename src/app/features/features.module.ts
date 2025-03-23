import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { CustomersComponent } from './customers/customers.component';
import { ReportsComponent } from './reports/reports.component';
import { CasherComponent } from './casher/casher.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, ProductsComponent, CartComponent, CheckoutComponent, OrdersComponent, DashboardComponent, SalesComponent, CustomersComponent, ReportsComponent, CasherComponent],
  imports: [
    CommonModule,RouterModule,FormsModule
  ],
  exports:[HomeComponent]
})
export class FeaturesModule { }
