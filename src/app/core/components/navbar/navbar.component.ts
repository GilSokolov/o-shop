import { ShopingCart } from 'shared/models/app-shoping-cart';
import { AppUser } from 'shared/models/app-user';
import { Component, OnInit } from '@angular/core';
import { AuthFireService } from 'shared/services/auth-fire.service';
import { ShopingCartService } from 'shared/services/shoping-cart.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit  {
  collapse = false;
  user: AppUser;
  cart$: Observable<ShopingCart>;

  constructor(
    private auth: AuthFireService,
    private cartService: ShopingCartService) {}

  async ngOnInit()  {
    this.auth.appUser$.subscribe( user => this.user = user );
    this.cart$ = await this.cartService.getItems();
  }

  toggelNavbar() {
    this.collapse = !this.collapse;
  }

  logout() {
   this.auth.logout();
  }

}
