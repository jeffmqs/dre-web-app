import { Box, HStack, Icon, Text, SimpleGrid } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormularioCadastro from "./ServiceCadComponents/FormularioCadastro";
import ListaServicos from "./ServiceCadComponents/ListaServicos";

const CadServico = () => {
  const navigate = useNavigate();

  const [nomeServico, setNomeServico] = useState('');
  const [custoExecucao, setCustoExecucao] = useState('');
  const [valorCobrado, setValorCobrado] = useState('');
  const [tempoMedioExecucao, setTempoMedioExecucao] = useState('');
  const [metaLucro, setMetaLucro] = useState('');

  const [servicos, setServicos] = useState<Array<{
    nomeServico: string;
    custoExecucao: string;
    valorCobrado: string;
    tempoMedioExecucao: string;
    metaLucro: string;
  }>>([]);

  const isFormValid = () => {
    return nomeServico.trim() !== '' &&
           custoExecucao.trim() !== '' &&
           valorCobrado.trim() !== '' &&
           tempoMedioExecucao.trim() !== '' &&
           metaLucro.trim() !== '';
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      alert("Por favor, preencha todos os campos antes de adicionar o serviço.");
      return;
    }

    const novoServico = {
      nomeServico,
      custoExecucao,
      valorCobrado,
      tempoMedioExecucao,
      metaLucro,
    };

    setServicos([...servicos, novoServico]);

    setNomeServico('');
    setCustoExecucao('');
    setValorCobrado('');
    setTempoMedioExecucao('');
    setMetaLucro('');
  };

  const handleEnviar = () => {
    console.log("Serviços enviados:", servicos);
    alert("Serviços enviados com sucesso!");
    navigate("/cadEnter");
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
      <Box
        position="absolute"
        top="5%"
        left="5%"
        cursor="pointer"
        onClick={() => navigate("/formProdService")}
      >
        <HStack spacing={2}>
          <Icon as={FaArrowLeft} color="black" boxSize="20px" />
          <Text fontSize="lg" color="black" fontWeight="medium">
            Cadastro de serviços
          </Text>
        </HStack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%" maxWidth="1200px" mt={{ base: "20%", md: "0" }}>
        {/* Formulário de Cadastro de Serviços */}
        <FormularioCadastro
          nomeServico={nomeServico}
          custoExecucao={custoExecucao}
          valorCobrado={valorCobrado}
          tempoMedioExecucao={tempoMedioExecucao}
          metaLucro={metaLucro}
          setNomeServico={setNomeServico}
          setCustoExecucao={setCustoExecucao}
          setValorCobrado={setValorCobrado}
          setTempoMedioExecucao={setTempoMedioExecucao}
          setMetaLucro={setMetaLucro}
          handleSubmit={handleSubmit}
        />

        {/* Lista de Serviços Cadastrados */}
        <ListaServicos servicos={servicos} handleEnviar={handleEnviar} />
      </SimpleGrid>
    </Box>
  );
};

export default CadServico;
