// src/pages/MenuPage.tsx

import {
    Box, VStack, HStack, Icon, Text, Heading, Button
} from "@chakra-ui/react";
import { FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { MdMiscellaneousServices } from "react-icons/md";
import { IoBagHandleOutline } from "react-icons/io5";

const menuItems = [
    { label: "Cadastrar Produto", icon: IoBagHandleOutline, path: "/productCad" },
    { label: "Cadastrar Serviço", icon: MdMiscellaneousServices, path: "/serviceCad" },
];

const MenuPage = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
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
                onClick={() => navigate("/financialData")}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Página Inicial
                    </Text>
                </HStack>
            </Box>

            <Box width={{ base: "90%", md: "450px" }} mt={{ base: "20%", md: "0" }}>
                <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                    Cadastro de Entradas e Saídas
                </Heading>

                <VStack spacing={4}>
                    {menuItems.map((item) => (
                        <HStack
                            key={item.label}
                            onClick={() => handleNavigation(item.path)}
                            bg="white"
                            borderRadius="12px"
                            w="100%"
                            p={4}
                            justifyContent="space-between"
                            boxShadow="0 2px 6px rgba(0, 0, 0, 0.1)"
                            cursor="pointer"
                            _hover={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" }}
                        >
                            <HStack spacing={3}>
                                <Box
                                    bg="black"
                                    p={2}
                                    borderRadius="8px"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Icon as={item.icon} color="white" boxSize="20px" />
                                </Box>
                                <Text fontSize="lg" color="black" fontWeight="medium">
                                    {item.label}
                                </Text>
                            </HStack>
                            <Icon as={FaChevronRight} color="gray.400" />
                        </HStack>
                    ))}
                </VStack>

                {/* Botão para Prosseguir para Dados Financeiros */}
                <Box mt={8} textAlign="center">
                    <Text fontSize="md" color="gray.600" mb={2}>
                        Após cadastrar produtos ou serviços, prossiga para:
                    </Text>
                    <Button
                        color="black"
                        bg="#C6FF06"
                        _hover={{ bg: "#b8f306" }}
                        variant="solid"
                        onClick={() => navigate("/financialData")}
                    >
                        Dados Financeiros
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MenuPage;