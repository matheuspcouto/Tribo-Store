import { AppInfo } from 'src/app/shared/enums/app-info-enum';
import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/models/produto';
import { Pedido } from 'src/app/models/pedido';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
})
export class CarrinhoComponent implements OnInit {
  titulo = AppInfo.TITLE;
  pedido = new Pedido();
  produtos: Produto[] = [];
  produto = new Produto();
  errorValidator: any;
  loading = false;
  sexo?: string;
  tamanhosTipos: string[] = [];

  ngOnInit() {}

  enviar() {
    //this.errorValidator = getFormValidationErrors(this.pedido);

    if (this.errorValidator) {
      console.table(this.errorValidator);
    }
  }

}

