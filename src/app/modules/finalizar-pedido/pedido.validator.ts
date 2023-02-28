import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PedidoRequest } from 'src/app/models/pedido-request';

export interface ErroPedido {
  tipoErro: string;
  controleErro?: string;
  mensagemErro: string;
}

export const nomeValidator = [
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

export const emailValidator = [
  Validators.required,
  Validators.nullValidator,
  Validators.email
];

export const cnpjValidator = [
  Validators.maxLength(14),
  Validators.minLength(14),
  Validators.required,
  Validators.nullValidator,
];

export const cpfValidator = [
  Validators.maxLength(11),
  Validators.minLength(11),
  Validators.required,
  Validators.nullValidator,
];


export function getPedidoValidationErrors(pedido: PedidoRequest, tipoDocumento: string): ErroPedido[] {
  let errors: ErroPedido[] = [];

  var form = new FormGroup({
      nome: new FormControl(pedido.nome, nomeValidator),
      telefone: new FormControl(pedido.telefone, telefoneValidator),
      numero_documento: new FormControl(pedido.documento, tipoDocumento == 'CPF' ? cpfValidator : cnpjValidator),
      email: new FormControl(pedido.email, emailValidator),
      forma_pagamento: new FormControl(pedido.formaPagamento, Validators.required),
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
