import { ApiMercadoPagoInfo } from './../shared/enums/api-info-enum';
import { Injectable, OnInit } from '@angular/core';
import { CardInstallment, NgxMercadopagoService } from 'ngx-mercadopago';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagamentoService implements OnInit {
  constructor(
    private mpService: NgxMercadopagoService,
    private httpClient: HttpClient
  ) {}

  private authorization = `Bearer ${ApiMercadoPagoInfo.TOKEN}`;

  private headers = new HttpHeaders({'Content-Type': 'application/json', 'charset': 'UTF-8', Authorization: this.authorization });


  ngOnInit() {
    this.mpService.initialize();
  }

  buscarCartao() {

  }

  criarPagamento(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiMercadoPagoInfo.HOST}/payments`, requestBody, { headers: this.headers });
  }

  getBandeiras() {
    return this.httpClient.get<any>(`${ApiMercadoPagoInfo.HOST}/payment_methods`, { headers: this.headers });
  }

  getParcelas(card: CardInstallment) {
    const parcelas = this.mpService.getInstallments(card);
    return parcelas;
  }

  getTiposDocumentos(): Observable<any> {
    return this.httpClient.get<any>(`${ApiMercadoPagoInfo.HOST}/identification_types`, { headers: this.headers });
  }

  async createToken(form: any) {
    const cardToken = await this.mpService.createToken(form).toPromise();
    return cardToken;
  }
}
