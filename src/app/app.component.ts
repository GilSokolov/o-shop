import { AuthFireService } from './services/auth-fire.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( private userService: UserService,
               private auth: AuthFireService,
               router: Router ) {
    this.auth.user$.subscribe(user => {
// tslint:disable-next-line: curly
      if (!user) return;
      this.userService.save(user);

      const returnUrl = localStorage.getItem('returnUrl');
// tslint:disable-next-line: curly
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
  }
}
