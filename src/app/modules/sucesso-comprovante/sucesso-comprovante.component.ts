import { PedidoResponse } from '../../models/response/pedido-response';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sucesso-comprovante',
  templateUrl: './sucesso-comprovante.component.html',
  styleUrls: ['./sucesso-comprovante.component.css'],
})
export class SucessoComprovanteComponent implements OnInit {
  pedidoComprovante = new PedidoResponse();
  loading = false;
  pedido?: any | null;
  paginaOrigem?: string | null;

  constructor(
    private notificationService: ToastrService,
    private router: Router,
    private carrinho: CarrinhoService,
  ) {
    this.pedido = sessionStorage.getItem('pedido');
    this.paginaOrigem = sessionStorage.getItem('paginaOrigem');
  }

  ngOnInit() {
    this.loading = true;

    try {
      if (this.pedido) {
        this.pedidoComprovante = JSON.parse(this.pedido);
        if (this.pedidoComprovante) { this.carrinho.clear(); }
        this.loading = false;
      }
      else { this.router.navigate(['home']); }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
      this.router.navigate(['home']);
      this.loading = false
    }
  }

  copiarCodigo(event: MouseEvent) {
    event.preventDefault();
    const payload: string = this.pedidoComprovante.codigoPedido
      ? this.pedidoComprovante.codigoPedido
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

  /*   formatarProdutos(p: Produto): string {
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
    } */

  enviarComprovante() {
    let messageText = `Olá, eu gostaria de receber o link de pagamento do pedido *${this.pedidoComprovante.codigoPedido}* na Tribo Store.`;
    let url = `https://api.whatsapp.com/send?phone=5563984416085&text=${messageText}`;
    window.open(url);
  }

  valorTotalFormatado() {
    return this.pedidoComprovante.valorTotal.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
