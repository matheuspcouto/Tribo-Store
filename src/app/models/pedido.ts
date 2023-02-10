export class Pedido {
  codigoPedido?: string;
  nome: string = '';
  telefone?: string;
  codigoProdutos: string[] = [];
  qtdItens?: number;
  valorTotal: number = 0;
  formaPagamento?: string;
  dataPedido?: string;
  status?: string;
}
