import { ApiInfo } from '../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  constructor(private httpClient: HttpClient) {}

  private headers = new HttpHeaders({'Content-Type': 'text/plain;charset=UTF-8'});

  getPedidos(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search`, { headers: this.headers });
  }

  consultarPedido(codigoPedido: any): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}?method=consultarPedido&codigoPedido=${codigoPedido}`, { headers: this.headers });
  }

  criarPedido(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiInfo.HOST}?method=criarPedido`, requestBody, { headers: this.headers });
  }
}
