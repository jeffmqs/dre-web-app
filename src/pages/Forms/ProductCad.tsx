import { Box, VStack, Input, Text, Heading, Button, Icon, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CadProduto = () => {
    const navigate = useNavigate();

    // Estados para armazenar os valores dos campos do formulário
    const [nomeProduto, setNomeProduto] = useState('');
    const [custoProducao, setCustoProducao] = useState('');
    const [valorVendaAtual, setValorVendaAtual] = useState('');
    const [numeroMedioProducao, setNumeroMedioProducao] = useState('');
    const [metaLucro, setMetaLucro] = useState('');

    // Estado para armazenar os produtos cadastrados
    const [produtos, setProdutos] = useState<Array<{
        nomeProduto: string;
        custoProducao: string;
        valorVendaAtual: string;
        numeroMedioProducao: string;
        metaLucro: string;
    }>>([]);

    // Função de validação dos campos
    const isFormValid = () => {
        return nomeProduto.trim() !== '' &&
               custoProducao.trim() !== '' &&
               valorVendaAtual.trim() !== '' &&
               numeroMedioProducao.trim() !== '' &&
               metaLucro.trim() !== '';
    };

    // Função de submissão do formulário
    const handleSubmit = () => {
        if (!isFormValid()) {
            alert("Por favor, preencha todos os campos antes de adicionar o produto.");
            return;
        }

        const novoProduto = {
            nomeProduto,
            custoProducao,
            valorVendaAtual,
            numeroMedioProducao,
            metaLucro,
        };

        // Adiciona o novo produto à lista de produtos
        setProdutos([...produtos, novoProduto]);

        // Limpa os campos após a adição
        setNomeProduto('');
        setCustoProducao('');
        setValorVendaAtual('');
        setNumeroMedioProducao('');
        setMetaLucro('');
    };

    // Função para enviar os dados cadastrados
    const handleEnviar = () => {
        // Lógica para enviar os dados cadastrados (por exemplo, salvar no banco de dados)
        console.log("Produtos enviados:", produtos);
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
                        Cadastro de produtos
                    </Text>
                </HStack>
            </Box>

            {/* Grid para organizar o layout em 2 colunas no desktop */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} width="100%" maxWidth="1200px" mt={{ base: "20%", md: "0" }}>
                {/* Box de cadastro de produtos */}
                <Box width="100%">
                    <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                        Cadastre um ou mais produtos:
                    </Heading>

                    <VStack spacing={4}>
                        <Input
                            placeholder="Informe o nome do produto"
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Informe o custo de produção do produto"
                            value={custoProducao}
                            onChange={(e) => setCustoProducao(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Informe o valor de venda atual do produto"
                            value={valorVendaAtual}
                            onChange={(e) => setValorVendaAtual(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Informe o número médio de produção"
                            value={numeroMedioProducao}
                            onChange={(e) => setNumeroMedioProducao(e.target.value)}
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

                        {/* Botão para adicionar outro produto */}
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
                            Adicionar outro produto
                        </Text>
                    </VStack>
                </Box>

                {/* Box de produtos cadastrados */}
                <Box width="100%" bg="white" p={6} borderRadius="md" boxShadow="md">
                    <Heading as="h3" size="md" textAlign="center" color="black" mb={6}>
                        Produtos Cadastrados:
                    </Heading>

                    {produtos.length === 0 ? (
                        <Text textAlign="center" color="gray.500">
                            Nenhum produto cadastrado.
                        </Text>
                    ) : (
                        <VStack spacing={4}>
                            {produtos.map((produto, index) => (
                                <Box
                                    key={index}
                                    p={4}
                                    bg="gray.100"
                                    borderRadius="md"
                                    width="100%"
                                    boxShadow="sm"
                                >
                                    <Text><strong>Produto:</strong> {produto.nomeProduto}</Text>
                                    <Text><strong>Custo de Produção:</strong> R$ {produto.custoProducao}</Text>
                                    <Text><strong>Valor de Venda Atual:</strong> R$ {produto.valorVendaAtual}</Text>
                                    <Text><strong>Número Médio de Produção:</strong> {produto.numeroMedioProducao}</Text>
                                    <Text><strong>Meta de Lucro:</strong> R$ {produto.metaLucro}</Text>
                                </Box>
                            ))}
                        </VStack>
                    )}

                    {/* Botão de Enviar: só aparece se houver produtos cadastrados */}
                    {produtos.length > 0 && (
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

export default CadProduto;
