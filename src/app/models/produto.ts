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
  valorTotal?: number;
  img?: string;
  ativo: boolean = true;
}
