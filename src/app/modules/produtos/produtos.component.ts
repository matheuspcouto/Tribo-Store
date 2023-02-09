import { TipoProduto } from './../../shared/enums/tipo-produto-enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { AppInfo } from 'src/app/shared/enums/app-info-enum';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  titulo = AppInfo.TITLE;
  produtos: Produto[] = [];
  errorValidator: any;
  loading = false;
  disabled: boolean = false;
  sexo?: string;
  tamanhosTipos: string[] = [];

  constructor(private router: Router, private carrinho: CarrinhoService){};

  ngOnInit() {
    this.produtos = [
        {
          id: 1,
          descricao: "Camiseta Tribo Leão - Algodão",
          tipo: TipoProduto.CAMISA,
          valor: 35.0,
          ativo: true,
          img: 'assets/camisa-leao.png'
        },
        {
          id: 2,
          descricao: "Adesivo Tribo Alvo (6cm x 7cm)",
          tipo: TipoProduto.ADESIVO,
          valor: 3.0,
          ativo: true,
          img: 'assets/camisa-leao.png'
        },
        {
          id: 3,
          descricao: "Adesivo Logo Tribo (4cm x 8cm)",
          tipo: TipoProduto.ADESIVO,
          valor: 3.0,
          ativo: true,
          img: 'assets/camisa-leao.png'
        },
        {
          id: 4,
          descricao: "Meias Tribo Alvo",
          tipo: TipoProduto.MEIA,
          valor: 25.0,
          ativo: true,
          img: 'assets/camisa-leao.png'
        },
    ]
  }

  verificarProdutoCarrinho(idProduto: number): boolean {
    return this.carrinho.pesquisar(idProduto);
  }

 verProduto(produto: Produto){
  sessionStorage.setItem('produto', JSON.stringify(produto));
  this.router.navigate(['detalhes-produto']);
 }
}
