import { Box, VStack, Input, Text, Heading, Button, Icon, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CadServico = () => {
    const navigate = useNavigate();

    // Estados para armazenar os valores dos campos do formulário
    const [nomeServico, setNomeServico] = useState('');
    const [custoExecucao, setCustoExecucao] = useState('');
    const [valorCobrado, setValorCobrado] = useState('');
    const [tempoMedioExecucao, setTempoMedioExecucao] = useState('');
    const [metaLucro, setMetaLucro] = useState('');

    // Estado para armazenar os serviços cadastrados
    const [servicos, setServicos] = useState<Array<{
        nomeServico: string;
        custoExecucao: string;
        valorCobrado: string;
        tempoMedioExecucao: string;
        metaLucro: string;
    }>>([]);

    // Função de validação dos campos
    const isFormValid = () => {
        return nomeServico.trim() !== '' && 
               custoExecucao.trim() !== '' && 
               valorCobrado.trim() !== '' && 
               tempoMedioExecucao.trim() !== '' && 
               metaLucro.trim() !== '';
    };

    // Função de submissão do formulário
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

        // Adiciona o novo serviço à lista de serviços
        setServicos([...servicos, novoServico]);

        // Limpa os campos após a adição
        setNomeServico('');
        setCustoExecucao('');
        setValorCobrado('');
        setTempoMedioExecucao('');
        setMetaLucro('');
    };

    // Função para enviar os dados cadastrados
    const handleEnviar = () => {
        // Aqui você pode adicionar a lógica de envio, como fazer um POST para um backend
        console.log("Serviços enviados:", servicos);
        alert("Serviços enviados com sucesso!");
        // Redireciona para a página de cadastro de serviços
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
            {/* Botão de voltar */}
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

            {/* Grid para organizar o layout em 2 colunas no desktop */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%" maxWidth="1200px" mt={{ base: "20%", md: "0" }}>
                {/* Box de cadastro de serviços */}
                <Box width="100%">
                    <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                        Cadastre um ou mais serviços:
                    </Heading>

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
                            placeholder="Informe o tempo médio de execução"
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

                        {/* Botão para adicionar outro serviço */}
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
                </Box>

                {/* Box de serviços cadastrados */}
                <Box width="100%" bg="white" p={6} borderRadius="md" boxShadow="md">
                    <Heading as="h3" size="md" textAlign="center" color="black" mb={6}>
                        Serviços Cadastrados:
                    </Heading>

                    {servicos.length === 0 ? (
                        <Text textAlign="center" color="gray.500">
                            Nenhum serviço cadastrado.
                        </Text>
                    ) : (
                        <VStack spacing={4}>
                            {servicos.map((servico, index) => (
                                <Box
                                    key={index}
                                    p={4}
                                    bg="gray.100"
                                    borderRadius="md"
                                    width="100%"
                                    boxShadow="sm"
                                >
                                    <Text><strong>Serviço:</strong> {servico.nomeServico}</Text>
                                    <Text><strong>Custo de Execução:</strong> R$ {servico.custoExecucao}</Text>
                                    <Text><strong>Valor Cobrado:</strong> R$ {servico.valorCobrado}</Text>
                                    <Text><strong>Tempo Médio de Execução:</strong> {servico.tempoMedioExecucao} horas</Text>
                                    <Text><strong>Meta de Lucro:</strong> R$ {servico.metaLucro}</Text>
                                </Box>
                            ))}
                        </VStack>
                    )}

                    {/* Botão de Enviar: só aparece se houver serviços cadastrados */}
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
            </SimpleGrid>
        </Box>
    );
};

export default CadServico;
