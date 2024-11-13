import { useState } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FinancialDataPage = () => {
    const navigate = useNavigate();

    // Estados para os dados financeiros
    const [taxaDesconto, setTaxaDesconto] = useState("");
    const [anosProjecao, setAnosProjecao] = useState("");
    const [dreAnualRequests, setDreAnualRequests] = useState([]); // Você pode inicializar com os dados existentes ou deixar vazio

    // Função para salvar os dados financeiros
    const handleSaveFinancialData = () => {
        const data = {
            taxaDesconto: parseFloat(taxaDesconto) / 100, // Converte para decimal
            anosProjecao: parseInt(anosProjecao, 10),
            dreAnualRequests: dreAnualRequests, // Aqui você deve coletar os dados reais
        };
        localStorage.setItem("financialData", JSON.stringify(data));
        navigate("/result"); // Navega para a página de resultado
    };

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
                Insira os Dados Financeiros
            </Heading>

            <VStack spacing={4} w="90%" mb={6}>
                <FormControl>
                    <FormLabel>Taxa de Desconto (%)</FormLabel>
                    <Input
                        type="number"
                        value={taxaDesconto}
                        onChange={(e) => setTaxaDesconto(e.target.value)}
                        placeholder="Ex: 10"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Anos de Projeção</FormLabel>
                    <Input
                        type="number"
                        value={anosProjecao}
                        onChange={(e) => setAnosProjecao(e.target.value)}
                        placeholder="Ex: 5"
                    />
                </FormControl>
                {/* Você pode adicionar aqui campos para inserir os dados de `dreAnualRequests` */}
            </VStack>

            <Button
                color="black"
                bg="#C6FF06"
                _hover={{ bg: "#b8f306" }}
                variant="solid"
                onClick={handleSaveFinancialData}
            >
                Calcular Valuation
            </Button>
        </Box>
    );
};

export default FinancialDataPage;
