export type ResultData = {
    valorPresenteLiquido: number;
    valorTerminal: number;
    valuationTotal: number;
  };
  
  export type Receita = {
    descricao: string;
    modeloReceita: string;
    tipoReceita: string;
    receitaBrutaTotal: number;
  };
  
  export type Despesa = {
    descricao: string;
    tipoDespesa: string;
    valor: number;
    cmv: number;
  };
  
  export type DreAnual = {
    ano: number;
    receitas: Receita[];
    despesas: Despesa[];
    receitaLiquida: number;
    ebitda: number;
    lucroLiquido: number;
  };
  