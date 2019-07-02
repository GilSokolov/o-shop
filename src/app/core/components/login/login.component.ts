import { Component } from '@angular/core';
import { AuthFireService } from 'shared/services/auth-fire.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(public auth: AuthFireService) { }

  login() {
    this.auth.login();
  }
}
