import React, { useState } from "react";
import { Box, Button, Heading, HStack, Icon, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, Grid, GridItem } from "@chakra-ui/react";
import { useDayzed } from "dayzed";
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
    component: "menu",
  },
  {
    label: "Informe os dados sobre o produto selecionado:",
    component: "form",
  },
  {
    label: "Adicione uma descrição para esta entrada:",
    component: "description",
  },
  {
    label: "Agora informe a data desta entrada:",
    component: "datePicker",
  },
];

const MenuPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Data inicial como null
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
      setSelectedDate(date); // Atualiza a data selecionada
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
              <HStack justify="space-between" mb={2}>
                <Button size="sm" {...getBackProps({ calendars, offset: 12 })}>
                  <FiChevronsLeft />
                </Button>
                <Button size="sm" {...getBackProps({ calendars })}>
                  <FaChevronLeft />
                </Button>
                <Text fontWeight="normal" mx={2}>
                    {format(new Date(calendar.year, calendar.month, 1), "MMMM yyyy")}
                </Text>
                <Button size="sm" {...getForwardProps({ calendars })}>
                  <FaChevronRight />
                </Button>
                <Button size="sm" {...getForwardProps({ calendars, offset: 12 })}>
                  <FiChevronsRight />
                </Button>
              </HStack>
            </GridItem>
            {calendar.weeks.map((week) =>
              week.map((dateObj, dateIndex) => {
                if (typeof dateObj === "string") {
                  return <GridItem key={dateIndex} />;
                }
                const { date, selected, selectable } = dateObj;
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
          value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""} // Verifica se a data está selecionada, caso contrário deixa vazio
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
    {/* Botão dinâmico: "Cadastro de entradas e saídas" ou "Voltar" */}
    <Box position="absolute" top="5%" left="5%" cursor="pointer" onClick={currentStep === 0 ? () => navigate("/cadEnter") : prevStep}>
      <HStack spacing={2}>
        <Icon as={FaArrowLeft} color="black" boxSize="20px" />
        <Text fontSize="lg" color="black" fontWeight="medium">
          {currentStep === 0 ? "Cadastro de entradas e saídas" : "Voltar"}
        </Text>
      </HStack>
    </Box>

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
