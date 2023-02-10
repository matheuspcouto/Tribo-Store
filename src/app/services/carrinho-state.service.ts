import { Injectable } from '@angular/core';
import { Produto } from '../models/produto';

@Injectable({ providedIn: 'root' })
export class CarrinhoService {
  constructor() {}

  produtos: Produto[] = [];

  adicionar(prod: Produto) {
    this.produtos.push(prod);
    sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
  }

  remover(produto: Produto) {
    this.produtos.splice(this.produtos.indexOf(produto), 1);
    sessionStorage.setItem('carrinho', JSON.stringify(this.produtos));
  }

  getItens() {
    return this.produtos;
  }

  pesquisar(idProduto: number) {
    return this.produtos.some((item) => item.id == idProduto);
  }

  verificarExisteProduto(prod: Produto): boolean {
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
