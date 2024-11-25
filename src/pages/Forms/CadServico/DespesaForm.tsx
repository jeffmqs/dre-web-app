import { useState } from "react";
import { Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, Select, VStack, useToast } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Despesa } from "../../types/receitaDespesaTypes";

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

export default DespesaForm;
