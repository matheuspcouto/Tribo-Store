export class PedidoRequest {
  codigoPedido?: string;
  nome: string = '';
  documento?: string;
  email?: string;
  telefone?: string;
  produtos?: string;
  qtdItens?: number;
  valorTotal: number = 0;
  formaPagamento?: string;
  dataPedido?: string;
  status?: string;
}
