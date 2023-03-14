import { Injectable } from '@angular/core';
import { ProdutoRequest } from '../models/request/produto-request';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  constructor() {}

  produtos: ProdutoRequest[] = [];

  adicionar(prod: ProdutoRequest) {
    this.produtos.push(prod);
    sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
  }

  remover(produto: ProdutoRequest) {
    this.produtos.splice(this.produtos.indexOf(produto), 1);
    sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
  }

  getItens() {
    return this.produtos;
  }

  clear() {
    sessionStorage.clear();
    localStorage.clear();
    this.produtos = [];
  }

  pesquisar(idProduto: number) {
    return this.produtos.some((item) => item.id == idProduto);
  }

  verificarExisteProduto(prod: ProdutoRequest): boolean {
    return this.produtos.some(
      (item) =>
        (item.corSelecionada == prod.corSelecionada ||
          item.tamanhoSelecionado == prod.tamanhoSelecionado) &&
        item.id == prod.id
    );
  }

  total(): number {
    return this.produtos
      .map((item) => (item.qtdItem ? item.valor * item.qtdItem : item.valor))
      .reduce((prev, value) => prev + value, 0);
  }

  totalTaxa(): number {
    return this.produtos
      .map((item) =>
        item.qtdItem ? item.valorTaxa * item.qtdItem : item.valorTaxa
      )
      .reduce((prev, value) => prev + value, 0);
  }
}
