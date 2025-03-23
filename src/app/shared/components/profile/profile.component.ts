import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(
   // private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    //const user = this.authService.getUser();
    // this.profileForm = this.fb.group({
    //   name: [user.name, Validators.required],
    //   email: [{ value: user.email, disabled: true }, Validators.required],
    //   password: ['']
    // });
  }
  onUpdateProfile() {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      //this.authService.updateUserProfile(updatedUser);
      alert('Profile updated successfully!');
    }
  }

}
