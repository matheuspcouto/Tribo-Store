export class Pedido {
  id?: string;
  codigoPedido?: string;
  nome: string = '';
  telefone?: string;
  produtos?: string;
  qtdItens?: number;
  valorTotal: number = 0;
  formaPagamento?: string;
  dataPedido?: string;
  status?: string;
}
