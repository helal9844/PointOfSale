import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ServerErrorComponent } from './components/errors/server-error/server-error.component';
import { TestErrorsComponent } from './components/errors/test-errors/test-errors.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent, SidebarComponent, LoaderComponent, LoginComponent, RegisterComponent, ProfileComponent, NotFoundComponent, ServerErrorComponent, TestErrorsComponent],
  imports: [
    CommonModule,RouterModule,FormsModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    LoaderComponent

  ]
})
export class SharedModule { }
