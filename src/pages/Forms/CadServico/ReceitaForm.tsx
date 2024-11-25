import { useState } from "react";
import { Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Receita } from "../CadServico/types/receitaDespesaTypes";

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

        toast({
            title: "Sucesso",
            description: "Receita adicionada com sucesso!",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
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

export default ReceitaForm;
