import { StatusPedido } from './../../shared/enums/status-pedido.enums';
import { PedidoService } from './../../services/pedido.service';
import { ErroPedido, getPedidoValidationErrors } from './pedido.validator';
import { Component, OnInit } from '@angular/core';
import { PedidoRequest } from 'src/app/models/request/pedido-request';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';
import { ToastrService } from 'ngx-toastr';
import { formatarCpf } from 'src/app/shared/Utils/documento-formatador';
import {
  formatarProdutoCarrinho,
  formatarProdutosPedido,
  formatarValorTotalProduto,
} from 'src/app/shared/Utils/produto-formatador';
import { HttpErrorResponse } from '@angular/common/http';
import { formatarTelefone } from 'src/app/shared/Utils/telefone.formatador';
import { ProdutoRequest } from 'src/app/models/request/produto-request';

@Component({
  selector: 'app-finalizar-pedido',
  templateUrl: './finalizar-pedido.component.html',
  styleUrls: ['./finalizar-pedido.component.css'],
})
export class FinalizarPedidoComponent implements OnInit {
  produtos: ProdutoRequest[] = [];
  pedido = new PedidoRequest();
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
  tipoDocumento: string = 'CPF';

  constructor(
    private carrinho: CarrinhoService,
    private pedidoService: PedidoService,
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
    this.errorsValidators = getPedidoValidationErrors(this.pedido, this.tipoDocumento);

    if (this.errorsValidators.length == 0) {
      try {
        this.loading = true;

        this.pedido.dataPedido = new Date().toLocaleString('pt-br');
        this.pedido.valorTotal = this.totalCarrinho();
        this.pedido.produtos = formatarProdutosPedido(this.produtos, this.pedido);
        this.pedido.qtdItens = this.produtos.length;
        this.pedido.status = StatusPedido.A_PAGAR;
        this.pedido.codigoPedido = this.gerarCodigoPedido(this.pedido);
        this.pedido.documento = formatarCpf(this.pedido.documento);
        this.pedido.telefone = formatarTelefone(this.pedido.telefone);

        this.pedidoService.criarPedido(this.pedido).subscribe({
          next: (response) => {

            if (response.error) {
              sessionStorage.setItem('erro', JSON.stringify(response.error));
              this.loading = false;
              this.router.navigate(['erro']);
              return;
            }

            if (this.pedido.codigoPedido) { sessionStorage.setItem('pedido', JSON.stringify(this.pedido)); }
            sessionStorage.setItem('paginaOrigem', 'finalizar-pedido');
            this.loading = false;
            this.notificationService.success(response.message, 'Sucesso');
            this.router.navigate(['comprovante']);
          },
          error: (error: HttpErrorResponse) => {
            this.notificationService.error(error.message, 'Erro');
            this.loading = false;
          },
        });
      } catch (error: any) {
        this.notificationService.error(error, 'Erro');
        this.loading = false;
      }
    }
  }

  gerarCodigoPedido(pedido: PedidoRequest) {
    let code = 'PED';
    code += pedido.dataPedido?.substring(0,10).replaceAll('/', '') + new Date().getTime().toString();
    return code;
  }

  formatarProdutoCarrinho(produto: ProdutoRequest) {
    return formatarProdutoCarrinho(produto);
  }

  valorTotalProduto(produto: ProdutoRequest) {
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
