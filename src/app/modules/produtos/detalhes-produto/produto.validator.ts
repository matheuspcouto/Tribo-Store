import { TipoProduto } from './../../../shared/enums/tipo-produto-enum';
import { Produto } from './../../../models/produto';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ErroDetalhesProduto {
  tipoErro: string;
  controleErro?: string;
  mensagemErro: string;
}

export const descricaoValidator = [
  Validators.maxLength(30),
  Validators.minLength(5),
  Validators.required,
  Validators.nullValidator,
];

export const telefoneValidator = [
  Validators.maxLength(11),
  Validators.minLength(10),
  Validators.required,
  Validators.nullValidator,
];

export const qtdValidator = [
  Validators.min(1),
  Validators.required,
  Validators.nullValidator,
];

export function getProdutoValidationErrors(produto: Produto): ErroDetalhesProduto[] {
  let errors: ErroDetalhesProduto[] = [];

  var form = new FormGroup({
      quantidade: new FormControl(produto.qtdItem, qtdValidator),
      cor: new FormControl(produto.corSelecionada, produto.tipo === TipoProduto.MEIA ? Validators.required : null),
      tamanho: new FormControl(produto.tamanhoSelecionado, produto.tipo === TipoProduto.MEIA || produto.tipo === TipoProduto.CAMISA ? Validators.required : null),
      modelo_celular: new FormControl(produto.modeloCelular, produto.tipo === TipoProduto.CAPINHA ? Validators.required : null),
  });

  Object.keys(form.controls).forEach((campoErro) => {
    const control = form.get(campoErro);

    var controlErrors: any = control?.errors;

    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach((tipoErro) => {
        errors.push({
          controleErro: campoErro,
          tipoErro: tipoErro,
          mensagemErro: campoErro + mensagensErros.get(tipoErro),
        });
      });
    }
  });

  return errors;
}

export const mensagensErros = new Map<string, string>([
  ['required', ' é obrigatório'],
  ['min', ' deve ser no mínimo 1'],
  ['minlength', ' informado é muito curto'],
  ['maxlength', ' informado é muito longo'],
  ['pattern', ' informado é inválido. Insira um formato válido.'],
]);
