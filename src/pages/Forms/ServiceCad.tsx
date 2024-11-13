// src/pages/CadServico.tsx

import React, { useState } from "react";
import {
    Box,
    VStack,
    Input,
    Text,
    Heading,
    Button,
    Icon,
    HStack,
    SimpleGrid,
    Select,
    FormLabel,
    FormControl,
    NumberInput,
    NumberInputField,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Divider,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Receita {
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

interface Despesa {
    descricao: string; // Ex.: AWS, SG&A, Vendedores
    tipoDespesa: string; // Ex.: Fixa, Variável
    valor: number; // Valor da Despesa
    comissoes: number; // Comissões (ex: 5%)
    cmv: number; // Custo das Mercadorias Vendidas
}

interface DreAnualRequest {
    ano: number;
    receitas: Receita[];
    despesas: Despesa[];
    cmv: number;
    depreciacao: number;
    taxaImposto: number;
}

const CadServico = () => {
    const navigate = useNavigate();
    const toast = useToast();

    // Estado para armazenar todos os anos com suas respectivas receitas e despesas
    const [dreAnualRequests, setDreAnualRequests] = useState<DreAnualRequest[]>([]);

    // Estados para adicionar um novo ano
    const [novoAno, setNovoAno] = useState("");
    const [cmv, setCmv] = useState("");
    const [depreciacao, setDepreciacao] = useState("");
    const [taxaImposto, setTaxaImposto] = useState("");

    // Função para adicionar um novo ano
    const handleAddAno = () => {
        if (
            novoAno.trim() === "" ||
            cmv.trim() === "" ||
            depreciacao.trim() === "" ||
            taxaImposto.trim() === ""
        ) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos do ano.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const anoNumero = parseInt(novoAno, 10);
        if (isNaN(anoNumero) || anoNumero < 1900 || anoNumero > 2100) {
            toast({
                title: "Erro",
                description: "Por favor, insira um ano válido.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Verifica se o ano já foi adicionado
        if (dreAnualRequests.some((item) => item.ano === anoNumero)) {
            toast({
                title: "Erro",
                description: "Este ano já foi adicionado.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const novoDreAnual: DreAnualRequest = {
            ano: anoNumero,
            receitas: [],
            despesas: [],
            cmv: parseFloat(cmv),
            depreciacao: parseFloat(depreciacao),
            taxaImposto: parseFloat(taxaImposto),
        };

        setDreAnualRequests([...dreAnualRequests, novoDreAnual]);

        // Limpa os campos após adicionar
        setNovoAno("");
        setCmv("");
        setDepreciacao("");
        setTaxaImposto("");
    };

    // Função para remover um ano
    const handleRemoveAno = (ano: number) => {
        setDreAnualRequests(dreAnualRequests.filter((item) => item.ano !== ano));
    };

    // Função para adicionar uma receita a um ano específico
    const handleAddReceita = (ano: number, receita: Receita) => {
        setDreAnualRequests(
            dreAnualRequests.map((item) =>
                item.ano === ano
                    ? { ...item, receitas: [...item.receitas, receita] }
                    : item
            )
        );
    };

    // Função para remover uma receita de um ano específico
    const handleRemoveReceita = (ano: number, index: number) => {
        setDreAnualRequests(
            dreAnualRequests.map((item) =>
                item.ano === ano
                    ? {
                        ...item,
                        receitas: item.receitas.filter((_, i) => i !== index),
                    }
                    : item
            )
        );
    };

    // Função para adicionar uma despesa a um ano específico
    const handleAddDespesa = (ano: number, despesa: Despesa) => {
        setDreAnualRequests(
            dreAnualRequests.map((item) =>
                item.ano === ano
                    ? { ...item, despesas: [...item.despesas, despesa] }
                    : item
            )
        );
    };

    // Função para remover uma despesa de um ano específico
    const handleRemoveDespesa = (ano: number, index: number) => {
        setDreAnualRequests(
            dreAnualRequests.map((item) =>
                item.ano === ano
                    ? {
                        ...item,
                        despesas: item.despesas.filter((_, i) => i !== index),
                    }
                    : item
            )
        );
    };

    // Função para enviar os dados ao backend
    const handleEnviar = () => {
        if (dreAnualRequests.length === 0) {
            toast({
                title: "Erro",
                description: "Nenhum ano adicionado para envio.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Verifica se cada ano possui receitas e despesas
        for (const dre of dreAnualRequests) {
            if (dre.receitas.length === 0 && dre.despesas.length === 0) {
                toast({
                    title: "Erro",
                    description: `O ano ${dre.ano} deve ter pelo menos uma receita ou despesa.`,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }
        }

        // Prepara o request conforme a estrutura DreAnualRequest
        const dataToSend = {
            taxaDesconto: 0.1, // Este valor pode ser obtido de outro local ou formulário
            anosProjecao: 7, // Este valor pode ser obtido de outro local ou formulário
            dreAnualRequests,
        };

        fetch("http://localhost:8080/api/dre/valuation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na resposta da API");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Dados enviados com sucesso:", data);
                toast({
                    title: "Sucesso",
                    description: "Dados enviados com sucesso!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                // Limpa os dados após o envio
                setDreAnualRequests([]);
                navigate("/financialData");
            })
            .catch((error) => {
                console.error("Erro ao enviar dados:", error);
                toast({
                    title: "Erro",
                    description: "Erro ao enviar dados. Veja o console para mais detalhes.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems={{ base: "flex-start", md: "center" }}
            bg="gray.50"
            p={4}
            position="relative"
        >
            {/* Botão de voltar */}
            <Box
                position="absolute"
                top="5%"
                left="5%"
                cursor="pointer"
                onClick={() => navigate("/menu")}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Voltar ao Menu
                    </Text>
                </HStack>
            </Box>

            {/* Grid para organizar o layout em 2 colunas no desktop */}
            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={10}
                width="100%"
                maxWidth="1200px"
                mt={{ base: "20%", md: "0" }}
            >
                {/* Box para adicionar novos anos */}
                <Box width="100%">
                    <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                        Adicionar Ano
                    </Heading>

                    <VStack spacing={4}>
                        <FormControl>
                            <FormLabel>Ano</FormLabel>
                            <NumberInput
                                min={1900}
                                max={2100}
                                value={novoAno}
                                onChange={(valueString) => setNovoAno(valueString)}
                            >
                                <NumberInputField placeholder="Ano (e.g., 2021)" bg="white" size="lg" />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>CMV (R$)</FormLabel>
                            <NumberInput
                                min={0}
                                value={cmv}
                                onChange={(valueString) => setCmv(valueString)}
                            >
                                <NumberInputField placeholder="Custo das Mercadorias Vendidas" bg="white" size="lg" />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Depreciação (R$)</FormLabel>
                            <NumberInput
                                min={0}
                                value={depreciacao}
                                onChange={(valueString) => setDepreciacao(valueString)}
                            >
                                <NumberInputField placeholder="Depreciação" bg="white" size="lg" />
                            </NumberInput>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Taxa de Imposto (%)</FormLabel>
                            <NumberInput
                                min={0}
                                max={100}
                                step={0.01}
                                value={taxaImposto}
                                onChange={(valueString) => setTaxaImposto(valueString)}
                            >
                                <NumberInputField placeholder="Taxa de Imposto" bg="white" size="lg" />
                            </NumberInput>
                        </FormControl>

                        <Button
                            leftIcon={<FaPlus />}
                            color="black"
                            bg="#C6FF06"
                            _hover={{ bg: "#b8f306" }}
                            variant="solid"
                            onClick={handleAddAno}
                            size="lg"
                            width="100%"
                        >
                            Adicionar Ano
                        </Button>
                    </VStack>
                </Box>

                {/* Box para listar e gerenciar anos adicionados */}
                <Box width="100%">
                    <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                        Anos Adicionados
                    </Heading>

                    {dreAnualRequests.length === 0 ? (
                        <Text textAlign="center" color="gray.500">
                            Nenhum ano adicionado.
                        </Text>
                    ) : (
                        <Accordion allowMultiple>
                            {dreAnualRequests.map((dre, index) => (
                                <AccordionItem key={dre.ano} border="1px solid" borderColor="gray.200" borderRadius="md" mb={4}>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left">
                                                Ano: {dre.ano}
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        <VStack spacing={4} align="stretch">
                                            {/* Campos CMV, Depreciação e Taxa de Imposto (já inseridos ao adicionar o ano) */}
                                            <HStack justifyContent="space-between">
                                                <Text>
                                                    <strong>CMV:</strong> R$ {dre.cmv.toFixed(2)}
                                                </Text>
                                                <Text>
                                                    <strong>Depreciação:</strong> R$ {dre.depreciacao.toFixed(2)}
                                                </Text>
                                                <Text>
                                                    <strong>Taxa de Imposto:</strong> {dre.taxaImposto * 100}%
                                                </Text>
                                            </HStack>

                                            <Divider />

                                            {/* Seção de Receitas */}
                                            <Box>
                                                <Heading as="h3" size="md" mb={4}>
                                                    Receitas
                                                </Heading>
                                                <ReceitaForm ano={dre.ano} onAddReceita={handleAddReceita} />
                                                {dre.receitas.length === 0 ? (
                                                    <Text color="gray.500">Nenhuma receita adicionada.</Text>
                                                ) : (
                                                    <VStack spacing={2} align="stretch" mt={4}>
                                                        {dre.receitas.map((receita, idx) => (
                                                            <Box key={idx} p={4} bg="gray.100" borderRadius="md" position="relative">
                                                                <Button
                                                                    size="sm"
                                                                    colorScheme="red"
                                                                    position="absolute"
                                                                    top="4px"
                                                                    right="4px"
                                                                    onClick={() => handleRemoveReceita(dre.ano, idx)}
                                                                >
                                                                    <FaTrash />
                                                                </Button>
                                                                <Text>
                                                                    <strong>Modelo Receita:</strong> {receita.modeloReceita}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Tipo Receita:</strong> {receita.tipoReceita}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Descrição:</strong> {receita.descricao}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Ticket Médio:</strong> R$ {receita.ticketMedio.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>CAC:</strong> R$ {receita.cac.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Investimento em Marketing:</strong> R$ {receita.investimentoMkt.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Conversão Inbound:</strong> {receita.conversaoInbound}%
                                                                </Text>
                                                                <Text>
                                                                    <strong>Vendas Inbound:</strong> {receita.vendasInbound}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Clientes Totais:</strong> {receita.clientesTotais}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Cancelamento:</strong> {receita.cancelamento}%
                                                                </Text>
                                                                <Text>
                                                                    <strong>Consultorias:</strong> {receita.consultorias}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Ticket Médio Consultorias:</strong> R$ {receita.ticketMedioConsultorias.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Receita Bruta Total:</strong> R$ {receita.receitaBrutaTotal.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Comissões:</strong> {receita.comissoes}%
                                                                </Text>
                                                            </Box>
                                                        ))}
                                                    </VStack>
                                                )}
                                            </Box>

                                            <Divider />

                                            {/* Seção de Despesas */}
                                            <Box>
                                                <Heading as="h3" size="md" mb={4}>
                                                    Despesas
                                                </Heading>
                                                <DespesaForm ano={dre.ano} onAddDespesa={handleAddDespesa} />
                                                {dre.despesas.length === 0 ? (
                                                    <Text color="gray.500">Nenhuma despesa adicionada.</Text>
                                                ) : (
                                                    <VStack spacing={2} align="stretch" mt={4}>
                                                        {dre.despesas.map((despesa, idx) => (
                                                            <Box key={idx} p={4} bg="gray.100" borderRadius="md" position="relative">
                                                                <Button
                                                                    size="sm"
                                                                    colorScheme="red"
                                                                    position="absolute"
                                                                    top="4px"
                                                                    right="4px"
                                                                    onClick={() => handleRemoveDespesa(dre.ano, idx)}
                                                                >
                                                                    <FaTrash />
                                                                </Button>
                                                                <Text>
                                                                    <strong>Descrição:</strong> {despesa.descricao}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Tipo Despesa:</strong> {despesa.tipoDespesa}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Valor:</strong> R$ {despesa.valor.toFixed(2)}
                                                                </Text>
                                                                <Text>
                                                                    <strong>Comissões:</strong> {despesa.comissoes}%
                                                                </Text>
                                                                <Text>
                                                                    <strong>CMV:</strong> R$ {despesa.cmv.toFixed(2)}
                                                                </Text>
                                                            </Box>
                                                        ))}
                                                    </VStack>
                                                )}
                                            </Box>

                                            <Divider />

                                            {/* Botão para remover o ano */}
                                            <Button
                                                leftIcon={<FaTrash />}
                                                colorScheme="red"
                                                variant="outline"
                                                onClick={() => handleRemoveAno(dre.ano)}
                                                size="sm"
                                            >
                                                Remover Ano
                                            </Button>
                                        </VStack>
                                    </AccordionPanel>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}

                    {/* Botão para enviar os dados */}
                    {dreAnualRequests.length > 0 && (
                        <Button
                            mt={6}
                            bg="black"
                            color="white"
                            _hover={{ bg: "#333" }}
                            size="lg"
                            width="100%"
                            onClick={handleEnviar}
                        >
                            Enviar Itens
                        </Button>
                    )}
                </Box>
            </SimpleGrid>
        </Box>
    );
};

// Componente para adicionar Receita
interface ReceitaFormProps {
    ano: number;
    onAddReceita: (ano: number, receita: Receita) => void;
}

const ReceitaForm: React.FC<ReceitaFormProps> = ({ ano, onAddReceita }) => {
    const [modeloReceita, setModeloReceita] = useState("");
    const [tipoReceita, setTipoReceita] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ticketMedio, setTicketMedio] = useState("");
    const [cac, setCac] = useState("");
    const [investimentoMkt, setInvestimentoMkt] = useState("");
    const [conversaoInbound, setConversaoInbound] = useState("");
    const [vendasInbound, setVendasInbound] = useState("");
    const [clientesTotais, setClientesTotais] = useState("");
    const [cancelamento, setCancelamento] = useState("");
    const [consultorias, setConsultorias] = useState("");
    const [ticketMedioConsultorias, setTicketMedioConsultorias] = useState("");
    const [receitaBrutaTotal, setReceitaBrutaTotal] = useState("");
    const [comissoes, setComissoes] = useState("");

    const toast = useToast();

    const handleAdd = () => {
        // Validação dos campos
        if (
            modeloReceita.trim() === "" ||
            tipoReceita.trim() === "" ||
            descricao.trim() === "" ||
            ticketMedio.trim() === "" ||
            cac.trim() === "" ||
            investimentoMkt.trim() === "" ||
            conversaoInbound.trim() === "" ||
            vendasInbound.trim() === "" ||
            clientesTotais.trim() === "" ||
            cancelamento.trim() === "" ||
            consultorias.trim() === "" ||
            ticketMedioConsultorias.trim() === "" ||
            receitaBrutaTotal.trim() === "" ||
            comissoes.trim() === ""
        ) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos da receita.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const receita: Receita = {
            modeloReceita,
            tipoReceita,
            descricao,
            ticketMedio: parseFloat(ticketMedio),
            cac: parseFloat(cac),
            investimentoMkt: parseFloat(investimentoMkt),
            conversaoInbound: parseFloat(conversaoInbound),
            vendasInbound: parseInt(vendasInbound, 10),
            clientesTotais: parseInt(clientesTotais, 10),
            cancelamento: parseFloat(cancelamento),
            consultorias: parseInt(consultorias, 10),
            ticketMedioConsultorias: parseFloat(ticketMedioConsultorias),
            receitaBrutaTotal: parseFloat(receitaBrutaTotal),
            comissoes: parseFloat(comissoes),
        };

        onAddReceita(ano, receita);

        // Limpa os campos após adicionar
        setModeloReceita("");
        setTipoReceita("");
        setDescricao("");
        setTicketMedio("");
        setCac("");
        setInvestimentoMkt("");
        setConversaoInbound("");
        setVendasInbound("");
        setClientesTotais("");
        setCancelamento("");
        setConsultorias("");
        setTicketMedioConsultorias("");
        setReceitaBrutaTotal("");
        setComissoes("");
    };

    return (
        <VStack spacing={4} align="stretch">
            <FormControl>
                <FormLabel>Modelo Receita</FormLabel>
                <Input
                    placeholder="Ex.: SaaS, Consultoria"
                    value={modeloReceita}
                    onChange={(e) => setModeloReceita(e.target.value)}
                    bg="white"
                    size="lg"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Tipo Receita</FormLabel>
                <Input
                    placeholder="Ex.: Inbound, Outbound"
                    value={tipoReceita}
                    onChange={(e) => setTipoReceita(e.target.value)}
                    bg="white"
                    size="lg"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                    placeholder="Descrição da receita"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    bg="white"
                    size="lg"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Ticket Médio (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={ticketMedio}
                    onChange={(valueString) => setTicketMedio(valueString)}
                >
                    <NumberInputField placeholder="Valor médio por cliente" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>CAC (R$)</FormLabel>
                <NumberInput min={0} value={cac} onChange={(valueString) => setCac(valueString)}>
                    <NumberInputField placeholder="Custo de Aquisição de Cliente" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Investimento em Marketing (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={investimentoMkt}
                    onChange={(valueString) => setInvestimentoMkt(valueString)}
                >
                    <NumberInputField placeholder="Investimento em Marketing" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Conversão Inbound (%)</FormLabel>
                <NumberInput
                    min={0}
                    max={100}
                    step={0.01}
                    value={conversaoInbound}
                    onChange={(valueString) => setConversaoInbound(valueString)}
                >
                    <NumberInputField placeholder="Taxa de Conversão Inbound" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Vendas Inbound</FormLabel>
                <NumberInput
                    min={0}
                    value={vendasInbound}
                    onChange={(valueString) => setVendasInbound(valueString)}
                >
                    <NumberInputField placeholder="Número de Vendas Inbound" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Clientes Totais</FormLabel>
                <NumberInput
                    min={0}
                    value={clientesTotais}
                    onChange={(valueString) => setClientesTotais(valueString)}
                >
                    <NumberInputField placeholder="Total de Clientes Ativos" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Cancelamento (%)</FormLabel>
                <NumberInput
                    min={0}
                    max={100}
                    step={0.01}
                    value={cancelamento}
                    onChange={(valueString) => setCancelamento(valueString)}
                >
                    <NumberInputField placeholder="Taxa de Cancelamento (Churn)" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Consultorias</FormLabel>
                <NumberInput
                    min={0}
                    value={consultorias}
                    onChange={(valueString) => setConsultorias(valueString)}
                >
                    <NumberInputField placeholder="Quantidade de Consultorias" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Ticket Médio Consultorias (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={ticketMedioConsultorias}
                    onChange={(valueString) => setTicketMedioConsultorias(valueString)}
                >
                    <NumberInputField
                        placeholder="Ticket Médio das Consultorias"
                        bg="white"
                        size="lg"
                    />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Receita Bruta Total (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={receitaBrutaTotal}
                    onChange={(valueString) => setReceitaBrutaTotal(valueString)}
                >
                    <NumberInputField placeholder="Receita Bruta Total" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Comissões (%)</FormLabel>
                <NumberInput
                    min={0}
                    max={100}
                    step={0.01}
                    value={comissoes}
                    onChange={(valueString) => setComissoes(valueString)}
                >
                    <NumberInputField placeholder="Comissões (ex: 5%)" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <Button
                leftIcon={<FaPlus />}
                color="black"
                bg="#C6FF06"
                _hover={{ bg: "#b8f306" }}
                variant="solid"
                onClick={handleAdd}
                size="sm"
            >
                Adicionar Receita
            </Button>
        </VStack>
    );
};

// Componente para adicionar Despesa
interface DespesaFormProps {
    ano: number;
    onAddDespesa: (ano: number, despesa: Despesa) => void;
}

const DespesaForm: React.FC<DespesaFormProps> = ({ ano, onAddDespesa }) => {
    const [descricao, setDescricao] = useState("");
    const [tipoDespesa, setTipoDespesa] = useState("");
    const [valor, setValor] = useState("");
    const [comissoes, setComissoes] = useState("");
    const [cmv, setCmv] = useState("");

    const toast = useToast();

    const handleAdd = () => {
        // Validação dos campos
        if (
            descricao.trim() === "" ||
            tipoDespesa.trim() === "" ||
            valor.trim() === "" ||
            comissoes.trim() === "" ||
            cmv.trim() === ""
        ) {
            toast({
                title: "Erro",
                description: "Por favor, preencha todos os campos da despesa.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        const despesa: Despesa = {
            descricao,
            tipoDespesa,
            valor: parseFloat(valor),
            comissoes: parseFloat(comissoes),
            cmv: parseFloat(cmv),
        };

        onAddDespesa(ano, despesa);

        // Limpa os campos após adicionar
        setDescricao("");
        setTipoDespesa("");
        setValor("");
        setComissoes("");
        setCmv("");
    };

    return (
        <VStack spacing={4} align="stretch">
            <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Input
                    placeholder="Ex.: AWS, SG&A, Vendedores"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    bg="white"
                    size="lg"
                />
            </FormControl>
            <FormControl>
                <FormLabel>Tipo Despesa</FormLabel>
                <Select
                    placeholder="Selecione o Tipo de Despesa"
                    value={tipoDespesa}
                    onChange={(e) => setTipoDespesa(e.target.value)}
                    bg="white"
                    size="lg"
                >
                    <option value="Fixa">Fixa</option>
                    <option value="Variável">Variável</option>
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel>Valor da Despesa (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={valor}
                    onChange={(valueString) => setValor(valueString)}
                >
                    <NumberInputField placeholder="Valor da Despesa" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>Comissões (%)</FormLabel>
                <NumberInput
                    min={0}
                    max={100}
                    step={0.01}
                    value={comissoes}
                    onChange={(valueString) => setComissoes(valueString)}
                >
                    <NumberInputField placeholder="Comissões (ex: 5%)" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <FormControl>
                <FormLabel>CMV (R$)</FormLabel>
                <NumberInput
                    min={0}
                    value={cmv}
                    onChange={(valueString) => setCmv(valueString)}
                >
                    <NumberInputField placeholder="Custo das Mercadorias Vendidas" bg="white" size="lg" />
                </NumberInput>
            </FormControl>
            <Button
                leftIcon={<FaPlus />}
                color="black"
                bg="#C6FF06"
                _hover={{ bg: "#b8f306" }}
                variant="solid"
                onClick={handleAdd}
                size="sm"
            >
                Adicionar Despesa
            </Button>
        </VStack>
    );
};

export default CadServico;
