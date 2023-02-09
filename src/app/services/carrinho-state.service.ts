import { Injectable } from "@angular/core";
import { Produto } from "../models/produto";

@Injectable({ providedIn: 'root' })
export class CarrinhoService {

  constructor(){}

  produtos: Produto[] = []

  adicionar(prod: Produto){
      this.produtos.push(prod);
      sessionStorage.setItem("carrinho",JSON.stringify(this.produtos));
      console.table(this.produtos);
  }

  remover(produto: Produto){
      this.produtos.splice(this.produtos.indexOf(produto), 1);
      sessionStorage.setItem("carrinho",JSON.stringify(this.produtos))
      console.table(this.produtos);
  }

  pesquisar(idProduto: number){
    return this.produtos
      .some(item => item.id == idProduto);
}

  total(): number{
      return this.produtos
      .map(item => item.valor)
      .reduce((prev, value)=> prev+value, 0)
  }
}
