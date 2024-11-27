import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { ResultData, DreAnual } from '../types/types';

export const exportToExcel = (valuationData: ResultData, dreAnualList: DreAnual[]) => {
  const wsValuation = XLSX.utils.json_to_sheet([{
    "Valor Presente Líquido": valuationData.valorPresenteLiquido,
    "Valor Terminal": valuationData.valorTerminal,
    "Valuation Total": valuationData.valuationTotal,
  }]);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, wsValuation, 'Valuation');

  dreAnualList.forEach(dre => {
    const receitasData = dre.receitas.map(receita => ({
      "Modelo Receita": receita.modeloReceita,
      "Tipo Receita": receita.tipoReceita,
      "Descrição Receita": receita.descricao,
      "Receita Bruta Total": receita.receitaBrutaTotal,
    }));

    const despesasData = dre.despesas.map(despesa => ({
      "Descrição Despesa": despesa.descricao,
      "Tipo Despesa": despesa.tipoDespesa,
      "Valor Despesa": despesa.valor,
      "CMV": despesa.cmv,
    }));

    const dadosFinanceiros = [{
      "Ano": dre.ano,
      "Receita Líquida": dre.receitaLiquida,
      "EBITDA": dre.ebitda,
      "Lucro Líquido": dre.lucroLiquido,
    }];

    const sheetName = `DRE_${dre.ano}`;
    const wsReceitas = XLSX.utils.json_to_sheet(receitasData);
    const wsDespesas = XLSX.utils.json_to_sheet(despesasData);
    const wsFinanceiro = XLSX.utils.json_to_sheet(dadosFinanceiros);

    XLSX.utils.book_append_sheet(wb, wsReceitas, `${sheetName}_Receitas`);
    XLSX.utils.book_append_sheet(wb, wsDespesas, `${sheetName}_Despesas`);
    XLSX.utils.book_append_sheet(wb, wsFinanceiro, `${sheetName}_Financeiro`);
  });

  XLSX.writeFile(wb, 'relatorio_valor_dre_completo.xlsx');
};

export const exportToCSV = (valuationData: ResultData, dreAnualList: DreAnual[]) => {
  const rows: string[] = [];

  rows.push('Valor Presente Líquido, Valor Terminal, Valuation Total');
  rows.push(`${valuationData.valorPresenteLiquido}, ${valuationData.valorTerminal}, ${valuationData.valuationTotal}`);

  dreAnualList.forEach(dre => {
    rows.push(`Ano: ${dre.ano}`);
    rows.push('Receitas:');
    rows.push('Modelo Receita, Tipo Receita, Descrição Receita, Receita Bruta Total');

    dre.receitas.forEach(receita => {
      rows.push(`${receita.modeloReceita}, ${receita.tipoReceita}, ${receita.descricao}, ${receita.receitaBrutaTotal}`);
    });

    rows.push('Despesas:');
    rows.push('Descrição Despesa, Tipo Despesa, Valor Despesa, CMV');

    dre.despesas.forEach(despesa => {
      rows.push(`${despesa.descricao}, ${despesa.tipoDespesa}, ${despesa.valor}, ${despesa.cmv}`);
    });

    rows.push('Dados Financeiros:');
    rows.push('Receita Líquida, EBITDA, Lucro Líquido');
    rows.push(`${dre.receitaLiquida}, ${dre.ebitda}, ${dre.lucroLiquido}`);
  });

  const csvContent = rows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, 'relatorio_valor_dre_completo.csv');
};
