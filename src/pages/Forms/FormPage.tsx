import { Box, VStack, HStack, Icon, Text, Heading } from "@chakra-ui/react";
import { FaStore, FaUserTie, FaIndustry, FaBoxOpen, FaCloud, FaTools, FaChevronRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const menuItems = [
    { label: "Comércio", icon: FaStore, path: "/cost" },
    { label: "Consultor", icon: FaUserTie, path: "/cost" },
    { label: "Indústria", icon: FaIndustry, path: "/cost" },
    { label: "Produtor", icon: FaBoxOpen, path: "/cost" },
    { label: "Saas", icon: FaCloud, path: "/cost" },
    { label: "Serviço", icon: FaTools, path: "/cost" },
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
            alignItems={{ base: "flex-start", md: "center" }} // Alinhado no centro no desktop e mais em cima no mobile
            bg="white"
            p={4}
            position="relative" // Para permitir o posicionamento absoluto da seta
        >
            {/* Seta para voltar com o nome ao lado */}
            <Box
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                left={{ base: "5%", md: "10%" }}
                cursor="pointer"
                onClick={() => navigate("/")}
            >
                <HStack spacing={2}>
                    <Icon as={FaArrowLeft} color="black" boxSize="20px" />
                    <Text fontSize="lg" color="black" fontWeight="medium">
                        Formulário inicial
                    </Text>
                </HStack>
            </Box>

            <Box width={{ base: "90%", md: "450px" }} mt={{ base: "20%", md: "0" }}>
                <Heading as="h2" size="lg" textAlign="center" color="black" mb={6}>
                    Qual é o seu modelo de negócio:
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
            </Box>
        </Box>
    );
};

export default MenuPage;
