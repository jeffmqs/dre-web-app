// src/pages/CadServico.tsx

import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    NumberInput,
    NumberInputField,
    SimpleGrid,
    Text,
    VStack,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    AccordionIcon,
    Accordion,
    AccordionButton,
    AccordionItem,
    AccordionPanel,
    useToast,
    IconButton,
} from "@chakra-ui/react";
import { FaArrowLeft, FaPlus, FaTrash, FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DespesaForm from "./DespesaForm";
import ReceitaForm from "./ReceitaForm";
import {Despesa, DreAnualRequest, Receita} from "./types/receitaDespesaTypes.ts";


import useFileHandler from "../CadServico/functions/fileHandlers";


const CadServico = () => {

    
    const navigate = useNavigate();
    const toast = useToast();

    // Definir chave para localStorage
    const STORAGE_KEY = "dreAnualRequests";

    // Estado para armazenar todos os anos com suas respectivas receitas e despesas
    const [dreAnualRequests, setDreAnualRequests] = useState<DreAnualRequest[]>([]);

    const { handleImportCSV } = useFileHandler(dreAnualRequests, setDreAnualRequests);

    // Estados para adicionar um novo ano
    const [novoAno, setNovoAno] = useState("");
    const [cmv, setCmv] = useState("");
    const [depreciacao, setDepreciacao] = useState("");
    const [taxaImposto, setTaxaImposto] = useState("");

    // Estado para controlar a exibição do botão de prosseguir
    const [isSaved, setIsSaved] = useState(false);

    // Carregar dados do localStorage ao montar o componente
    useEffect(() => {
        const storedData = localStorage.getItem(STORAGE_KEY);
        if (storedData) {
            try {
                setDreAnualRequests(JSON.parse(storedData));
            } catch (error) {
                console.error("Erro ao parsear dados do localStorage:", error);
                toast({
                    title: "Erro",
                    description: "Falha ao carregar dados salvos.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    }, [STORAGE_KEY, toast]);

    // Salvar dados no localStorage sempre que dreAnualRequests mudar
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dreAnualRequests));
    }, [dreAnualRequests, STORAGE_KEY]);

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

         // Função de importação do CSV

        setDreAnualRequests([...dreAnualRequests, novoDreAnual]);

        // Limpa os campos após adicionar
        setNovoAno("");
        setCmv("");
        setDepreciacao("");
        setTaxaImposto("");

        toast({
            title: "Sucesso",
            description: "Ano adicionado com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };


    // Função para remover um ano
    const handleRemoveAno = (ano: number) => {
        setDreAnualRequests(dreAnualRequests.filter((item) => item.ano !== ano));
        toast({
            title: "Sucesso",
            description: `Ano ${ano} removido com sucesso!`,
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
        toast({
            title: "Sucesso",
            description: "Receita adicionada com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
        toast({
            title: "Sucesso",
            description: "Receita removida com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
        toast({
            title: "Sucesso",
            description: "Despesa adicionada com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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
        toast({
            title: "Sucesso",
            description: "Despesa removida com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    // Função para salvar os dados no localStorage
    const handleSalvar = () => {
        // Verifica se há dados para salvar
        if (dreAnualRequests.length === 0) {
            toast({
                title: "Erro",
                description: "Nenhum dado para salvar.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Opicional: Adicionar validações adicionais, se necessário

        // Dados já estão sendo salvos automaticamente via useEffect
        // Apenas fornecemos um feedback ao usuário
        toast({
            title: "Sucesso",
            description: "Dados salvos no localStorage com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });

        // Atualiza o estado para exibir o botão de prosseguir
        setIsSaved(true);
    };
    // Função para ir para o cálculo de valuation
    const handleProsseguir = () => {
        navigate("/FinancialData"); // Atualize a rota conforme necessário
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
                                <NumberInputField placeholder="Ano (e.g., 2021)" bg="white"/>
                            </NumberInput>
                        </FormControl>

                        {/* Campo CMV com Popover */}
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                CMV (R$)
                                <Popover placement='right' closeOnBlur={true} trigger="hover">
                                    <PopoverTrigger>
                                    <IconButton size='sm' icon={<FaInfoCircle />} aria-label={""}
                                    color="gray.500"
                                    ml={2}
                                    boxSize="16px"
                                    cursor="pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>CMV (Custo das Mercadorias Vendidas)</PopoverHeader>
                                        <PopoverBody>
                                            CMV representa o custo de produção ou aquisição das mercadorias ou serviços vendidos pela empresa.
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </FormLabel>
                            <NumberInput
                                min={0}
                                value={cmv}
                                onChange={(valueString) => setCmv(valueString)}
                            >
                                <NumberInputField placeholder="Custo das Mercadorias Vendidas" bg="white"  />
                            </NumberInput>
                        </FormControl>

                        {/* Campo Depreciação com Popover */}
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                Depreciação (R$)
                                <Popover placement='right' closeOnBlur={true} trigger="hover">
                                    <PopoverTrigger>
                                    <IconButton size='sm' icon={<FaInfoCircle />} aria-label={""}
                                    color="gray.500"
                                    ml={2}
                                    boxSize="16px"
                                    cursor="pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Depreciação</PopoverHeader>
                                        <PopoverBody>
                                            Depreciação é um recurso contábil que representa a perda produtiva de um equipamento, seja por desgaste ou ação do tempo.
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </FormLabel>
                            <NumberInput
                                min={0}
                                value={depreciacao}
                                onChange={(valueString) => setDepreciacao(valueString)}
                            >
                                <NumberInputField placeholder="Depreciação" bg="white" />
                            </NumberInput>
                        </FormControl>

                        {/* Campo Taxa de Imposto com Popover */}
                        <FormControl>
                            <FormLabel display="flex" alignItems="center">
                                Taxa de Imposto (%)
                                <Popover placement='right' closeOnBlur={true} trigger="hover">
                                    <PopoverTrigger>
                                    <IconButton size='sm' icon={<FaInfoCircle />} aria-label={""}
                                    color="gray.500"
                                    ml={2}
                                    boxSize="16px"
                                    cursor="pointer" />
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow />
                                        <PopoverCloseButton />
                                        <PopoverHeader>Taxa de Imposto</PopoverHeader>
                                        <PopoverBody>
                                            A Taxa de Imposto é a porcentagem que a empresa deve pagar de impostos sobre o lucro.
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            </FormLabel>
                            <NumberInput
                                min={0}
                                max={100}
                                step={0.01}
                                value={taxaImposto}
                                onChange={(valueString) => setTaxaImposto(valueString)}
                            >
                                <NumberInputField placeholder="Taxa de Imposto" bg="white" />
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

                        <Button
                            color="black"
                            bg="#C6FF06"
                            _hover={{ bg: "#b8f306" }}
                            variant="solid"
                            onClick={() => document.getElementById('csv-upload')?.click()}
                            size="lg"
                            width="100%"
                        >
                            Importar arquivo CSV
                        </Button>
                        <input
                            type="file" accept=".csv, .xlsx, .xls"
                            onChange={handleImportCSV}
                            style={{ display: "none" }} 
                            id="csv-upload"
                        />
                        
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
                            {dreAnualRequests.map((dre) => (
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
                                                    <strong>Taxa de Imposto:</strong> {dre.taxaImposto}%
                                                </Text>
                                            </HStack>

                                            <Divider />

                                            {/* Seção de Receitas */}
                                            <Box>
                                                <Heading as="h3" size="md" mb={4}>
                                                    Receitas
                                                </Heading>
                                                {/* Formulário para adicionar uma nova receita */}
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

                    {/* Botão para salvar os dados no localStorage */}
                    {dreAnualRequests.length > 0 && (
                        <Button
                            mt={6}
                            bg="black"
                            color="white"
                            _hover={{ bg: "#333" }}
                            size="lg"
                            width="100%"
                            onClick={handleSalvar}
                        >
                            Salvar Dados
                        </Button>
                    )}
                    {/* Botão para prosseguir para o cálculo de valuation, visível após salvar */}
                    {isSaved && (
                        <Button
                            mt={6}
                            bg="green.500"
                            color="white"
                            _hover={{ bg: "green.400" }}
                            size="lg"
                            width="100%"
                            onClick={handleProsseguir}
                        >
                            Prosseguir para o Cálculo de Valuation
                        </Button>
                    )}

                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default CadServico;