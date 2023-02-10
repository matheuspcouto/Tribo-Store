import { TipoProduto } from './../../shared/enums/tipo-produto-enum';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { Pedido } from 'src/app/models/pedido';
import { Router } from '@angular/router';

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

  constructor(private carrinho: CarrinhoService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    try {
      this.produtos = this.carrinho.getItens();
    } catch (error: any) {
      this.erroForm = {
        tipoErro: 'form',
        mensagemErro: error,
      };
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
      this.totalCarrinho();
      this.removido = true;
    } catch (error: any) {
      this.erroForm = {
        tipoErro: 'form',
        mensagemErro: error,
      };
    }
    this.loading = false;
  }

  totalCarrinho() {
    return this.carrinho.total();
  }

  valorTotalProduto(produto: Produto) {
    return produto.qtdItem ? produto.valor * produto.qtdItem : 0;
  }

  formatarProdutoCarrinho(produto: Produto) {
    let aux = produto.nome + ' - ';

    aux += produto.tipo == TipoProduto.CAMISA ? produto.tamanhoSelecionado : '';
    aux +=
      produto.tipo == TipoProduto.MEIA
        ? produto.tamanhoSelecionado + '/' + produto.corSelecionada
        : '';
    aux += produto.tipo == TipoProduto.CAPINHA ? produto.modeloCelular : '';

    return aux.trim();
  }
}
