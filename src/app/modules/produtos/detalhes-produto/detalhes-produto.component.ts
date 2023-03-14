import { Router } from '@angular/router';
import { CarrinhoService } from './../../../services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import {
  ErroDetalhesProduto,
  getProdutoValidationErrors,
} from './produto.validator';
import { ToastrService } from 'ngx-toastr';
import { ProdutoRequest } from 'src/app/models/request/produto-request';
import { ProdutoResponse } from 'src/app/models/response/produto-response';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css'],
})
export class DetalhesProdutoComponent implements OnInit {
  loading = false;
  produtoRequest = new ProdutoRequest();
  produtoResponse= new ProdutoResponse();
  tamanhos: string[] = [];
  cores: string[] = [];
  disabled: boolean = false;
  errorsValidators: ErroDetalhesProduto[] = [];
  erroForm: any;
  adicionado: boolean = false;
  indexImg: number = 0;

  constructor(
    private carrinho: CarrinhoService,
    private notificationService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    try {
      // TODO: Trazer produto da API e não da Session Storage
      let produtoSelecionado = sessionStorage.getItem('produto');

      if (produtoSelecionado !== null) {
        this.produtoResponse = JSON.parse(produtoSelecionado);
        this.tamanhos = this.produtoResponse.tamanhos ? this.produtoResponse.tamanhos : [];
        this.cores = this.produtoResponse.cores ? this.produtoResponse.cores : [];
      } else {
        this.router.navigate(['home']);
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  adicionarCarrinho() {
    this.loading = true;

    try {
      this.errorsValidators = getProdutoValidationErrors(this.produtoRequest);
      if (this.errorsValidators.length == 0) {

        // TODO: verificar Item no Carrinho
        /* if (this.verificarProdutoCarrinho(this.produto)) {
          this.notificationService.error('Ja existe um produto igual a esse no carrinho','Erro');
          this.loading = false;
          return;
        } */

        this.carrinho.adicionar(this.produtoRequest);
        this.notificationService.success('Produto adicionado ao carrinho !','Sucesso');
      }
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  verificarProdutoCarrinho(prod: ProdutoResponse): boolean {
    return this.carrinho.verificarExisteProduto(prod);
  }

  mudarImagem() {
    this.indexImg++;
    if (this.produtoResponse.img.length == this.indexImg) {
      this.indexImg = 0;
    }
  }
}
