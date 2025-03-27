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
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [HomeComponent, ProductsComponent, CartComponent, CheckoutComponent, OrdersComponent, DashboardComponent, SalesComponent, CustomersComponent, ReportsComponent, CasherComponent, ProductDialogComponent],
  imports: [
    MatSortModule,ReactiveFormsModule,CommonModule,RouterModule,FormsModule,MatButtonModule,MatDialogModule,MatPaginatorModule,MatFormFieldModule,MatTableModule,MatInputModule,
  ],
  exports:[HomeComponent]
})
export class FeaturesModule { }
