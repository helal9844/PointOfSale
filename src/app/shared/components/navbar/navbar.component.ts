import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/AuthUser';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  user= null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.authStatusObservable.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      console.log(this.user.token);
    }
  }

  getUser() {
    
    return this.user;
  }

  logout() {
    this.authService.logout();
  }
}
