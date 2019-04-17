import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  passwordsMatch: boolean = true;

  constructor(private authService: AuthService) {}

  onRegister(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;
    const password2: string = form.value.confirm_password;
    
    this.passwordsMatch = password.localeCompare(password2) === 0;

    if (this.passwordsMatch) {
      this.authService.registerUser(email, password);
    } else {
      return;
    }
  }
}
