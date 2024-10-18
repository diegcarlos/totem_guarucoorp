function centralizarTexto(texto: string, largura: number) {
  const espacos = Math.floor((largura - texto.length) / 2);
  return ' '.repeat(espacos) + texto + ' '.repeat(espacos);
}

function linhaDivisoria(largura: number) {
  return '-'.repeat(largura) + '\n';
}

export function gerarComprovante(valor: string, linhaFim = 2) {
  const larguraMaxima = 48; // Defina a largura máxima conforme sua impressora

  let comprovante = '';

  comprovante += centralizarTexto('CUPOM', larguraMaxima) + '\n';
  comprovante += '\n';
  comprovante += 'GUARUCOP\n';
  comprovante += 'CNPJ: 00.000.000/0000-00\n';
  comprovante += 'R JOAO SAMAHA, 830, SAO JOAO BATISTA\n';
  comprovante += '31520-100 - São Paulo SP\n';
  comprovante += '(31)3000-0000\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += centralizarTexto('PEDIDO N° 188', larguraMaxima) + '\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += 'Data: 03/02/2022     Hora: 13:02\n';
  comprovante += 'Cliente: Consumidor\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += centralizarTexto('PRODUTOS', larguraMaxima) + '\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += 'Nome                Qtd Vr. unt Subtotal\n';
  // comprovante += 'Armadura Resgate\n';
  // comprovante += '(Fem/MARK XXVI)\n';
  comprovante += `                    1   ${valor} ${valor}\n`;
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += centralizarTexto('PAGAMENTO', larguraMaxima) + '\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += `Total do pedido:               ${valor}\n`;
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += 'Vencimento   Valor    Forma de pagamento\n';
  comprovante += `03/02/2022   ${valor} Cartão de Débito\n`;
  comprovante += '\n';
  comprovante +=
    centralizarTexto(
      '*** Este ticket não é documento fiscal ***',
      larguraMaxima,
    ) + '\n';
  comprovante += '\n';
  comprovante +=
    centralizarTexto('OBRIGADO E VOLTE SEMPRE!', larguraMaxima) + '\n';
  comprovante += linhaDivisoria(larguraMaxima);
  for (let i = 0; i < linhaFim; i += 1) {
    comprovante += '\n';
  }

  return comprovante;
}
