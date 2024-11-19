import { VStack, Input, Text, Button } from "@chakra-ui/react";

interface FormularioCadastroProps {
  nomeServico: string;
  custoExecucao: string;
  valorCobrado: string;
  tempoMedioExecucao: string;
  metaLucro: string;
  setNomeServico: (value: string) => void;
  setCustoExecucao: (value: string) => void;
  setValorCobrado: (value: string) => void;
  setTempoMedioExecucao: (value: string) => void;
  setMetaLucro: (value: string) => void;
  handleSubmit: () => void;
}

const FormularioCadastro = ({
  nomeServico,
  custoExecucao,
  valorCobrado,
  tempoMedioExecucao,
  metaLucro,
  setNomeServico,
  setCustoExecucao,
  setValorCobrado,
  setTempoMedioExecucao,
  setMetaLucro,
  handleSubmit,
}: FormularioCadastroProps) => {
  return (
    <VStack spacing={4}>
      <Input
        placeholder="Informe o nome do serviço"
        value={nomeServico}
        onChange={(e) => setNomeServico(e.target.value)}
        bg="white"
        size="lg"
      />
      <Input
        placeholder="Informe o custo de execução do serviço"
        value={custoExecucao}
        onChange={(e) => setCustoExecucao(e.target.value)}
        bg="white"
        size="lg"
      />
      <Input
        placeholder="Informe o valor cobrado pelo serviço"
        value={valorCobrado}
        onChange={(e) => setValorCobrado(e.target.value)}
        bg="white"
        size="lg"
      />
      <Input
        placeholder="Informe o tempo médio de execução do serviço"
        value={tempoMedioExecucao}
        onChange={(e) => setTempoMedioExecucao(e.target.value)}
        bg="white"
        size="lg"
      />
      <Input
        placeholder="Informe a meta de lucro"
        value={metaLucro}
        onChange={(e) => setMetaLucro(e.target.value)}
        bg="white"
        size="lg"
      />
      <Button
        color="black"
        bg="#C6FF06"
        _hover={{ bg: "#b8f306" }}
        variant="solid"
        onClick={handleSubmit}
        size="lg"
        mt={4}
      >
        +
      </Button>
      <Text fontSize="lg" color="black" fontWeight="medium">
        Adicionar outro serviço
      </Text>
    </VStack>
  );
};

export default FormularioCadastro;
