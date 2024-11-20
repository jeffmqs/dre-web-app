import { useEffect, useState } from "react";
import { Box, Text, Heading, VStack, Spinner } from "@chakra-ui/react";

type ResultData = {
    valorPresenteLiquido: number;
    valorTerminal: number;
    valuationTotal: number;
};

const ResultPage = () => {
    const [resultData, setResultData] = useState<ResultData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const financialData = localStorage.getItem("financialData");

        if (financialData) {
            const { taxaDesconto, anosProjecao, dreAnualRequests } = JSON.parse(financialData);

            fetch("http://localhost:8080/api/dre/valuation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dreAnualRequests,
                    taxaDesconto,
                    anosProjecao,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data); // Verifique os dados retornados
                    setResultData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao fazer a chamada à API:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
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
                <Text>Dados não encontrados. Por favor, retorne e insira os dados.</Text>
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
                Resultado do Valuation
            </Heading>

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

            {/* Seção de resultados */}
            <VStack spacing={4} w="90%" mt={8}>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">Valor Presente Líquido:</Text>
                    <Text fontSize="md">
                        R$ {resultData.valorPresenteLiquido.toFixed(2)}
                    </Text>
                </Box>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">Valor Terminal:</Text>
                    <Text fontSize="md">
                        R$ {resultData.valorTerminal.toFixed(2)}
                    </Text>
                </Box>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">Valuation Total:</Text>
                    <Text fontSize="md">
                        R$ {resultData.valuationTotal.toFixed(2)}
                    </Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default ResultPage;

