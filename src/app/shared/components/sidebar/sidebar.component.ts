import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  isLoggedIn = false;
  @Output() sidebarToggled = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.sidebarToggled.emit(this.isCollapsed); // إرسال الحدث إلى المكون الرئيسي
    localStorage.setItem('sidebarCollapsed', JSON.stringify(this.isCollapsed));
  }

constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.authStatusObservable.subscribe(status => {
      this.isLoggedIn = status;
    });
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState);
      this.sidebarToggled.emit(this.isCollapsed);
    }
  }
  navItems= [
    { label: 'Dashboard', route: '/dashboard', active: true },
    { label: 'Sales', route: '/sales' },
    { label: 'Products', route: '/products' },
    { label: 'Customers', route: '/customers' },
    { label: 'Casher', route: '/casher' },
    { label: 'Reports', route: '/reports' },
  ];
}
