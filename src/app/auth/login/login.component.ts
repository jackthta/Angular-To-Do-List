import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    const email: string = form.value.email;
    const password: string = form.value.password;

    this.authService.loginUser("email", email, password);
  }

  onLoginWithGoogle() {
    this.authService.loginUser("google");
  }

}
