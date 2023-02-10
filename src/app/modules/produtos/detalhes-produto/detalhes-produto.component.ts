import { TipoProduto } from './../../../shared/enums/tipo-produto-enum';
import { CarrinhoService } from './../../../services/carrinho-state.service';
import { Produto } from './../../../models/produto';
import { Component, OnInit } from '@angular/core';
import {
  ErroDetalhesProduto,
  getProdutoValidationErrors,
} from './produto.validator';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css'],
})
export class DetalhesProdutoComponent implements OnInit {
  loading = false;
  produto = new Produto();
  tamanhos: string[] = [];
  cores: string[] = [];
  disabled: boolean = false;
  errorsValidators: ErroDetalhesProduto[] = [];
  erroForm: any;
  adicionado: boolean = false;

  constructor(private carrinho: CarrinhoService) {}

  ngOnInit() {
    this.loading = true;

    try {
      let produtoSelecionado = sessionStorage.getItem('produto');

      if (produtoSelecionado !== null) {
        this.produto = JSON.parse(produtoSelecionado);
        this.disabled = this.carrinho.pesquisar(this.produto.id);
        this.getConfigProduto(this.produto.tipo);
      }
    } catch (error: any) {
      this.erroForm = {
        tipoErro: 'form',
        mensagemErro: error,
      };
    }
    this.loading = false;
  }

  adicionarCarrinho() {
    this.loading = true;
    try {
      this.errorsValidators = getProdutoValidationErrors(this.produto);

      if (this.errorsValidators.length == 0) {
        this.carrinho.adicionar(this.produto);
        this.adicionado = true;
        this.disabled = true;
      }
    } catch (error: any) {
      this.erroForm = {
        tipoErro: 'form',
        mensagemErro: error,
      };
    }
    this.loading = false;
  }

  getConfigProduto(tipo: string | undefined) {
    if (tipo === TipoProduto.CAMISA) {
      this.tamanhos = [
        'PP',
        'P',
        'M',
        'G',
        'GG',
        'PP - Baby Look',
        'P - Baby Look',
        'M - Baby Look',
        'G - Baby Look',
        'GG - Baby Look',
      ];
    }
    if (tipo === TipoProduto.MEIA) {
      this.tamanhos = ['35', '36', '37', '38', '39', '40', '41', '42', '43'];
      //this.cores = ['Branca', 'Preta'];
    }
  }
}
