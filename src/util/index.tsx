import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';

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

  comprovante +=
    centralizarTexto('PAF UTILIDADES E PRESENTES LTDA', larguraMaxima) + '\n';
  comprovante += 'MARCELO PIRES, 2106\n';
  comprovante += 'CENTRO, DOURADOS - MS\n';
  comprovante += 'CNPJ: 07.638.491/0005-73\n';
  comprovante += 'IE: 284266086\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante +=
    centralizarTexto('Documento Auxiliar da Nota Fiscal', larguraMaxima) + '\n';
  comprovante +=
    centralizarTexto('Consumidor Eletrônica', larguraMaxima) + '\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += '# COD  DESC            QTD VL\n';
  comprovante += '001 789652540519\nCONJ POTE 3PCS RED   1   8,99\n';
  comprovante += '003 789729183186\nCONJ 4 ORG QUAD 500ML 1   17,99\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += 'Total Itens: 3\n';
  comprovante += 'Total R$: 35,97\n';
  comprovante += 'Cartao Debito TEF: 35,97\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante +=
    centralizarTexto('Consulta pela Chave de Acesso', larguraMaxima) + '\n';
  comprovante += 'http://www.dfe.ms.gov.br\n';
  comprovante += '5024 1007 6384 9100 0737 6511\n';
  comprovante += linhaDivisoria(larguraMaxima);
  comprovante += 'Oper(a): 71 - Antonia Naiane\n';
  comprovante += 'Data: 14/10/2024 08:50:39\n';
  for (let i = 0; i < linhaFim; i += 1) {
    comprovante += '\n';
  }

  return comprovante;
}

export function gerarHash() {
  return uuid().replace(/-/g, '');
}
let nsuCounter = 0;
export const generateNSU = () => {
  const now = Date.now();
  nsuCounter += 1;
  const nsu = `${now}${nsuCounter}`.slice(-9);

  return nsu;
};
