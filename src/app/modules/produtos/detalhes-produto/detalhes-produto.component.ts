import { CarrinhoService } from './../../../services/carrinho-state.service';
import { Produto } from './../../../models/produto';
import { Component, OnInit } from '@angular/core';
import {
  ErroDetalhesProduto,
  getProdutoValidationErrors,
} from './produto.validator';
import { ToastrService } from 'ngx-toastr';

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
  indexImg: number = 0;

  constructor(
    private carrinho: CarrinhoService,
    private notificationService: ToastrService
  ) {}

  ngOnInit() {
    this.loading = true;

    try {
      let produtoSelecionado = sessionStorage.getItem('produto');

      if (produtoSelecionado !== null) {
        this.produto = JSON.parse(produtoSelecionado);
        this.tamanhos = this.produto.tamanhos ? this.produto.tamanhos : [];
        this.cores = this.produto.cores ? this.produto.cores : [];
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  adicionarCarrinho() {
    this.loading = true;
    console.log(this.produto);

    try {
      this.errorsValidators = getProdutoValidationErrors(this.produto);
      if (this.errorsValidators.length == 0) {

        /* if (this.verificarProdutoCarrinho(this.produto)) {
          this.notificationService.error('Ja existe um produto igual a esse no carrinho','Erro');
          this.loading = false;
          return;
        } */

        this.carrinho.adicionar(this.produto);
        this.notificationService.success('Produto adicionado ao carrinho !','Sucesso');
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  verificarProdutoCarrinho(prod: Produto): boolean {
    return this.carrinho.verificarExisteProduto(prod);
  }

  mudarImagem() {
    this.indexImg++;
    if (this.produto.img.length == this.indexImg) {
      this.indexImg = 0;
    }
  }
}
