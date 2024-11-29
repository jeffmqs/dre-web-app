import {
    Box, VStack, HStack, Icon, Text, Heading, Accordion, AccordionItem,
    AccordionButton, AccordionPanel, Radio, RadioGroup, Button
} from "@chakra-ui/react";
import {
    FaArrowLeft, FaArrowUp, FaArrowDown, FaPlus, FaMinus
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const MenuPage = () => {
    const navigate = useNavigate();
    const [value, setValue] = useState(""); // Controla o valor selecionado
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Controla o estado do Accordion

    // Função para limpar o valor selecionado ao mudar de accordion
    const handleAccordionChange = (index: number) => {
        if (index !== expandedIndex) {
            setValue(""); // Limpa o valor selecionado ao mudar de seção
        }
        setExpandedIndex(index === expandedIndex ? null : index); // Alterna o índice expandido
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="flex-start"
            alignItems="center"
            bg="gray.50"
            p={4}
            position="relative"
        >
            {/* Seta para voltar com o nome ao lado */}
            <Box
                position="absolute"
                top="5%"
                left="5%"
                cursor="pointer"
                onClick={() => navigate("/productCad")}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Cadastro de entradas e saídas
                    </Text>
                </HStack>
            </Box>

            <Heading as="h2" size="lg" textAlign="center" color="black" mb={6} mt={10}>
                O que você está cadastrando?
            </Heading>

            <Accordion
                allowToggle
                w="90%"
                mb={8}
                onChange={handleAccordionChange} // Atualiza o índice expandido e limpa a seleção
            >
                {/* Accordion Entradas Financeiras */}
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <HStack w="100%" justifyContent="space-between">
                                <HStack spacing={3}>
                                    <Box
                                        bg="black"
                                        p={2}
                                        borderRadius="8px"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Icon as={FaArrowUp} color="white" boxSize="20px" />
                                    </Box>
                                    <VStack align="start" spacing={0}>
                                        <Text fontSize="lg" color="black" fontWeight="medium">
                                            Entradas Financeiras
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            Entradas de recursos financeiros na empresa.
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Icon as={expandedIndex === 0 ? FaMinus : FaPlus} color="grey" boxSize="15px" />
                            </HStack>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <RadioGroup onChange={setValue} value={value}>
                            <VStack spacing={4} align="start">
                                {/* Caixa Capital Social (Entrada) */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("entrada-capital-social")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Capital Social</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Entrada de capital dos sócios ou acionistas
                                            </Text>
                                        </VStack>
                                        <Radio value="entrada-capital-social" isChecked={value === "entrada-capital-social"}/>
                                    </HStack>
                                </Box>

                                {/* Caixa Reservas de Capital */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("entrada-reservas-capital")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Reservas de Capital</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Contribuições adicionais dos sócios ou acionistas que não aumentam o capital social
                                            </Text>
                                        </VStack>
                                        <Radio value="entrada-reservas-capital" isChecked={value === "reservas-capital"} />
                                    </HStack>
                                </Box>

                                {/* Caixa Reservas de Lucros */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("entrada-reservas-lucros")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Reservas de Lucros</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Porção dos lucros que é retida na empresa para reinvestimento.
                                            </Text>
                                        </VStack>
                                        <Radio value="entrada-reservas-lucros" isChecked={value === "reservas-lucros"} />
                                    </HStack>
                                </Box>

                                {/* Caixa Lucros ou Prejuízos Acumulados */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("entrada-lucros-acumulados")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Lucros ou Prejuízos Acumulados</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Lucros acumulados que não foram distribuídos como dividendos.
                                            </Text>
                                        </VStack>
                                        <Radio value="entrada-lucros-acumulados" isChecked={value === "lucros-acumulados" } />
                                    </HStack>
                                </Box>
                            </VStack>
                        </RadioGroup>
                    </AccordionPanel>
                </AccordionItem>

                {/* Accordion Saídas Financeiras */}
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <HStack w="100%" justifyContent="space-between">
                                <HStack spacing={3}>
                                    <Box
                                        bg="black"
                                        p={2}
                                        borderRadius="8px"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Icon as={FaArrowDown} color="white" boxSize="20px" />
                                    </Box>
                                    <VStack align="start" spacing={0}>
                                        <Text fontSize="lg" color="black" fontWeight="medium">
                                            Saídas Financeiras
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            Saídas de recursos financeiros da empresa.
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Icon as={expandedIndex === 1 ? FaMinus : FaPlus} color="grey" boxSize="15px" />
                            </HStack>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <RadioGroup onChange={setValue} value={value}>
                            <VStack spacing={4} align="start">
                                {/* Caixa Capital Social (Saída) */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("saida-capital-social")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Capital Social</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Saída de capital dos sócios ou acionistas
                                            </Text>
                                        </VStack>
                                        <Radio value="saida-capital-social" isChecked={value === "saida-capital-social"} />
                                    </HStack>
                                </Box>

                                {/* Outros conteúdos podem ser adicionados */}
                                
                                {/* Caixa Reservas de Capital */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("saida-reservas-capital")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Reservas de Capital</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Contribuições adicionais dos sócios ou acionistas que não aumentam o capital social
                                            </Text>
                                        </VStack>
                                        <Radio value="saida-reservas-capital" isChecked={value === "saida-reservas-capital"} />
                                    </HStack>
                                </Box>
                                
                                {/* Outros valores podem ser adicionados */}

{/* Caixa Reservas de Lucros */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("saida-reservas-lucros")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Reservas de Lucros</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Porção dos lucros que é retida na empresa para reinvestimento.
                                            </Text>
                                        </VStack>
                                        <Radio value="saida-reservas-lucros" isChecked={value === "reservas-lucros"} />
                                    </HStack>
                                </Box>

                                {/* Caixa Lucros ou Prejuízos Acumulados */}
                                <Box
                                    w="100%"
                                    p={4}
                                    borderRadius="md"
                                    border="1px solid"
                                    borderColor="gray.200"
                                    boxShadow="md"
                                    _hover={{ boxShadow: "lg", cursor: "pointer" }}
                                    onClick={() => setValue("saida-lucros-acumulados")}
                                >
                                    <HStack justifyContent="space-between" w="100%">
                                        <VStack align="start" spacing={0}>
                                            <Text fontWeight="bold">Lucros ou Prejuízos Acumulados</Text>
                                            <Text fontSize="sm" color="gray.500">
                                                Lucros acumulados que não foram distribuídos como dividendos.
                                            </Text>
                                        </VStack>
                                        <Radio value="saida-lucros-acumulados" isChecked={value === "lucros-acumulados"} />
                                    </HStack>
                                </Box>

                            </VStack>
                        </RadioGroup>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            {/* Renderiza o botão se algum valor foi selecionado */}
            {value && (
                <Button
                    color="black"
                    bg="#C6FF06"
                    _hover={{ bg: "#b8f306" }}
                    variant="solid"
                    onClick={() => navigate(`/EnterLeftProductRegistration`)}
                >
                    Continuar Cadastro
                </Button>
            )}
        </Box>
    );
};

export default MenuPage;
