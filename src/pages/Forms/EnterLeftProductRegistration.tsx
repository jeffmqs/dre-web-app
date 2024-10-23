import React, { useState } from "react";
import { Box, Button, Heading, HStack, Icon, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaChevronRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Grid, GridItem } from "@chakra-ui/react";
import { useDayzed, DateObj } from "dayzed";
import { format } from "date-fns";

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
    component: "form", // Inputs de quantidade e preço
  },
  {
    label: "Adicione uma descrição para esta entrada:",
    component: "description", // Novo passo para adicionar uma descrição
  },
  {
    label: "Agora informe a data desta entrada:",
    component: "datePicker", // Passo para escolher a data
  },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0); // Controle da etapa atual
  const [selectedItem, setSelectedItem] = useState(""); // Armazena o item selecionado
  const [quantity, setQuantity] = useState(""); // Quantidade do item
  const [price, setPrice] = useState(""); // Preço do item
  const [description, setDescription] = useState(""); // Descrição do item
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Data selecionada
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  // Função de renderização de calendário usando Dayzed
  const MyDatepicker = () => {
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    const handleDateSelected = ({ date }: { date: Date }) => {
      setSelectedDate(date);
      onClose(); // Fecha o popover após selecionar a data
    };

    const { calendars, getDateProps, getBackProps, getForwardProps } = useDayzed({
      onDateSelected: handleDateSelected,
      selected: selectedDate || undefined,
    });

    return (
      <Grid templateColumns="repeat(7, 1fr)" gap={2}>
        {calendars.map((calendar, index) => (
          <React.Fragment key={index}>
            <GridItem colSpan={7} textAlign="center">
              <Button size="sm" {...getBackProps({ calendars })}>
                Prev
              </Button>
              <Text mx={4} display="inline">
                {format(calendar.month, "MMMM yyyy")}
              </Text>
              <Button size="sm" {...getForwardProps({ calendars })}>
                Next
              </Button>
            </GridItem>
            {calendar.weeks.map((week, weekIndex) =>
              week.map((dateObj, dateIndex) => {
                if (typeof dateObj === "string") {
                  return <GridItem key={dateIndex} />;
                }
                const { date, today, selected, selectable } = dateObj;
                const isHovered = date === hoveredDate;

                return (
                  <GridItem
                    key={dateIndex}
                    w="40px"
                    h="40px"
                    bg={selected ? "green.200" : isHovered ? "green.100" : "white"}
                    textAlign="center"
                    cursor={selectable ? "pointer" : "not-allowed"}
                    color={selectable ? "black" : "gray.400"}
                    borderRadius="md"
                    onMouseEnter={() => setHoveredDate(date)}
                    {...getDateProps({ dateObj })}
                  >
                    <Text>{format(date, "d")}</Text>
                  </GridItem>
                );
              })
            )}
          </React.Fragment>
        ))}
      </Grid>
    );
  };

  // Função para renderizar o DatePicker
  const renderDatepicker = () => (
    <Popover isOpen={isOpen} onClose={onClose}>
      <PopoverTrigger>
        <Input
          placeholder="Clique para selecionar uma data"
          size="lg"
          variant="flushed"
          value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
          onClick={onOpen}
          readOnly
        />
      </PopoverTrigger>
      <PopoverContent width="auto">
        <PopoverBody>
          <MyDatepicker />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.50" p={4} position="relative">
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
            <Text>
              Produto selecionado: <strong>{selectedItem}</strong>
            </Text>
            <Input
              placeholder="Informe a quantidade"
              size="lg"
              variant="flushed"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              placeholder="Informe o preço"
              size="lg"
              variant="flushed"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              color="black"
              bg="#C6FF06"
              _hover={{ bg: "#b8f306" }}
              size="lg"
              borderRadius="full"
              onClick={nextStep}
              rightIcon={<FaArrowRight />}
            >
              Continuar
            </Button>
          </VStack>
        )}

        {/* Novo passo: Adicionar descrição */}
        {steps[currentStep].component === "description" && (
          <VStack spacing={4} alignItems="flex-start" width="100%">
            <Text>
              Adicione uma descrição para o produto <strong>{selectedItem}</strong>
            </Text>
            <Textarea
              placeholder="Escreva uma descrição"
              size="lg"
              variant="flushed"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              color="black"
              bg="#C6FF06"
              _hover={{ bg: "#b8f306" }}
              size="lg"
              borderRadius="full"
              onClick={nextStep}
              rightIcon={<FaArrowRight />}
            >
              Continuar
            </Button>
          </VStack>
        )}

        {/* Etapa de seleção de data */}
        {steps[currentStep].component === "datePicker" && (
          <VStack spacing={4} alignItems="flex-start">
            <Text>
              Selecione a data de entrada para o produto <strong>{selectedItem}</strong>
            </Text>
            <Box w="100%">{renderDatepicker()}</Box>
            <Button
              color="black"
              bg="#C6FF06"
              _hover={{ bg: "#b8f306" }}
              size="lg"
              borderRadius="full"
              onClick={() => {
                if (selectedDate) {
                  alert(
                    `Cadastro finalizado para o produto ${selectedItem} com a descrição: "${description}" na data ${selectedDate.toLocaleDateString()}`
                  );
                } else {
                  alert("Por favor, selecione uma data.");
                }
              }}
            >
              Finalizar Cadastro
            </Button>
          </VStack>
        )}
      </Box>
    </Box>
  );
};

export default MenuPage;
