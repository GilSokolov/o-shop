import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthFireService } from './auth-fire.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {
  router: any;

  constructor(private auth: AuthFireService) { }

    canActivate(): Observable<boolean> {
      return this.auth.appUser$.pipe(map(appUser => appUser.admin));
    }
}
