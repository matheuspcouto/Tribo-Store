import { PedidoRequest } from "src/app/models/request/pedido-request";
import { ProdutoRequest } from "src/app/models/request/produto-request";
import { FormasPagamento } from "../enums/formas-pagamento.enum";
import { CategoriaProduto, SubCategoriaProduto } from "../enums/categoria-enum";

export function formatarProdutosPedido(produtos: ProdutoRequest[], pedido: PedidoRequest): string {
  let aux: string = '';

  produtos.map((p) => {
    aux += `(${p.qtdItem}x) ${p.nome}`;

    if (p.tamanhoSelecionado) {
      aux += ` - ${p.tamanhoSelecionado.replaceAll(' ', '')}`;
    }
    if (p.corSelecionada) {
      aux += `/${p.corSelecionada}`;
    }
    if (p.modeloCelular) {
      aux += ` - ${p.modeloCelular.toUpperCase().replaceAll(' ', '')}`;
    }

    if (pedido.formaPagamento === FormasPagamento.CARTAO_CREDITO) {
      aux += ` - ${p.valorTaxa.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} `;
    } else {
      aux += ` - ${p.valor.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} `;
    }
  });

  return aux.trim();
}

export function formatarValorTotalProduto(produto: ProdutoRequest, pedido: PedidoRequest | undefined) {
  let total;

  if (pedido && pedido.formaPagamento == FormasPagamento.CARTAO_CREDITO) {
    total = produto.qtdItem ? produto.valorTaxa * produto.qtdItem : 0;
  } else {
    total = produto.qtdItem ? produto.valor * produto.qtdItem : 0;
  }

  return total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

export function formatarProdutoPedido(p: ProdutoRequest) {
  let aux = `(${p.qtdItem}x) ${p.nome}`;

  if (p.tamanhoSelecionado) {
    aux += ` - ${p.tamanhoSelecionado.replaceAll(' ', '')}`;
  }
  if (p.corSelecionada) {
    aux += `/${p.corSelecionada}`;
  }
  if (p.modeloCelular) {
    aux += ` - ${p.modeloCelular.toUpperCase().replaceAll(' ', '')}`;
  }

  return aux.trim();
}

export function formatarProdutoCarrinho(produto: ProdutoRequest) {
  let aux = produto.nome + ' - ';

  aux += produto.categoria != CategoriaProduto.PERSONALIZADOS ? produto.tamanhoSelecionado : '';

  aux += produto.subCategoria == SubCategoriaProduto.MEIA ? '/' + produto.corSelecionada : '';

  aux += produto.subCategoria == SubCategoriaProduto.CAPA_CELULAR ? produto.modeloCelular : '';

  if (aux.endsWith(' - ')) {
    aux = aux.substring(0, aux.length - 3);
  }

  return aux.trim();
}

