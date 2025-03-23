import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'POSClient';
  isLoading = false;
  isLoggedIn=false;
  selectedBranch: string = '';
  selectedBranch$: Observable<string>;
  constructor(public authService:AuthService,private router:Router){
    this.selectedBranch$ = this.authService.selectedBranch$;
  }
  ngOnInit() {
    this.authService.authStatus.subscribe(status => {
      this.isLoggedIn = status;
      if (!status) {
        this.router.navigate(['/login']);
      }
    });
    this.authService.selectedBranch$.subscribe(status => {
      this.selectedBranch = status;
    });
  }
  showLoader() {
    this.isLoading = true;
    setTimeout(() => this.isLoading = false, 3000); 
  }
  isSidebarCollapsed = false;

  toggleContentWidth(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }
}
