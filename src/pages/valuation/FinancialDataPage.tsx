import{ useState, useEffect } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { DreAnualRequest } from "../Forms/CadServico/types/receitaDespesaTypes";

const FinancialDataPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [taxaDesconto, setTaxaDesconto] = useState("");
  const [anosProjecao, setAnosProjecao] = useState("");
  const [dreAnualRequests, setDreAnualRequests] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("dreAnualRequests");
    if (storedData) {
      setDreAnualRequests(JSON.parse(storedData));
    }
  }, []);

  const processData = (dreAnualRequests: DreAnualRequest[]) => {
    return dreAnualRequests.map((dreAnual) => {
      const receitas = dreAnual.receitas.map((receita) => {
        const comissoesValor =
          receita.comissoes <= 1
            ? receita.receitaBrutaTotal * receita.comissoes
            : receita.comissoes <= 100
            ? receita.receitaBrutaTotal * (receita.comissoes / 100)
            : receita.comissoes;

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
  };

  const handleSaveFinancialData = () => {
    if (!taxaDesconto || !anosProjecao) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos antes de continuar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const processedDreAnualRequests = processData(dreAnualRequests);

    const data = {
      dreAnualRequests: processedDreAnualRequests,
      taxaDesconto: parseFloat(taxaDesconto) / 100,
      anosProjecao: parseInt(anosProjecao, 10),
    };

    localStorage.setItem("financialData", JSON.stringify(data));
    navigate("/result");
  };

  const renderFieldWithPopover = (
    label: string,
    placeholder: string,
    value: string | number,
    onChange: (value: string) => void,
    explanation: string
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
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          bg="white"
          size="lg"
        />
      </FormControl>
    );
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
      p={4}
    >
      <Box
        width="100%"
        maxWidth="800px"
        bg="white"
        borderRadius="md"
        boxShadow="lg" 
        p={10} 
        textAlign="center"
      >
        <Heading as="h2" size="lg" color="black" mb={6}>
          Insira os Dados Financeiros
        </Heading>

        <VStack spacing={6}>
          {renderFieldWithPopover(
            "Taxa de Desconto (%)",
            "Ex: 10",
            taxaDesconto,
            setTaxaDesconto,
            "A taxa de desconto é a taxa usada para calcular o valor presente dos fluxos de caixa futuros."
          )}
          {renderFieldWithPopover(
            "Anos de Projeção",
            "Ex: 7",
            anosProjecao,
            setAnosProjecao,
            "Número de anos para os quais os fluxos de caixa serão projetados."
          )}
        </VStack>

        <Button
          mt={8} 
          width="100%"
          color="black"
          bg="#C6FF06"
          _hover={{ bg: "#b8f306" }}
          variant="solid"
          onClick={handleSaveFinancialData}
        >
          Calcular Valuation
        </Button>
      </Box>
    </Box>
  );
};

export default FinancialDataPage;
