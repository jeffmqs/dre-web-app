// src/pages/CadProduto.tsx

import { Box, VStack, Input, Text, Heading, Button, Icon, HStack, SimpleGrid } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface Produto {
    nomeProduto: string;
    custoProducao: number;
    valorVendaAtual: number;
    numeroMedioProducao: number;
    metaLucro: number;
}

const CadProduto = () => {
    const navigate = useNavigate();

    // Estados para armazenar os valores dos campos do formulário
    const [nomeProduto, setNomeProduto] = useState('');
    const [custoProducao, setCustoProducao] = useState('');
    const [valorVendaAtual, setValorVendaAtual] = useState('');
    const [numeroMedioProducao, setNumeroMedioProducao] = useState('');
    const [metaLucro, setMetaLucro] = useState('');

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

        const novoProduto: Produto = {
            nomeProduto,
            custoProducao: parseFloat(custoProducao),
            valorVendaAtual: parseFloat(valorVendaAtual),
            numeroMedioProducao: parseInt(numeroMedioProducao, 10),
            metaLucro: parseFloat(metaLucro),
        };

        // Recupera os produtos existentes do localStorage
        const produtosExistentes: Produto[] = JSON.parse(localStorage.getItem("produtos") || "[]");

        // Adiciona o novo produto à lista
        const produtosAtualizados = [...produtosExistentes, novoProduto];

        // Salva a lista atualizada no localStorage
        localStorage.setItem("produtos", JSON.stringify(produtosAtualizados));

        // Limpa os campos após a adição
        setNomeProduto('');
        setCustoProducao('');
        setValorVendaAtual('');
        setNumeroMedioProducao('');
        setMetaLucro('');
    };

    // Função para enviar os dados cadastrados e prosseguir
    const handleEnviar = () => {
        // Aqui você pode adicionar a lógica de envio, como fazer um POST para um backend
        console.log("Produtos enviados:", JSON.parse(localStorage.getItem("produtos") || "[]"));
        alert("Produtos enviados com sucesso!");
        // Navega para a página de seleção ou resultados
        navigate("/financialData");
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
                onClick={() => navigate("/menu")}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Voltar ao Menu
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
                            placeholder="Nome do Produto"
                            value={nomeProduto}
                            onChange={(e) => setNomeProduto(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Custo de Produção (R$)"
                            type="number"
                            value={custoProducao}
                            onChange={(e) => setCustoProducao(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Valor de Venda Atual (R$)"
                            type="number"
                            value={valorVendaAtual}
                            onChange={(e) => setValorVendaAtual(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Número Médio de Produção"
                            type="number"
                            value={numeroMedioProducao}
                            onChange={(e) => setNumeroMedioProducao(e.target.value)}
                            bg="white"
                            size="lg"
                        />
                        <Input
                            placeholder="Meta de Lucro (R$)"
                            type="number"
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
                            Adicionar Produto
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

                    {JSON.parse(localStorage.getItem("produtos") || "[]").length === 0 ? (
                        <Text textAlign="center" color="gray.500">
                            Nenhum produto cadastrado.
                        </Text>
                    ) : (
                        <VStack spacing={4} align="stretch">
                            {JSON.parse(localStorage.getItem("produtos") || "[]").map((produto: Produto, index: number) => (
                                <Box
                                    key={index}
                                    p={4}
                                    bg="gray.100"
                                    borderRadius="md"
                                    boxShadow="sm"
                                >
                                    <Text><strong>Produto:</strong> {produto.nomeProduto}</Text>
                                    <Text><strong>Custo de Produção:</strong> R$ {produto.custoProducao.toFixed(2)}</Text>
                                    <Text><strong>Valor de Venda Atual:</strong> R$ {produto.valorVendaAtual.toFixed(2)}</Text>
                                    <Text><strong>Número Médio de Produção:</strong> {produto.numeroMedioProducao}</Text>
                                    <Text><strong>Meta de Lucro:</strong> R$ {produto.metaLucro.toFixed(2)}</Text>
                                </Box>
                            ))}
                        </VStack>
                    )}

                    {/* Botão de Enviar: só aparece se houver produtos cadastrados */}
                    {JSON.parse(localStorage.getItem("produtos") || "[]").length > 0 && (
                        <Button
                            mt={6}
                            bg="black"
                            color="white"
                            _hover={{ bg: "#333" }}
                            size="lg"
                            width="100%"
                            onClick={handleEnviar}
                        >
                            Enviar Produtos
                        </Button>
                    )}
                </Box>
            </SimpleGrid>
        </Box>
    );
};

export default CadProduto;