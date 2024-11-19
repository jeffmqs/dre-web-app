import { Box, Button, VStack, Text } from "@chakra-ui/react";

interface Servico {
  nomeServico: string;
  custoExecucao: string;
  valorCobrado: string;
  tempoMedioExecucao: string;
  metaLucro: string;
}

interface ListaServicosProps {
  servicos: Servico[];
  handleEnviar: () => void;
}

const ListaServicos = ({ servicos, handleEnviar }: ListaServicosProps) => {
  return (
    <Box width="100%" bg="white" p={6} borderRadius="md" boxShadow="md">
      <Text fontSize="lg" color="black" fontWeight="medium" textAlign="center" mb={6}>
        Serviços Cadastrados:
      </Text>

      {servicos.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          Nenhum serviço cadastrado.
        </Text>
      ) : (
        <VStack spacing={4}>
          {servicos.map((servico, index) => (
            <Box key={index} p={4} bg="gray.100" borderRadius="md" width="100%" boxShadow="sm">
              <Text><strong>Serviço:</strong> {servico.nomeServico}</Text>
              <Text><strong>Custo de Execução:</strong> R$ {servico.custoExecucao}</Text>
              <Text><strong>Valor Cobrado:</strong> R$ {servico.valorCobrado}</Text>
              <Text><strong>Tempo Médio de Execução:</strong> {servico.tempoMedioExecucao}</Text>
              <Text><strong>Meta de Lucro:</strong> R$ {servico.metaLucro}</Text>
            </Box>
          ))}
        </VStack>
      )}

      {servicos.length > 0 && (
        <Button
          mt={6}
          bg="black"
          color="white"
          _hover={{ bg: "#333" }}
          size="lg"
          width="100%"
          onClick={handleEnviar}
        >
          Enviar
        </Button>
      )}
    </Box>
  );
};

export default ListaServicos;
