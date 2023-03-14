import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProdutoResponse } from 'src/app/models/response/produto-response';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ProdutoService } from 'src/app/services/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  produtos: ProdutoResponse[] = [];
  errorValidator: any;
  loading = false;
  disabled: boolean = false;

  constructor(private router: Router, private produtoService: ProdutoService, private notificationService: ToastrService) { };

  // TODO: Formatar Valor Moeda
  ngOnInit() {
    this.listarProdutos();
  }

  listarProdutos() {
    this.loading = true;
    this.produtoService.listarProdutos().subscribe({
      next: (response) => {

        if (response.error) {
          sessionStorage.setItem('erro', JSON.stringify(response.error));
          this.loading = false;
          this.router.navigate(['erro']);
          return;
        }

        this.produtos = response.dados;

        if (this.produtos) {
          this.produtos.map((prod) => prod.img = this.getImgProduto(prod.id))
        }
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.notificationService.error(error.message, 'Erro');
        this.loading = false;
      },
    });
  }

  verProduto() {
    this.router.navigate(['detalhes-produto']);
  }

  getImgProduto(id: Number) {
    const urlImagensProduto = 'assets/produtos';
    var imagensProduto = [];

    if (id == 1) { imagensProduto.push(`${urlImagensProduto}/camisa-leao.png`); }
    if (id == 2) { imagensProduto.push(`${urlImagensProduto}/meia-branca.png`); imagensProduto.push(`${urlImagensProduto}/meia-preta.png`); }
    if (id == 3) { imagensProduto.push(`${urlImagensProduto}/adesivo-tribo-alvo.png`); }
    if (id == 4) { imagensProduto.push(`${urlImagensProduto}/adesivo-logo-tribo.png`); }

    return imagensProduto;
  }
}
