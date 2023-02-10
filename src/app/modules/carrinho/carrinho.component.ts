import { TipoProduto } from './../../shared/enums/tipo-produto-enum';
import { CarrinhoService } from 'src/app/services/carrinho-state.service';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { Pedido } from 'src/app/models/pedido';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  produtos: Produto[] = [];
  produto = new Produto();
  loading = false;
  erroForm: any;
  removido: boolean = false;

  constructor(
    private carrinho: CarrinhoService,
    private notificationService: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    try {
      this.produtos = this.carrinho.getItens();
    } catch (error: any) {
      this.notificationService.error(error, 'Erro');
    }
    this.loading = false;
  }

  finalizarPedido() {
    this.router.navigate(['/finalizar-pedido']);
  }

  removerCarrinho(produto: Produto) {
    this.loading = true;
    try {
      this.carrinho.remover(produto);
      this.produtos = this.carrinho.getItens();
      this.totalCarrinho();
      this.notificationService.success('Produto removido do carrinho !', 'Sucesso');
    } catch (error: any) {
      this.notificationService.error(error.message, 'Erro');
    }
    this.loading = false;
  }

  totalCarrinho() {
    return this.carrinho.total();
  }

  valorTotalProduto(produto: Produto) {
    return produto.qtdItem ? produto.valor * produto.qtdItem : 0;
  }

  formatarProdutoCarrinho(p: Produto) {
    let aux = `(${p.qtdItem}x) ${p.nome}`;

    if (p.tamanhoSelecionado) {
      aux += ` - ${ p.tamanhoSelecionado.replaceAll(' ', '')}`;
    }
    if (p.corSelecionada) {
      aux += `/${p.corSelecionada}`;
    }
    if (p.modeloCelular) {
      aux += ` - ${p.modeloCelular.toUpperCase().replaceAll(' ', '')}`;
    }

    return aux.trim();
  }
}
