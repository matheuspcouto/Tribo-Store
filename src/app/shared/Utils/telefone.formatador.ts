export function formatarTelefone(telefone: string| undefined): string | undefined {

  const cleaned = ('' + telefone).replace(/\D/g, ''); // Remove todos os caracteres não-numéricos
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/); // Verifica se tem 10 ou 11 dígitos

  if (match) {

    if (match[1].length === 2) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    } else {
      return `(${match[1]}) ${match[2].substring(0, 5)}-${match[2].substring(5)}-${match[3]}`;
    }
  }

  return telefone;
}
