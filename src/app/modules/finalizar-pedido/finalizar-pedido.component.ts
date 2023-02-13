import { StatusPedido } from './../../shared/enums/status-pedido.enums';
import { PedidoService } from './../../services/pedido.service';
import { ErroPedido, getPedidoValidationErrors } from './pedido.validator';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';
import { ToastrService } from 'ngx-toastr';
import { PagamentoService } from 'src/app/services/pagamento-service.service';
import { formatarCpf } from 'src/app/shared/Utils/documento-formatador';
import {
  formatarProdutoCarrinho,
  formatarProdutosPedido,
  formatarValorTotalProduto,
} from 'src/app/shared/Utils/produto-formatador';
import { HttpErrorResponse } from '@angular/common/http';

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
  documentos: string[] = ['CPF', 'CNPJ'];
  docSelecionado: any;
  email: any;
  numeroDocumento: any;

  constructor(
    private carrinho: CarrinhoService,
    private pedidoService: PedidoService,
    private pagamentoService: PagamentoService,
    private notificationService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
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

  concluirPedido() {
    this.errorsValidators = getPedidoValidationErrors(this.pedido);

    if (this.errorsValidators.length == 0) {
      try {
        this.loading = true;
        this.disabled = true;

        this.pedido.dataPedido = new Date().toLocaleDateString('pt-br');
        this.pedido.valorTotal = this.totalCarrinho();
        this.pedido.produtos = formatarProdutosPedido(
          this.produtos,
          this.pedido
        );
        this.pedido.qtdItens = this.produtos.length;
        this.pedido.status = StatusPedido.A_PAGAR;
        this.pedido.codigoPedido = this.gerarCodigoPedido(this.pedido);
        this.pedido.documento = formatarCpf(this.pedido.documento);

        // TESTES LOCAIS
        /* sessionStorage.setItem('pedido', JSON.stringify(this.pedido));
        sessionStorage.setItem('produtos', JSON.stringify(this.produtos));
        this.notificationService.success(
          'Pedido feito com sucesso !',
          'Sucesso'
        );
        console.log(this.pedido);
        this.router.navigate(['comprovante']);
        return; */

        this.pedidoService.criarPedido(this.pedido).subscribe({
          next: () => {
            sessionStorage.setItem('pedido', JSON.stringify(this.pedido));
            sessionStorage.setItem('produtos', JSON.stringify(this.produtos));
            this.notificationService.success(
              'Pedido feito com sucesso !',
              'Sucesso'
            );
            this.router.navigate(['comprovante']);
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.error(error.message, 'Erro');
          },
        });
      } catch (error: any) {
        this.notificationService.error(error, 'Erro');
      } finally {
        this.loading = false;
        this.disabled = false;
      }
    }
  }

  gerarCodigoPedido(pedido: Pedido) {
    let code = 'PED';
    code +=
      pedido.dataPedido?.replaceAll('/', '') + new Date().getTime().toString();
    return code;
  }

  formatarProdutoCarrinho(produto: Produto) {
    return formatarProdutoCarrinho(produto);
  }

  valorTotalProduto(produto: Produto) {
    return formatarValorTotalProduto(produto, this.pedido);
  }

  totalCarrinho() {
    let total =
      this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO
        ? this.carrinho.totalTaxa()
        : this.carrinho.total();

    return parseFloat(total.toFixed(2));
  }

  totalCarrinhoFormatado() {
    let total =
      this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO
        ? this.carrinho.totalTaxa()
        : this.carrinho.total();

    return total.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
