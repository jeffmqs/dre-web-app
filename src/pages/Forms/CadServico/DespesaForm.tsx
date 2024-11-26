import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  VStack,
  useToast,
  IconButton,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { FaPlus, FaInfoCircle } from "react-icons/fa";
import { Despesa } from "../CadServico/types/receitaDespesaTypes";

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

    toast({
      title: "Sucesso",
      description: "Despesa adicionada com sucesso!",
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
    isSelect?: boolean,
    options?: { value: string; label: string }[],
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
        ) : isSelect ? (
          <Select
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            bg="white"
            size="lg"
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
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
        "Descrição",
        "Ex.: AWS, SG&A, Vendedores",
        descricao,
        setDescricao,
        "Uma breve descrição sobre a despesa."
      )}
      {renderFieldWithPopover(
        "Tipo Despesa",
        "Selecione o Tipo de Despesa",
        tipoDespesa,
        setTipoDespesa,
        "Tipo de despesa pode ser fixa (como aluguel) ou variável (como comissões).",
        false,
        true,
        [
          { value: "Fixa", label: "Fixa" },
          { value: "Variável", label: "Variável" },
        ]
      )}
      {renderFieldWithPopover(
        "Valor da Despesa (R$)",
        "Valor da Despesa",
        valor,
        setValor,
        "Valor total da despesa registrada.",
        true,
        false,
        undefined,
        { min: 0 }
      )}
      {renderFieldWithPopover(
        "Comissões (%)",
        "Comissões (ex: 5%)",
        comissoes,
        setComissoes,
        "Porcentagem de comissão paga para vendas ou serviços.",
        true,
        false,
        undefined,
        { min: 0, max: 100, step: 0.01 }
      )}
      {renderFieldWithPopover(
        "CMV (R$)",
        "Custo das Mercadorias Vendidas",
        cmv,
        setCmv,
        "Custo das mercadorias vendidas (CMV) é o custo direto de produção dos produtos vendidos.",
        true,
        false,
        undefined,
        { min: 0 }
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
        Adicionar Despesa
      </Button>
    </VStack>
  );
};

export default DespesaForm;
