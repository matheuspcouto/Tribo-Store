import { TipoProduto } from './../../shared/enums/tipo-produto-enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/produto';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

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
          nome: "Camiseta Tribo Leão",
          descricao: 'Tecido de Algodão',
          tipo: TipoProduto.CAMISA,
          valor: 35.0,
          valorTaxa:  36.75,
          ativo: true,
          img: 'assets/camisa-leao.png',
          codigoProduto: 'CAM-LEAO-'
        },
        {
          id: 2,
          nome: "Meias Tribo Alvo - Branca",
          descricao: 'Tecido de algodão com a logo da tribo bordada',
          tipo: TipoProduto.MEIA,
          corSelecionada: 'Branca',
          valor: 25.0,
          valorTaxa:  26.25,
          ativo: true,
          img: 'assets/meia-branca-b.png',
          codigoProduto: 'MEI-ALVO-'
        },
        {
          id: 3,
          nome: "Meias Tribo Alvo - Preta",
          descricao: 'Tecido de algodão com a logo da tribo bordada',
          tipo: TipoProduto.MEIA,
          corSelecionada: 'Preta',
          valor: 25.0,
          valorTaxa:  26.25,
          ativo: true,
          img: 'assets/meia-preta-b.png',
          codigoProduto: 'MEI-ALVO-'
        },
        {
          id: 4,
          nome: "Adesivo Tribo Alvo",
          descricao: 'Tamanho 6cm x 7cm',
          tipo: TipoProduto.ADESIVO,
          valor: 3.0,
          valorTaxa:  3.15,
          ativo: true,
          img: 'assets/camisa-leao.png',
          codigoProduto: 'ADE-ALVO-'
        },
        {
          id: 5,
          nome: "Adesivo Logo Tribo",
          descricao: 'Tamanho 4cm x 8cm',
          tipo: TipoProduto.ADESIVO,
          valor: 3.0,
          valorTaxa:  3.15,
          ativo: true,
          img: 'assets/camisa-leao.png',
          codigoProduto: 'ADE-LOGO-'
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
