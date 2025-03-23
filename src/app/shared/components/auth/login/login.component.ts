import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/AuthUser';
import { AuthService } from 'src/app/core/services/auth.service';
  
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  logedIn:boolean = false;
  errorMessage: string = '';
  cred = { userName: '', password: '' };
  branches: any[] = [];
  selectedBranch: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  
  submit() {
    this.authService.login(this.cred.userName, this.cred.password).subscribe({
      next: (user) => {
        if (!user) {
          console.error('Login successful but user is undefined');
          return;
        }
        console.log('Login successful:', user);
        this.logedIn = true;
        this.branches  = user.token?.branches?.map(branch => ({
          id: branch.branchId,
          name: branch.branchName
        })) || [];
        
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  processed(){
    this.authService.authStatus.next(true);
    this.authService.getSelectedBranch(this.selectedBranch);
    this.router.navigate(['/']);
  }
}