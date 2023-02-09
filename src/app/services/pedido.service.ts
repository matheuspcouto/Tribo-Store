import { ApiInfo } from '../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  constructor(private httpClient: HttpClient) {}

  private encodeAuth = btoa(ApiInfo.LOGIN + ':' + ApiInfo.PASSWORD);
  private authorization = `Basic ${this.encodeAuth}`;

  private headers = new HttpHeaders({'Content-Type': 'application/json', Authorization: this.authorization });

  getItems(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search`, { headers: this.headers });
  }

  getUltimoId(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search?nome=&limit=1`, { headers: this.headers });
  }

  getProdutoByNome(nome: any): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}/search?nome=${nome}`, { headers: this.headers });
  }

  saveItem(id:any, body: any): Observable<any> {
    const requestBody = JSON.stringify(body);
    return this.httpClient.patch<any>(`${ApiInfo.HOST}/id/${id}`, requestBody, { headers: this.headers });
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<any>(`${ApiInfo.HOST}/item/${id}`, { headers: this.headers });
  }
}
