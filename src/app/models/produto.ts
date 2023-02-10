export class Produto {
  id: number = 0;
  nome: string = '';
  descricao?: string;
  tipo?: string;
  tamanhoSelecionado?: string;
  corSelecionada?: string;
  modeloCelular?: string;
  qtdItem?: number;
  valor: number = 0;
  valorTaxa: number = 0;
  codigoProduto: string = '';
  img?: string;
  ativo: boolean = true;
}
