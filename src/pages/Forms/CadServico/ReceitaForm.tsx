import { useState } from "react";
import { Box, Button, FormControl, FormLabel, IconButton, Input, NumberInput, NumberInputField, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, VStack, useToast } from "@chakra-ui/react";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
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
    const renderFieldWithPopover = (
        label: string,
        placeholder: string,
        value: string | number,
        onChange: (value: string) => void,
        explanation: string,
        isNumberInput?: boolean,
        numberProps?: { min?: number; max?: number; step?: number }
      ) => {
        return (
          <FormControl>
            <Box display="flex" alignItems="center">
              <FormLabel mb={0}>{label}</FormLabel>
              <Popover placement="right" closeOnBlur={true} trigger="hover">
                <PopoverTrigger>
                  <IconButton
                    size="sm"
                    icon={<FaInfoCircle />}
                    aria-label={`Informação sobre ${label}`}
                    color="gray.500"
                    ml={2}
                    boxSize="16px"
                    cursor="pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>{label}</PopoverHeader>
                  <PopoverBody>{explanation}</PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
            {isNumberInput ? (
              <NumberInput
                value={value}
                onChange={(valueString) => onChange(valueString)}
                {...numberProps}
              >
                <NumberInputField placeholder={placeholder} bg="white" />
              </NumberInput>
            ) : (
              <Input
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                bg="white"
                size="lg"
              />
            )}
          </FormControl>
        );
      };

    return (
        <VStack spacing={4} align="stretch">
          {renderFieldWithPopover(
            "Modelo Receita",
            "Ex.: SaaS, Consultoria",
            modeloReceita,
            setModeloReceita,
            "Modelo de receita descreve o tipo de negócio, como SaaS, consultoria ou vendas diretas."
          )}
          {renderFieldWithPopover(
            "Tipo Receita",
            "Ex.: Inbound, Outbound",
            tipoReceita,
            setTipoReceita,
            "O tipo de receita descreve a origem da receita, como vendas inbound (clientes entrando) ou outbound (vendas ativas)."
          )}
          {renderFieldWithPopover(
            "Descrição",
            "Descrição da receita",
            descricao,
            setDescricao,
            "Uma breve descrição detalhando a receita ou a origem dela."
          )}
          {renderFieldWithPopover(
            "Ticket Médio (R$)",
            "Valor médio por cliente",
            ticketMedio,
            setTicketMedio,
            "Ticket médio é o valor médio gasto por cliente.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "CAC (R$)",
            "Custo de Aquisição de Cliente",
            cac,
            setCac,
            "Custo de Aquisição de Cliente é quanto custa para conquistar um cliente.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Investimento em Marketing (R$)",
            "Investimento em Marketing",
            investimentoMkt,
            setInvestimentoMkt,
            "O valor gasto em campanhas de marketing para atrair clientes.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Conversão Inbound (%)",
            "Taxa de Conversão Inbound",
            conversaoInbound,
            setConversaoInbound,
            "Taxa que mede quantos clientes potenciais se tornam efetivos, vindo de ações inbound.",
            true,
            { min: 0, max: 100, step: 0.01 }
          )}
          {renderFieldWithPopover(
            "Vendas Inbound",
            "Número de Vendas Inbound",
            vendasInbound,
            setVendasInbound,
            "Número total de vendas realizadas por inbound.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Clientes Totais",
            "Total de Clientes Ativos",
            clientesTotais,
            setClientesTotais,
            "Número total de clientes ativos na empresa.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Cancelamento (%)",
            "Taxa de Cancelamento (Churn)",
            cancelamento,
            setCancelamento,
            "Taxa de cancelamento ou churn mostra quantos clientes deixam de ser ativos.",
            true,
            { min: 0, max: 100, step: 0.01 }
          )}
          {renderFieldWithPopover(
            "Consultorias",
            "Quantidade de Consultorias",
            consultorias,
            setConsultorias,
            "Número de consultorias realizadas pela empresa.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Ticket Médio Consultorias (R$)",
            "Ticket Médio das Consultorias",
            ticketMedioConsultorias,
            setTicketMedioConsultorias,
            "O valor médio recebido por consultoria realizada.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Receita Bruta Total (R$)",
            "Receita Bruta Total",
            receitaBrutaTotal,
            setReceitaBrutaTotal,
            "Receita bruta total acumulada pela empresa.",
            true,
            { min: 0 }
          )}
          {renderFieldWithPopover(
            "Comissões (%)",
            "Comissões (ex: 5%)",
            comissoes,
            setComissoes,
            "Porcentagem média paga como comissão pelas vendas.",
            true,
            { min: 0, max: 100, step: 0.01 }
          )}
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