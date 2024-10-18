import { Box, VStack, Input, Text, Heading, Button, Icon, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CadProd = () => {
    const navigate = useNavigate();

    // Estados para armazenar os valores dos campos do formulário
    const [nomeProduto, setNomeProduto] = useState('');
    const [custoProducao, setCustoProducao] = useState('');
    const [valorVenda, setValorVenda] = useState('');
    const [mediaProducao, setMediaProducao] = useState('');
    const [metaLucro, setMetaLucro] = useState('');

    // Estado para armazenar os produtos cadastrados
    const [produtos, setProdutos] = useState<Array<{
        nomeProduto: string;
        custoProducao: string;
        valorVenda: string;
        mediaProducao: string;
        metaLucro: string;
    }>>([]);

    // Função de submissão do formulário
    const handleSubmit = () => {
        const novoProduto: {
            nomeProduto: string;
            custoProducao: string;
            valorVenda: string;
            mediaProducao: string;
            metaLucro: string;
        } = {
            nomeProduto,
            custoProducao,
            valorVenda,
            mediaProducao,
            metaLucro,
        };

        // Adiciona o novo produto à lista de produtos
        setProdutos([...produtos, novoProduto]);

        // Limpa os campos após a adição
        setNomeProduto('');
        setCustoProducao('');
        setValorVenda('');
        setMediaProducao('');
        setMetaLucro('');
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
                            placeholder="Informe o valor de venda do produto"
                            value={valorVenda}
                            onChange={(e) => setValorVenda(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Informe a média de produção"
                            value={mediaProducao}
                            onChange={(e) => setMediaProducao(e.target.value)}
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
                                    <Text><strong>Valor de Venda:</strong> R$ {produto.valorVenda}</Text>
                                    <Text><strong>Média de Produção:</strong> {produto.mediaProducao} horas</Text>
                                    <Text><strong>Meta de Lucro:</strong> R$ {produto.metaLucro}</Text>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default CadProd;