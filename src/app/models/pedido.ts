import { Produto } from './produto';

export class Pedido {
  id?: number;
  nome: string = '';
  telefone?: string;
  produtos: Produto[] = [];
  qtdItens?: number;
  valorTotal?: number;
  formaPagamento?: string;
  dataPedido?: Date;
  status?: string;
}
