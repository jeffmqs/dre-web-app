import { Box, VStack, HStack, Icon, Text, Heading, Button, Input, Spacer } from "@chakra-ui/react";
import { FaChevronRight, FaArrowLeft, FaArrowRight, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Menu de itens (produtos ou serviços)
const menuItems = [
  { label: "Entradas gerais", path: "/entrada-geral" },
  { label: "Produto A", path: "/produto-a" },
  { label: "Produto B", path: "/produto-b" },
  { label: "Produto C", path: "/produto-c" },
  { label: "Produto D", path: "/produto-d" },
  { label: "Produto E", path: "/produto-e" },
];

// Etapas dinâmicas
const steps = [
  {
    label: "Selecione um produto ou serviço para continuar:",
    component: "menu", // A primeira etapa é o menu
  },
  {
    label: "Informe os dados sobre o produto selecionado:",
    component: "form", // Aqui pode ser uma etapa com inputs para coletar informações
  },
  {
    label: "Confirme os dados do cadastro:",
    component: "confirmation", // Etapa final de confirmação
  },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Controle da etapa atual
  const [selectedItem, setSelectedItem] = useState(""); // Armazena o item selecionado

  // Função para avançar para a próxima etapa
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      alert("Cadastro finalizado!");
    }
  };

  // Função para retroceder a etapa
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/"); // Volta para a página inicial
    }
  };

  // Função para selecionar um item do menu
  const handleSelectItem = (item: string) => {
    setSelectedItem(item);
    nextStep(); // Avança para a próxima etapa
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="flex-start" bg="gray.50" p={4} position="relative">
      
      {/* Seta para voltar */}
      {currentStep > 0 && (
        <Box position="absolute" top="4" left="4" cursor="pointer" onClick={prevStep}>
          <HStack spacing={2}>
            <Icon as={FaArrowLeft} color="black" boxSize="20px" />
            <Text fontSize="lg" color="black" fontWeight="medium">
              Voltar
            </Text>
          </HStack>
        </Box>
      )}

      {/* Conteúdo dinâmico da página com base na etapa */}
      <Box width={{ base: "90%", md: "400px" }} mt="10">
        <Heading as="h2" size="md" textAlign="left" color="black" mb={4}>
          {steps[currentStep].label}
        </Heading>

        {/* Renderiza o conteúdo baseado no componente da etapa */}
        {steps[currentStep].component === "menu" && (
          <VStack spacing={4}>
            {menuItems.map((item) => (
              <HStack
                key={item.label}
                onClick={() => handleSelectItem(item.label)}
                bg="white"
                borderRadius="8px"
                w="100%"
                p={4}
                justifyContent="space-between"
                boxShadow="sm"
                cursor="pointer"
                _hover={{ boxShadow: "md" }}
              >
                <Text fontSize="md" color="black" fontWeight="medium">
                  {item.label}
                </Text>
                <Icon as={FaChevronRight} color="gray.400" />
              </HStack>
            ))}
          </VStack>
        )}

        {/* Etapa de formulário para o produto selecionado */}
        {steps[currentStep].component === "form" && (
          <VStack spacing={4} alignItems="flex-start" width="100%">
            <Text>Produto selecionado: <strong>{selectedItem}</strong></Text>
            <Input placeholder="Informe a quantidade" size="lg" variant="flushed" />
            <Input placeholder="Informe o preço" size="lg" variant="flushed" />
            <Button color="black" bg="#C6FF06" _hover={{ bg: "#b8f306" }} size="lg" borderRadius="full" onClick={nextStep} rightIcon={<FaArrowRight />}>
              Continuar
            </Button>
          </VStack>
        )}

        {/* Etapa de confirmação */}
        {steps[currentStep].component === "confirmation" && (
          <VStack spacing={4} alignItems="center">
            <Text>Você selecionou: <strong>{selectedItem}</strong></Text>
            <Text>Quantia: <strong>100</strong></Text>
            <Text>Preço: <strong>R$ 50,00</strong></Text>
            <Button color="black" bg="#C6FF06" _hover={{ bg: "#b8f306" }} size="lg" borderRadius="full" onClick={() => alert("Cadastro finalizado!")}>
              Finalizar Cadastro
            </Button>
          </VStack>
        )}

        {/* Botão "Adicionar novo produto ou serviço" só visível na etapa do menu */}
        {currentStep === 0 && (
          <Box display="flex" justifyContent="center" mt={8}>
            <Button color="black" bg="#C6FF06" _hover={{ bg: "#b8f306" }} variant="solid" onClick={() => alert("Novo produto adicionado!")}>
              Adicionar novo produto ou serviço
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MenuPage;
