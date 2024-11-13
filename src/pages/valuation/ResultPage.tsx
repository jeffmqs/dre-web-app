import { useEffect, useState } from "react";
import { Box, Text, Heading, VStack, Spinner } from "@chakra-ui/react";

const ResultPage = () => {
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recupera os dados do localStorage
        const financialData = localStorage.getItem("financialData");

        if (financialData) {
            const { taxaDesconto, anosProjecao, dreAnualRequests } = JSON.parse(financialData);

            // Faz a chamada à API
            fetch("http://localhost:8080/api/dre/valuation", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    dreAnualRequests: dreAnualRequests,
                    taxaDesconto: taxaDesconto,
                    anosProjecao: anosProjecao,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setResultData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Erro ao fazer a chamada à API:", error);
                    setLoading(false);
                });
        } else {
            // Se não houver dados no localStorage, mostrar mensagem
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

            <VStack spacing={4} w="90%">
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">
                        Valor Presente Líquido:
                    </Text>
                    <Text fontSize="md">R$ {resultData.valorPresenteLiquido.toFixed(2)}</Text>
                </Box>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">
                        Valor Terminal:
                    </Text>
                    <Text fontSize="md">R$ {resultData.valorTerminal.toFixed(2)}</Text>
                </Box>
                <Box p={4} borderWidth={1} borderRadius="md" w="100%">
                    <Text fontSize="lg" fontWeight="bold">
                        Valuation Total:
                    </Text>
                    <Text fontSize="md">R$ {resultData.valuationTotal.toFixed(2)}</Text>
                </Box>
            </VStack>
        </Box>
    );
};

export default ResultPage;
