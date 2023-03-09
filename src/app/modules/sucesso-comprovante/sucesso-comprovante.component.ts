import { PedidoService } from './../../services/pedido.service';
import { PedidoResponse } from './../../models/pedido-response';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sucesso-comprovante',
  templateUrl: './sucesso-comprovante.component.html',
  styleUrls: ['./sucesso-comprovante.component.css'],
})
export class SucessoComprovanteComponent implements OnInit {
  pedido = new PedidoResponse();
  loading = false;
  codigoPedido?: string | null;
  paginaOrigem?: string | null;

  constructor(
    private notificationService: ToastrService,
    private router: Router,
    private carrinho: CarrinhoService,
    private pedidoService: PedidoService
  ) {
    this.codigoPedido = sessionStorage.getItem('codigoPedido');
    this.paginaOrigem = sessionStorage.getItem('paginaOrigem');
  }

  ngOnInit() {

    this.loading = true;

    if (this.codigoPedido != null) {
      this.pedidoService.consultarPedido(this.codigoPedido).subscribe({
        next: (response) => {

          if (response.error) {
            this.notificationService.error(response.error.errorMessage, 'Erro');
            this.router.navigate([this.paginaOrigem]);
            this.loading = false;
            return;
          }

          this.pedido = response.dados;
          if (this.pedido) { this.carrinho.clear(); }
          this.loading = false;
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.error(error.message, 'Erro');
          this.loading = false;
        },
      });
    } else {
      this.router.navigate([this.paginaOrigem ? this.paginaOrigem : 'home']);
      this.loading = false;
    }
  }

  copiarCodigo(event: MouseEvent) {
    event.preventDefault();
    const payload: string = this.pedido.codigoPedido
      ? this.pedido.codigoPedido
      : '';

    let listener = (e: ClipboardEvent) => {
      let clipboard = e.clipboardData || null;

      if (clipboard !== null) {
        clipboard.setData('text', payload.toString());
        e.preventDefault();
      }
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
    this.notificationService.info('Código copiado', '');
  }

  formatarProdutos(p: Produto): string {
    let aux = `(${p.qtdItem}x) ${p.nome}`;

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

    return aux.trim();
  }

  enviarComprovante() {
    let messageText = `Olá, eu gostaria de receber o link de pagamento do pedido *${this.pedido.codigoPedido}* na Tribo Store.`;
    let url = `https://api.whatsapp.com/send?phone=5563984416085&text=${messageText}`;
    window.open(url);
  }

  valorTotalFormatado() {
    return this.pedido.valorTotal.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
