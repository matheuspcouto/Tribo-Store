import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AppInfo } from 'src/app/shared/enums/app-info-enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  titulo = AppInfo.TITLE;
  loading = false;
  disabled: boolean = false;

  constructor(private router: Router, private carrinho: CarrinhoService){
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      }
      if (event instanceof NavigationEnd || event instanceof NavigationError) {
        this.loading = false;
      }
    })
  }

  ngOnInit() {
    this.disabled = this.carrinho.getItens().length > 0;
  }
}
