import { ApiInfo } from '../shared/enums/api-info-enum';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProdutoService {

  constructor(private httpClient: HttpClient) {}

  private headers = new HttpHeaders({'Content-Type': 'text/plain;charset=UTF-8'});

  listarProdutos(): Observable<any> {
    return this.httpClient.get<any>(`${ApiInfo.HOST}?method=listarProdutos`, { headers: this.headers });
  }
}
