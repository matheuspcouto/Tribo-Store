import { ErroPedido } from './pedido.validator';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { ErroDetalhesProduto } from '../produtos/detalhes-produto/produto.validator';
import { TipoProduto } from 'src/app/shared/enums/tipo-produto-enum';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css']
})
export class FinalizarPedidoComponent implements OnInit {

  produtos: Produto[] = [];
  pedido = new Pedido();
  formasPagamento: string[] = ['Pix', 'Cartão de Crédito', 'Dinheiro'];
  loading = false;
  disabled: boolean = false;
  errorsValidators: ErroPedido[] = [];
  erroForm: any;

  constructor(private carrinho: CarrinhoService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    try {
      this.produtos = this.carrinho.getItens();
      this.disabled = this.produtos.length == 0;
    } catch (error: any) {
      this.erroForm = {
        tipoErro: 'form',
        mensagemErro: error,
      };
    }
    this.loading = false;
  }

  concluirPedido() {
    console.table(this.pedido);
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

  totalCarrinho() {
    return this.carrinho.total();
  }

}
