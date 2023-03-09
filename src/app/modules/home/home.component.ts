import { ToastrService } from 'ngx-toastr';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  disabled: boolean = false;
  codigoPedido?: string;
  textoBoxCarrinho?: string;

  constructor(private router: Router, private carrinho: CarrinhoService, private notificationService: ToastrService) {
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
    // TODO: Ver outra fonte para o site
    // TODO: Criar Perfis de Responsividade (table, celular e pc)
    let qtdCarrinhoItens = this.carrinho.getItens().length;
    this.textoBoxCarrinho = qtdCarrinhoItens.toString();
    this.textoBoxCarrinho += qtdCarrinhoItens > 1 || qtdCarrinhoItens == 0 ? ' itens' : ' item';
    this.disabled = qtdCarrinhoItens > 0;
  }

  consultarPedido() {
    if (this.codigoPedido) {
      sessionStorage.setItem('codigoPedido', this.codigoPedido);
      sessionStorage.setItem('paginaOrigem', 'home');
      this.router.navigate(['comprovante']);
    } else {
      this.notificationService.error('É necessário informar o código do pedido', 'Erro');
    }
  }
}
