export interface Receita {
    modeloReceita: string; // Ex.: SaaS, Consultoria
    tipoReceita: string; // Ex.: Inbound, Outbound
    descricao: string; // Descrição da receita
    ticketMedio: number; // Valor médio por cliente
    cac: number; // Custo de Aquisição de Cliente
    investimentoMkt: number; // Investimento em Marketing
    conversaoInbound: number; // Taxa de Conversão Inbound
    vendasInbound: number; // Número de Vendas Inbound
    clientesTotais: number; // Total de Clientes Ativos
    cancelamento: number; // Taxa de Cancelamento (Churn)
    consultorias: number; // Quantidade de Consultorias
    ticketMedioConsultorias: number; // Ticket Médio das Consultorias
    receitaBrutaTotal: number; // Receita Bruta Total
    comissoes: number; // Comissões (ex: 5%)
}

export interface Despesa {
    descricao: string; // Ex.: AWS, SG&A, Vendedores
    tipoDespesa: string; // Ex.: Fixa, Variável
    valor: number; // Valor da Despesa
    comissoes: number; // Comissões (ex: 5%)
    cmv: number; // Custo das Mercadorias Vendidas
}
export interface DreAnualRequest {
    ano: number;
    receitas: Receita[];
    despesas: Despesa[];
    cmv: number;
    depreciacao: number;
    taxaImposto: number;
}
