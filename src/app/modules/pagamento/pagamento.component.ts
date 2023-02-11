import { Router } from '@angular/router';
import { FormasPagamento } from './../../shared/enums/formas-pagamento.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { PagamentoService } from './../../services/pagamento-service.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ErroPedido } from '../finalizar-pedido/pedido.validator';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentMethod, PaymentForm } from 'ngx-mercadopago';

type DadosPix = {
  qr_code_base64: string;
  qr_code: string;
  ticket_url: string;
};

type DadosCartao = {
  cardNumber?: string;
  expirationDate?: string;
  cardholderName?: string;
  issuer?: string;
  installments?: string;
  identificationType?: string;
  identificationNumber?: string;
  cardholderEmail?: string;
  securityCode?: string;
};

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {
  pedido = new Pedido();
  loading = false;
  errorsValidators: ErroPedido[] = [];
  dadosPix?: DadosPix;
  dadosCartao: DadosCartao = {};
  form: string = 'cartao';
  parcelas: any;
  bandeiras: any;
  bandeiraSelecionada: any;
  payment_data: any;

  formCheckout = new FormGroup({
    cardNumber: new FormControl(),
    securityCode: new FormControl(),
    cardExpirationMonth: new FormControl(),
    cardExpirationYear: new FormControl(),
    cardholderName: new FormControl(),
    docType: new FormControl(),
    docNumber: new FormControl(),
  });

  constructor(
    private pagamentoService: PagamentoService,
    private notificationService: ToastrService,
    private router: Router
  ) {
    this.loading = true;
  }

  ngOnInit() {
    //this.initPedido();

    this.mockPedido();

    if (this.pedido.formaPagamento == FormasPagamento.CARTAO_CREDITO) {
      this.form = 'cartao';
      this.getBandeiras();
    }

    if (this.pedido.formaPagamento == FormasPagamento.PIX) {
      this.criarPagamentoPix(this.pedido);
    }

    this.loading = false;
  }

  initPedido() {
    try {
      let pedidoRealizado = sessionStorage.getItem('pedido');

      if (pedidoRealizado !== null) {
        this.pedido = JSON.parse(pedidoRealizado);
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
  }

  mockPedido() {
    this.pedido = {
      codigoPedido: 'PED110220231676121203848',
      dataPedido: '11/02/2023',
      documento: '04886126162',
      email: 'teste@teste.com',
      formaPagamento: 'Cartão de Crédito',
      nome: 'teste',
      produtos: '(1x) Adesivo Logo Tribo - R$ 3,00',
      qtdItens: 1,
      status: 'A PAGAR',
      telefone: '63992014337',
      tipoDocumento: 'CPF',
      valorTotal: 3,
    };
  }

  getBandeiras() {
    this.pagamentoService.getBandeiras().subscribe({
      next: (pag) => {
        this.bandeiras = pag.filter(
          (i: PaymentMethod) => i.payment_type_id == 'credit_card'
        );
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }

  copiarCodigo(event: MouseEvent) {
    event.preventDefault();
    const payload: string = this.dadosPix?.qr_code
      ? this.dadosPix?.qr_code
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

  criarPagamentoCartao() {
    var payment_data = {
      description: `Tribo Store: Pedido #${this.pedido.codigoPedido}`,
      payment_method_id: this.bandeiraSelecionada.id,
      transaction_amount: this.pedido.valorTotal,
      installments: this.dadosCartao?.installments,
      payer: {
        email: this.pedido.email,
        first_name: this.pedido.nome,
        identification: {
          type: this.pedido.tipoDocumento,
          number: this.pedido.documento,
        },
      },
    };

    this.pagamentoService.criarPagamento(payment_data).subscribe({
      next: (pay) => {
        console.log(pay);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }

  criarPagamentoPix(pedido: Pedido) {
    this.payment_data = {
      description: `Tribo Store: Pedido #${pedido.codigoPedido}`,
      payment_method_id: 'pix',
      transaction_amount: pedido.valorTotal,
      payer: {
        email: pedido.email,
        first_name: pedido.nome,
        identification: {
          type: pedido.tipoDocumento,
          number: pedido.documento,
        },
      },
    };

    this.pagamentoService.criarPagamento(this.payment_data).subscribe({
      next: (pay) => {
        this.dadosPix = pay.point_of_interaction.transaction_data;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }
}
