import { useState, useEffect } from "react";
import { Box, Heading, VStack, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const FinancialDataPage = () => {
    const navigate = useNavigate();

    // Estados para os dados financeiros
    const [taxaDesconto, setTaxaDesconto] = useState("");
    const [anosProjecao, setAnosProjecao] = useState("");
    const [dreAnualRequests, setDreAnualRequests] = useState([]);

    // Ler os dados do localStorage ao montar o componente
    useEffect(() => {
        const storedData = localStorage.getItem('dreAnualRequests');
        if (storedData) {
            setDreAnualRequests(JSON.parse(storedData));
        }
    }, []);

    // Função para processar e reformatar os dados
    const processData = (dreAnualRequests) => {
        const processedData = dreAnualRequests.map((dreAnual) => {
            // Processar receitas
            const receitas = dreAnual.receitas.map((receita) => {
                // Calcular comissões (se for porcentagem)
                let comissoesValor = receita.comissoes;
                if (receita.comissoes <= 1) {
                    comissoesValor = receita.receitaBrutaTotal * receita.comissoes;
                } else if (receita.comissoes > 1 && receita.comissoes <= 100) {
                    comissoesValor = receita.receitaBrutaTotal * (receita.comissoes / 100);
                }

                return {
                    ...receita,
                    modeloReceita: receita.modeloReceita.trim(),
                    tipoReceita: receita.tipoReceita.trim(),
                    ticketMedio: parseFloat(receita.ticketMedio.toFixed(2)),
                    cac: parseFloat(receita.cac.toFixed(2)),
                    investimentoMkt: parseFloat(receita.investimentoMkt.toFixed(2)),
                    conversaoInbound: parseFloat(receita.conversaoInbound.toFixed(2)),
                    ticketMedioConsultorias: parseFloat(receita.ticketMedioConsultorias.toFixed(2)),
                    receitaBrutaTotal: parseFloat(receita.receitaBrutaTotal.toFixed(2)),
                    comissoes: parseFloat(comissoesValor.toFixed(2)),
                };
            });

            // Processar despesas
            const despesas = dreAnual.despesas.map((despesa) => ({
                ...despesa,
                descricao: despesa.descricao.trim(),
                tipoDespesa: despesa.tipoDespesa.trim(),
                valor: parseFloat(despesa.valor.toFixed(2)),
                comissoes: parseFloat(despesa.comissoes.toFixed(2)),
                cmv: parseFloat(despesa.cmv.toFixed(2)),
            }));

            return {
                ...dreAnual,
                receitas,
                despesas,
                cmv: parseFloat(dreAnual.cmv.toFixed(2)),
                depreciacao: parseFloat(dreAnual.depreciacao.toFixed(2)),
                taxaImposto: parseFloat(dreAnual.taxaImposto.toFixed(2)),
            };
        });

        return processedData;
    };

    // Função para salvar os dados financeiros
    const handleSaveFinancialData = () => {
        const processedDreAnualRequests = processData(dreAnualRequests);

        const data = {
            dreAnualRequests: processedDreAnualRequests,
            taxaDesconto: parseFloat(taxaDesconto) / 100, // Converte para decimal
            anosProjecao: parseInt(anosProjecao, 10),
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
                        placeholder="Ex: 7"
                    />
                </FormControl>
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
