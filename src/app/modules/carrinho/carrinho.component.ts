import { formatarValorTotalProduto, formatarProdutoCarrinho } from 'src/app/shared/Utils/produto-formatador';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  produtos: Produto[] = [];
  produto = new Produto();
  loading = false;
  erroForm: any;
  removido: boolean = false;

  constructor(
    private carrinho: CarrinhoService,
    private notificationService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() { // TODO: Melhorar fluxo de quantidade de produtos
    this.loading = true;
    try {
      this.produtos = this.carrinho.getItens();
      if (this.produtos.length == 0) {
        this.router.navigate(['home']);
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  finalizarPedido() {
    this.router.navigate(['/finalizar-pedido']);
  }

  removerCarrinho(produto: Produto) {
    this.loading = true;
    try {
      this.carrinho.remover(produto);
      this.produtos = this.carrinho.getItens();
      if (this.produtos.length == 0) {
        this.router.navigate(['home']);
      }
      this.totalCarrinhoFormatado();
      this.notificationService.success('Produto removido do carrinho !', 'Sucesso');
    } catch (error: any) {
      this.notificationService.error(error.message, 'Erro');
    }
    this.loading = false;
  }

  formatarProdutoCarrinho(produto: Produto) {
    return formatarProdutoCarrinho(produto)
  }

  totalCarrinhoFormatado() {
    return this.carrinho.total().toLocaleString('pt-br', { style: 'currency', currency: 'BRL'});;
  }

  valorTotalProduto(produto: Produto) {
    return formatarValorTotalProduto(produto, undefined)
  }
}
