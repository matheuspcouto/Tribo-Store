import { StatusPedido } from './../../shared/enums/status-pedido.enums';
import { PedidoService } from './../../services/pedido.service';
import { ErroPedido, getPedidoValidationErrors } from './pedido.validator';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Produto } from 'src/app/models/produto';
import { TipoProduto } from 'src/app/shared/enums/tipo-produto-enum';
import { Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PagamentoService } from 'src/app/services/pagamento-service.service';

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
  documentos: any;
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
      this.getTipoDocumentos();
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  concluirPedido() {
    this.errorsValidators = getPedidoValidationErrors(this.pedido);

    if (this.errorsValidators.length == 0) {
      this.loading = true;

      try {
        this.pedido.dataPedido = new Date().toLocaleDateString('pt-br');

        this.pedido.valorTotal =
          this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO
            ? parseFloat(this.carrinho.totalTaxa().toFixed(2))
            : parseFloat(this.carrinho.total().toFixed(2));

        this.pedido.produtos = this.formatarProdutos(this.produtos);
        this.pedido.qtdItens = this.produtos.length;
        this.pedido.status = StatusPedido.A_PAGAR;
        this.pedido.codigoPedido = this.gerarCodigoPedido(this.pedido);

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
      }
      this.loading = false;
    }
  }

  formatarProdutos(produtos: Produto[]): string {
    let aux: string = '';

    produtos.map((p) => {
      aux += `(${p.qtdItem}x) ${p.nome}`;

      if (p.tamanhoSelecionado) {
        aux += ` - ${p.tamanhoSelecionado.replaceAll(' ', '')}`;
      }
      if (p.corSelecionada) {
        aux += `/${p.corSelecionada}`;
      }
      if (p.modeloCelular) {
        aux += ` - ${p.modeloCelular.toUpperCase().replaceAll(' ', '')}`;
      }

      if (this.pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO) {
        aux += ` - ${p.valorTaxa.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })} `;
      } else {
        aux += ` - ${p.valor.toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })} `;
      }
    });

    return aux.trim();
  }

  gerarCodigoPedido(pedido: Pedido) {
    let code = 'PED';
    code +=
      pedido.dataPedido?.replaceAll('/', '') + new Date().getTime().toString();
    return code;
  }

  valorTotalProduto(produto: Produto) {
    let total;

    if (this.pedido.formaPagamento == FormasPagamento.CARTAO_CREDITO) {
      total = produto.qtdItem ? produto.valorTaxa * produto.qtdItem : 0;
    } else {
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

  getTipoDocumentos() {
    this.pagamentoService.getTiposDocumentos().subscribe({
      next: (doc) => {
        this.documentos = doc;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }
}
