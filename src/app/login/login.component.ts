import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) {}
  // emailPattern: string = '/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,6}$/';

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  messageError: boolean = false;
  getEmailError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signIn() {
    if (this.email.valid && this.password.valid) {
      this.messageError = false;

      this.auth
        .getUser(this.email.value as string, this.password.value as string)
        .then((data) => {
          let role = data.roles[0].name;
          switch (role) {
            case 'SuperAdmin':
              this.router.navigateByUrl('superAdmin');
              break;

            default:
              break;
          }
        });
    } else this.messageError = true;
  }
}
