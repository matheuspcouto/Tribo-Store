import { ErroPedido, getPedidoValidationErrors } from './pedido.validator';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { TipoProduto } from 'src/app/shared/enums/tipo-produto-enum';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css'],
})
export class FinalizarPedidoComponent implements OnInit {
  produtos: Produto[] = [];
  pedido = new Pedido();
  formasPagamento: string[] = [
    FormasPagamento.PIX,
    FormasPagamento.CARTAO_CREDITO,
    FormasPagamento.CARTAO_DEBITO,
    FormasPagamento.DINHEIRO,
  ];
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
    this.errorsValidators = getPedidoValidationErrors(this.pedido);

    if (this.errorsValidators.length == 0) {
      this.pedido.dataPedido = new Date().toLocaleDateString('pt-br');

      this.pedido.valorTotal =
        this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO
          ? parseFloat(this.carrinho.totalTaxa().toFixed(2))
          : parseFloat(this.carrinho.total().toFixed(2));

      this.pedido.codigoProdutos = this.gerarCodigoProduto(this.produtos);

      this.pedido.qtdItens = this.produtos.length;

      this.pedido.codigoPedido = this.gerarCodigoPedido(this.pedido);

      alert(JSON.stringify(this.pedido));
    }
  }

  gerarCodigoProduto(produtos: Produto[]): string[] {
    let codes: string[] = [];

    produtos.map( p => {

      let code = p.codigoProduto;

      if (p.tamanhoSelecionado){ code += p.tamanhoSelecionado + '-'; }
      if (p.corSelecionada){ code += p.corSelecionada + '-'; }
      if (p.modeloCelular){ code += p.modeloCelular.toUpperCase().replaceAll(' ', '') + '-'; }
      if (p.qtdItem){ code += p.qtdItem.toString() + '-'; }

      if (this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO) {
        code += p.valorTaxa.toString();
      }
      else {
        code += p.valor.toString();
      }

      codes.push(code);
    })

    return codes;

  }

  gerarCodigoPedido(pedido: Pedido) {
    let code = 'PED';
    code += pedido.dataPedido?.replaceAll('/','') + new Date().getTime().toString();
    return code;
  }

  valorTotalProduto(produto: Produto) {
    let total;

    if (this.pedido.formaPagamento == FormasPagamento.CARTAO_CREDITO){
      total = produto.qtdItem ? produto.valorTaxa * produto.qtdItem : 0;
    }
    else {
      total = produto.qtdItem ? produto.valor * produto.qtdItem : 0;
    }

    return total;
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
    return this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO
    ? this.carrinho.totalTaxa()
    : this.carrinho.total();
  }
}
