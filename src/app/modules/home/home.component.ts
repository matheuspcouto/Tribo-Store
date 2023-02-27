import { ToastrService } from 'ngx-toastr';
import { PedidoService } from './../../services/pedido.service';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  disabled: boolean = false;
  codigoPedido?: string;

  constructor(private router: Router, private carrinho: CarrinhoService, private pedidoService: PedidoService, private notificationService: ToastrService) {
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

  consultarPedido() {
    this.pedidoService.consultarPedido(this.codigoPedido).subscribe({
      next: (response) => {
        sessionStorage.setItem('pedido', response.dados);
        console.log(response);

        //this.router.navigate(['comprovante']);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
        this.loading = false;
      },
    });
  }
}
