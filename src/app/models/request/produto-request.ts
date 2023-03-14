export class ProdutoRequest {
  id: number = 0;
  nome: string = '';
  descricao?: string;
  categoria?: string;
  subCategoria?: string;
  tamanhoSelecionado?: string;
  corSelecionada?: string;
  modeloCelular?: string;
  qtdItem?: number;
  valor: number = 0;
  valorTaxa: number = 0;
  img: string[] = [];
  ativo: boolean = true;
}
