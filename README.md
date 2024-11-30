# Demonstração do Resultado do Exercício (DRE) - Frontend

1. Introdução
2. Instalação
3. Configuração do .env
4. Funcionalidades
5. Chamadas ao Backend
6. Arquivos Excel e CSV
7. Tecnologias Utilizadas
8. Como Funciona o Sistema


## Introdução
Este projeto é a interface frontend para a API de Demonstração do Resultado do Exercício (DRE). Ele permite que os usuários interajam com os cálculos financeiros de forma intuitiva, incluindo a projeção de receitas, despesas, EBITDA, impostos e valuation da empresa.

O backend deste projeto pode ser encontrado em:  
[Backend DRE API](https://github.com/Cauasebastian/DRE-Backend)

## Instalação
1. **Navegue para o diretório do backend**:
   ```bash
   cd /caminho/para/o/diretorio/que/contem/o/package.json
   ```
 2. Configure um arquivo .env para:
- Configurar a conexão com o backend instalado no link acima.
  Exemplo:
  ```bash
   VITE_API_BASE_URL=http://localhost:8080
    VITE_SERVER_PORT=5173
  ```
1. **Instale as dependências:**:
    ```bash
    npm install
    ```
2. **Execute o aplicativo Vite**:
    ```bash
    npm run dev
    ```
3. **O FrontEnd estará disponível em**:
    ```
    http://localhost:5172
    ```
## Funcionalidades

- Cadastro de Dados Financeiros: Permite adicionar receitas, despesas e parâmetros para cálculos de DRE.
- Visualização dos Resultados: Apresenta os cálculos de receitas líquidas, EBITDA, impostos e lucros líquidos.
- Projeções de Valuation: Exibe o valuation baseado em projeções financeiras.
- Conexão Direta com o Backend: Os dados são processados pela API do backend em tempo real.

## Chamadas ao Backend
O frontend se comunica diretamente com os seguintes endpoints do backend:

1. POST /api/dre/calcular:

Envia os dados financeiros fornecidos pelo usuário para calcular a DRE.

2. POST /api/dre/valuation:

Utiliza os mesmos dados para projetar o valuation da empresa.


## Arquivos Excel e CSV

Os exemplos dos arquivos excel e CSV que podem ser inputados nos formularios estão na pasta **exemplos** assim como os prompts para gerar esses arquivos 

## Tecnologias Utilizadas

- Vite : Biblioteca JavaScript para construção de interfaces de usuário.
- Axios: Cliente HTTP para integração com o backend.
- Chackra-UI : Para estilização e responsividade.
- React Router: Gerenciamento de rotas e navegação.
# Como funciona o sistema

### Variáveis Gerais que Compõem uma DRE

Uma DRE é composta por variáveis que representam receitas, despesas e cálculos intermediários para determinar resultados financeiros, como EBITDA e lucro líquido. No seu modelo, as variáveis principais são:

1. **Receitas:**
- receitaBrutaTotal: soma de todas as receitas brutas (consultorias, assinaturas, etc.).
- comissoes: custos variáveis baseados em vendas ou contratos.
- ticketMedio: valor médio por cliente.
- investimentoMkt: investimento em marketing para aquisição de clientes.

2. **Despesas:**
- cmv (Custo das Mercadorias Vendidas): despesas diretamente relacionadas à produção/venda.
- despesasOperacionais: custos indiretos como aluguel, marketing fixo e folha de pagamento.
- depreciacao: desvalorização de bens ao longo do tempo.
- taxaImposto: percentual de impostos aplicáveis sobre o lucro.

3. **Resultados Intermediários:**
- receitaLiquida: receita bruta menos CMV e comissões.
- ebitda: lucro operacional antes de juros, impostos, depreciação e amortização.
- lucroLiquido: resultado final após impostos e depreciação.

### Variáveis que Podem Ficar Zeradas Sem Impactar nos Cálculos

1. **Receitas:**
- comissoes: se zerado, implica ausência de custos variáveis associados a vendas.
investimentoMkt: se zerado, não haverá custo com marketing.
2. **Despesas:**
- depreciacao: se zerado, indica ausência de bens depreciáveis.
cmv: em alguns modelos, pode ser irrelevante (ex.: serviços intangíveis).
3. **Resultados Intermediários:**
- Valores calculados como receitaLiquida, ebitda, e lucroLiquido não podem ser zerados diretamente, pois dependem de receitas e despesas.

### Campos Dependentes de Variáveis Imputadas

Estes campos são dependentes e calculados a partir de outros valores. Em TypeScript, seria ideal representá-los como "campos derivados", protegendo-os contra entrada direta. Exemplos:

- **receitaBrutaTotal:** calculado como a soma das receitas brutas individuais (ex.: consultorias, assinaturas).
Depende de ticketMedio, consultorias, e outros campos específicos em Receita.
- **receitaLiquida:** calculado como:
 ```bash
   receitaLiquida = receitaBrutaTotal - cmv - comissoes;
   ```
- **despesasOperacionais:** soma de todas as despesas categorizadas como operacionais.
  Calculado a partir de valores em Despesa.
- **ebitda:** calculado como:
   ```bash
   ebitda = receitaLiquida - despesasOperacionais;
   ```
- **impostos:** calculado como:
  ```bash
   impostos = ebitda * taxaImposto;
   ```
  - **lucroLiquido:** calculado como:
  ```bash
   impostos = ebitda * taxaImposto;
   ```
