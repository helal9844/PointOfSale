import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Welcome to the POS System!';
  description = 'Easily manage sales, track inventory, and process payments with our powerful Point of Sale system.';

  constructor() { }

  ngOnInit(): void {
  }

}
