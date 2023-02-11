import { ApiMercadoPagoInfo } from './../shared/enums/api-info-enum';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagamentoService {
  constructor(
    private httpClient: HttpClient
  ) {}

  private authorization = `Bearer ${ApiMercadoPagoInfo.TOKEN}`;

  private headers = new HttpHeaders({'Content-Type': 'application/json', 'charset': 'UTF-8', Authorization: this.authorization });

  criarPagamento(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiMercadoPagoInfo.HOST}/payments`, requestBody, { headers: this.headers });
  }

  getBandeiras() {
    return this.httpClient.get<any>(`${ApiMercadoPagoInfo.HOST}/payment_methods`, { headers: this.headers });
  }

  getTiposDocumentos(): Observable<any> {
    return this.httpClient.get<any>(`${ApiMercadoPagoInfo.HOST}/identification_types`, { headers: this.headers });
  }

  gerarToken(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiMercadoPagoInfo.HOST}/process_payment`, requestBody, { headers: this.headers });
  }
}
