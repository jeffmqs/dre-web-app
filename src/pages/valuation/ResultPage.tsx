import { useEffect, useState } from "react";
import { Box, Text, Heading, VStack, Spinner, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";

type ResultData = {
  valorPresenteLiquido: number;
  valorTerminal: number;
  valuationTotal: number;
};

type Receita = {
  descricao: string;
  modeloReceita: string;
  tipoReceita: string;
  receitaBrutaTotal: number;
};

type Despesa = {
  descricao: string;
  tipoDespesa: string;
  valor: number;
  cmv: number;
};

type DreAnual = {
  ano: number;
  receitas: Receita[];
  despesas: Despesa[];
  receitaLiquida: number;
  ebitda: number;
  lucroLiquido: number;
};

const ResultPage = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [dreAnualList, setDreAnualList] = useState<DreAnual[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const financialData = localStorage.getItem("financialData");
      if (!financialData) {
        setError("Dados financeiros não encontrados no localStorage.");
        setLoading(false);
        return;
      }
  
      const { taxaDesconto, anosProjecao, dreAnualRequests } = JSON.parse(financialData);
  
      if (!dreAnualRequests || dreAnualRequests.length === 0) {
        setError("Os dados de DRE estão vazios ou incompletos.");
        setLoading(false);
        return;
      }
  
      const fetchValuation = fetch("http://localhost:8080/api/dre/valuation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dreAnualRequests, taxaDesconto, anosProjecao }),
      }).then((response) => {
        if (!response.ok) throw new Error(`Erro na API de Valuation: ${response.statusText}`);
        return response.json();
      });
  
      const fetchDre = fetch("http://localhost:8080/api/dre/calcular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dreAnualRequests }),
      }).then((response) => {
        if (!response.ok) throw new Error(`Erro na API de DRE: ${response.statusText}`);
        return response.json();
      });
  
      Promise.all([fetchValuation, fetchDre])
        .then(([valuationData, dreData]) => {
          setResultData(valuationData);
          setDreAnualList(dreData.dreAnualList || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar dados:", err);
          setError(`Erro ao buscar dados: ${err.message}`);
          setLoading(false);
        });
    }, []);
  
    if (loading) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="gray.50"
          p={4}
        >
          <Spinner size="xl" />
          <Text mt={4}>Carregando...</Text>
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="gray.50"
          p={4}
        >
          <Text>{error}</Text>
        </Box>
      );
    }
  
    if (!resultData) {
      return (
        <Box
          minHeight="100vh"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg="gray.50"
          p={4}
        >
          <Text>Os dados de valuation não foram encontrados.</Text>
        </Box>
      );
    }

  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <Heading as="h2" size="lg" textAlign="center" color="black" mb={6} mt={10}>
        Resultado do Valuation e DRE
      </Heading>

      {/* Seção de Valuation */}
      <VStack spacing={4} w="90%" mb={8}>
        <Box p={4} borderWidth={1} borderRadius="md" w="100%">
          <Box display="flex" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">Valor Presente Líquido:</Text>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  icon={<FaInfoCircle />}
                  aria-label="Informação sobre Valor Presente Líquido"
                  ml={2}
                  color="gray.500"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Valor Presente Líquido</PopoverHeader>
                <PopoverBody>
                  O Valor Presente Líquido (VPL) representa o valor atual de um fluxo de caixa futuro descontado por uma taxa de desconto.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Text fontSize="md">R$ {resultData.valorPresenteLiquido.toFixed(2)}</Text>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" w="100%">
          <Box display="flex" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">Valor Terminal:</Text>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  icon={<FaInfoCircle />}
                  aria-label="Informação sobre Valor Terminal"
                  ml={2}
                  color="gray.500"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Valor Terminal</PopoverHeader>
                <PopoverBody>
                  O Valor Terminal estima o valor de um negócio após o período de projeção, baseando-se no crescimento contínuo.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Text fontSize="md">R$ {resultData.valorTerminal.toFixed(2)}</Text>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" w="100%">
          <Box display="flex" alignItems="center">
            <Text fontSize="lg" fontWeight="bold">Valuation Total:</Text>
            <Popover>
              <PopoverTrigger>
                <IconButton
                  size="sm"
                  icon={<FaInfoCircle />}
                  aria-label="Informação sobre Valuation Total"
                  ml={2}
                  color="gray.500"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Valuation Total</PopoverHeader>
                <PopoverBody>
                  O Valuation Total é a soma do Valor Presente Líquido e do Valor Terminal.
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
          <Text fontSize="md">R$ {resultData.valuationTotal.toFixed(2)}</Text>
        </Box>
      </VStack>

      {/* Seção de DRE */}
      <Accordion allowMultiple w="90%" mb={8}>
        {dreAnualList.map((dre, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  Ano: {dre.ano}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <Box mb={4}>
                <Box display="flex" alignItems="center">
                  <Text fontWeight="bold">Receita Líquida:</Text>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size="sm"
                        icon={<FaInfoCircle />}
                        aria-label="Informação sobre Receita Líquida"
                        ml={2}
                        color="gray.500"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Receita Líquida</PopoverHeader>
                      <PopoverBody>
                        A Receita Líquida é o total das receitas da empresa, subtraídos impostos e devoluções.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
                <Text>R$ {dre.receitaLiquida.toFixed(2)}</Text>
              </Box>
              <Box mb={4}>
                <Box display="flex" alignItems="center">
                  <Text fontWeight="bold">EBITDA:</Text>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size="sm"
                        icon={<FaInfoCircle />}
                        aria-label="Informação sobre EBITDA"
                        ml={2}
                        color="gray.500"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>EBITDA</PopoverHeader>
                      <PopoverBody>
                        EBITDA é o lucro antes de juros, impostos, depreciação e amortização.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
                <Text>R$ {dre.ebitda.toFixed(2)}</Text>
              </Box>
              <Box mb={4}>
                <Box display="flex" alignItems="center">
                  <Text fontWeight="bold">Lucro Líquido:</Text>
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        size="sm"
                        icon={<FaInfoCircle />}
                        aria-label="Informação sobre Lucro Líquido"
                        ml={2}
                        color="gray.500"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Lucro Líquido</PopoverHeader>
                      <PopoverBody>
                        O Lucro Líquido é o resultado final, após deduzir todos os custos e despesas.
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
                <Text>R$ {dre.lucroLiquido.toFixed(2)}</Text>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
       {/* Seção de explicação */}
       <VStack spacing={6} w="90%" mb={8}>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%" bg="gray.100">
                    <Heading as="h3" size="md" textAlign="left" color="gray.700" mb={4}>
                        O que é Valuation?
                    </Heading>
                    <Text fontSize="md">
                        Valuation é o processo de determinar o valor econômico de um negócio ou ativo. Ele é
                        usado para ajudar investidores, empresas e analistas financeiros a tomar decisões
                        estratégicas, como aquisições, investimentos ou fusões. O cálculo é baseado em dados
                        financeiros, projeções futuras e outros fatores.
                    </Text>
                </Box>

                <Box p={4} borderWidth={1} borderRadius="md" w="100%" bg="gray.100">
                    <Heading as="h3" size="md" textAlign="left" color="gray.700" mb={4}>
                        O que é DRE?
                    </Heading>
                    <Text fontSize="md">
                        A Demonstração do Resultado do Exercício (DRE) é um relatório financeiro que mostra a
                        performance econômica de uma empresa em um período específico. Ele apresenta as
                        receitas, custos, despesas, e o lucro ou prejuízo, sendo essencial para entender a
                        saúde financeira da empresa.
                    </Text>
                </Box>

                <Box p={4} borderWidth={1} borderRadius="md" w="100%" bg="gray.100">
                    <Heading as="h3" size="md" textAlign="left" color="gray.700" mb={4}>
                        Como esses conceitos se conectam?
                    </Heading>
                    <Text fontSize="md">
                        O DRE fornece os dados financeiros necessários para o cálculo do valuation, permitindo
                        uma análise detalhada do desempenho histórico e projeções futuras. Essa integração é
                        fundamental para investidores e gestores.
                    </Text>
                </Box>
            </VStack>
    </Box>
  );
};

export default ResultPage;
