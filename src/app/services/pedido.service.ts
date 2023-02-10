import { ApiInfo } from '../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  constructor(private httpClient: HttpClient) {}

  private encodeAuth = btoa(ApiInfo.LOGIN + ':' + ApiInfo.PASSWORD);
  private authorization = `Basic ${this.encodeAuth}`;

  private headers = new HttpHeaders({'Content-Type': 'application/json', 'charset': 'UTF-8', Authorization: this.authorization });

  getPedidos(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search`, { headers: this.headers });
  }

  getPedidoByCodigo(codigoProduto: any): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search?codigoProduto=${codigoProduto}`, { headers: this.headers });
  }

  criarPedido(body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.post<any>(`${ApiInfo.HOST}`, requestBody, { headers: this.headers });
  }
}
