import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-aguarde',
  templateUrl: './aguarde.component.html',
  styleUrls: ['./aguarde.component.css']
})
export class AguardeComponent {

  loading = false;

  constructor(private router: Router){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    })
  }
}
