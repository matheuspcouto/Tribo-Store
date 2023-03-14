export class ProdutoResponse {
  id: number = 0;
  nome: string = '';
  descricao?: string;
  categoria?: string;
  subCategoria?: string;
  valor: number = 0;
  valorTaxa: number = 0;
  ativo: boolean = true;
  tamanhos?: string[];
  cores?: string[];
  img: string[] = []; // valor mapeado no FED
}
