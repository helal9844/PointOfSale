import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { CartComponent } from './features/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { OrdersComponent } from './features/orders/orders.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ReportsComponent } from './features/reports/reports.component';
import { SalesComponent } from './features/sales/sales.component';
import { CustomersComponent } from './features/customers/customers.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { CasherComponent } from './features/casher/casher.component';
import { TestErrorsComponent } from './shared/components/errors/test-errors/test-errors.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './shared/components/errors/server-error/server-error.component';

import { AuthGuard } from './core/guards/auth.guard';
import { CategoriesComponent } from './features/categories/categories.component';
const routes: Routes = [
  { path: '', redirectTo: 'Home' ,pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent,canActivate: [AuthGuard]  },
  { path: 'categories', component: CategoriesComponent,canActivate: [AuthGuard]  },
  { path: 'cart', component: CartComponent,canActivate: [AuthGuard]  },
  { path: 'checkout', component: CheckoutComponent,canActivate: [AuthGuard]  },
  { path: 'orders', component: OrdersComponent,canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent,canActivate: [AuthGuard]  },
  { path: 'sales', component: SalesComponent,canActivate: [AuthGuard]  },
  { path: 'customers', component: CustomersComponent },
  { path: 'register', component: RegisterComponent,canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]  },
  { path: 'casher', component: CasherComponent,canActivate: [AuthGuard]  },
  { path: 'Home', component: HomeComponent,canActivate: [AuthGuard]  },

  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
