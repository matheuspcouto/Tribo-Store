import { FormasPagamento } from './../../shared/enums/formas-pagamento.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { PagamentoService } from './../../services/pagamento-service.service';
import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { ErroPedido } from '../finalizar-pedido/pedido.validator';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CardInstallment, PaymentMethod } from 'ngx-mercadopago';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {
  pedido = new Pedido();
  loading = false;
  errorsValidators: ErroPedido[] = [];
  parcelas: any;
  form: string = 'cartao';
  documentos: any;
  docSelecionado: any;
  bandeiras: any;
  numeroCartao: any;
  email: any;
  numeroDocumento: any;
  bandeiraSelecionada: any

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
    private notificationService: ToastrService
  ) { this.loading = true; }

  ngOnInit() {

    this.initPedido();

    if (this.pedido.formaPagamento == FormasPagamento.CARTAO_CREDITO){
      this.form = 'cartao';
      this.getBandeiras()
    }

    this.getTipoDocumentos();
    this.loading = false;
  }

  initPedido() {
    try {
      let pedidoRealizado = sessionStorage.getItem('pedido');

      if (pedidoRealizado !== null) {
        this.pedido = JSON.parse(pedidoRealizado);
      }

      console.log(this.pedido);


    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
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

  getBandeiras() {
    this.pagamentoService.getBandeiras().subscribe({
      next: (pag) => {
        this.bandeiras = pag.filter((i: PaymentMethod) => i.payment_type_id == 'credit_card');
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }

  verParcelas(card: CardInstallment) {
    this.parcelas = this.pagamentoService.getParcelas(card);
  }

  pagarCartao() {
    var payment_data = {
      description: `Tribo Store: Pedido #${this.pedido.codigoPedido}`,
      payment_method_id: 'credit_card',
      transaction_amount: this.pedido.valorTotal,
      installments: 1,
      payer: {
        email: this.email,
        first_name: this.pedido.nome,
        identification: {
            type: this.docSelecionado,
            number: this.numeroDocumento
        }
      }
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

  pagar() {
    var payment_data = {
      description: `Tribo Store: Pedido #${this.pedido.codigoPedido}`,
      payment_method_id: 'pix',
      transaction_amount: this.pedido.valorTotal,
      payer: {
        email: this.email,
        first_name: this.pedido.nome,
        identification: {
            type: this.docSelecionado,
            number: this.numeroDocumento
        }
      }
    };

    this.pagamentoService.criarPagamento(payment_data).subscribe({
      next: (pay) => {
        console.log(pay.ticket_url);
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
      },
    });
  }
}
