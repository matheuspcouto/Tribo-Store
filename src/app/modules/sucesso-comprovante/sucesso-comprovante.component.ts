import { PedidoResponse } from './../../models/pedido-response';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { FormasPagamento } from 'src/app/shared/enums/formas-pagamento.enum';

@Component({
  selector: 'app-sucesso-comprovante',
  templateUrl: './sucesso-comprovante.component.html',
  styleUrls: ['./sucesso-comprovante.component.css'],
})
export class SucessoComprovanteComponent implements OnInit {
  pedido = new PedidoResponse();
  loading = false;

  constructor(
    private notificationService: ToastrService,
    private router: Router,
    private carrinho: CarrinhoService
  ) {}

  ngOnInit() {
    try {
      this.loading = true;
      let pedidoRealizado = sessionStorage.getItem('pedido');

      if (pedidoRealizado !== null) {
        this.pedido = JSON.parse(pedidoRealizado);
      }

      if (!this.pedido) {
        this.router.navigate(['home']);
      }

      if (this.pedido) { this.carrinho.clear(); }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }

    this.loading = false;
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
