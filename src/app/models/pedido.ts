export class Pedido {
  codigoPedido?: string;
  nome: string = '';
  telefone?: string;
  codigoProdutos: string[] = [];
  qtdItens?: number;
  valorTotal?: number;
  formaPagamento?: string;
  dataPedido?: Date;
  status?: string;
}
