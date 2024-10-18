import { Box, VStack, HStack, Icon, Text, Heading, Button, Input } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Defina o conteúdo das etapas
const formSteps = [
    {
        label: "Informe o seu custo fixo total, mensal:",
        description: "Custos fixos são gastos sempre presentes, havendo produção ou não, por exemplo: água, energia, internet, segurança, salários e encargos trabalhistas, etc.",
        currencyLabel: "R$"
    },
    {
        label: "Informe o seu custo variável total, mensal:",
        description: "Custos variáveis são aqueles que variam de acordo com a produção ou vendas da empresa, ou seja, quanto maior a produtividade, maior os custos variáveis, por exemplo: comissão de vendas, matéria-prima, etc.",
        currencyLabel: "R$"
    },
    {
        label: "Informe o valor do seu investimento inicial total:",
        description: "A análise de investimento inicial auxilia a visão mais clara da saúde financeira do negócio, identificando oportunidades de otimização estratégicas para o futuro. Permitindo a maximização dos retornos obtidos.",
        currencyLabel: "R$"
    },
    {
        label: "Agora, informe a meta global do seu negócio:",
        description: "A meta global de uma empresa é o objetivo principal e abrangente que ela busca alcançar. Ela define o caminho que a empresa deseja seguir e o impacto que quer causar no mercado.",
        currencyLabel: "R$"
    },
    {
        label: "Por fim, informe o valor de Caixa atual do seu negócio:",
        description: "O valor de Caixa representa todo o dinheiro disponível da sua empresa para pagamentos e investimentos..",
        currencyLabel: "R$"
    }
];

const DynamicFormPage = () => {
    const [currentStep, setCurrentStep] = useState(0); // Controle da etapa atual
    const navigate = useNavigate();

    // Função para avançar para a próxima etapa
    const nextStep = () => {
        if (currentStep < formSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            navigate("/formProdService"); // Redireciona após o último passo
        }
    };

    // Função para retroceder a etapa
    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            navigate("/form"); // Volta para a página inicial
        }
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems={{ base: "flex-start", md: "center" }}
            bg="white"
            p={4}
            position="relative"
        >
            {/* Seta para voltar com o nome ao lado */}
            <Box
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left={{ base: "5%", md: "10%" }}
                cursor="pointer"
                onClick={prevStep}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Formulário inicial
                    </Text>
                </HStack>
            </Box>

            <Box width={{ base: "90%", md: "450px" }} mt={{ base: "20%", md: "0" }}>
                {/* Cabeçalho e descrição dinâmica */}
                <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                    {formSteps[currentStep].label}
                </Heading>
                <Text textAlign="center" mb={4} color="gray.600">
                    {formSteps[currentStep].description}
                </Text>

                {/* Campo de entrada para o valor */}
                <VStack spacing={4} alignItems="flex-start" width="100%">
                    <HStack width="100%" justifyContent="space-between" spacing={4}>
                        <HStack width="100%">
                            <Text fontSize="2xl" fontWeight="bold" color="black">R$</Text>
                            <Input
                                placeholder="0,00"
                                size="lg"
                                variant="flushed"
                                fontSize="2xl"
                                focusBorderColor="gray.400"
                            />
                        </HStack>
                        {/* Botão ao lado do campo de entrada no desktop */}
                        <Button
                            display={{ base: "none", md: "flex" }} // Botão visível apenas no desktop
                            color="black"
                            bg="#C6FF06"
                            _hover={{ bg: "#b8f306" }}
                            size="lg"
                            borderRadius="full"
                            onClick={nextStep}
                            rightIcon={<FaArrowRight />}
                        />
                    </HStack>
                </VStack>

                {/* Botão flutuante na parte inferior direita para dispositivos móveis */}
                <Button
                    position="fixed"
                    display={{ base: "flex", md: "none" }} // Botão visível apenas no mobile
                    bottom="5%"
                    right="5%"
                    color="black"
                    bg="#C6FF06"
                    _hover={{ bg: "#b8f306" }}
                    size="lg"
                    borderRadius="full"
                    onClick={nextStep}
                    rightIcon={<FaArrowRight />}
                />
            </Box>
        </Box>
    );
};

export default DynamicFormPage;
