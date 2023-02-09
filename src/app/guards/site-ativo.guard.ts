import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SiteAtivoGuard implements CanActivate {

  constructor(private router: Router){};

  siteAtivo = true;

  canActivate() {

    if (this.siteAtivo){
       return true;
    }
    else {
      this.router.navigate(['aguarde']);
      return false;
    }
  }

}
