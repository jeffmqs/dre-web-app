import { Box, Button, Heading, Grid, GridItem, Stack } from "@chakra-ui/react";
import { FaCommentsDollar, FaChartLine, FaChartPie, FaRegQuestionCircle } from "react-icons/fa";
import { GiSellCard } from "react-icons/gi";
import { LuDollarSign } from "react-icons/lu";
import { LuCalendarClock } from "react-icons/lu";

interface ServiceButtonProps {
  icon: JSX.Element;
  label: string;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({ icon, label }) => {
  return (
    <Button
      w="full"
      h="full"
      bg="black"
      color="#EDFFB2"
      _hover={{ bg: "#EDFFB2", color: "black" }}
      p={6}
      borderRadius="md"
      fontWeight="light"
      fontSize="sm"
    >
      <Stack direction="column" align="center" spacing={4}>
        {icon}
        <Box>{label}</Box>
      </Stack>
    </Button>
  );
};

export const Home = () => {
  return (
    <Box bg="#F0F0F0" minH="100vh" p={8}>
      <Box
        bg="white"
        p={8}
        mb={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h2" size="lg" mb={4}>
          TESTE DE PÁGINA
        </Heading>
        <Button
          bg="#EDFFB2"
          color="black"
          mb={6}
          _hover={{ bg: "#DDECAA" }}
        >
          Informações gerenciais do seu negócio
        </Button>
      </Box>

      <Box
        bg="white"
        p={8}
        mb={6}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h3" size="md" mb={4}>
          Serviços
        </Heading>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={6}
        >         
          <GridItem>
            <ServiceButton icon={<LuDollarSign size={30} />} label="Calcular Valuation"/>
          </GridItem>
          <GridItem>
            <ServiceButton icon={<LuCalendarClock size={30} />} label="Histórico Financeiro" />
          </GridItem>
          <GridItem>
            <ServiceButton icon={<FaChartPie size={30} />} label="Dashboard" />
          </GridItem>
          <GridItem>
            <ServiceButton icon={<FaChartLine size={30} />} label="Sugestões Analíticas" />
          </GridItem>
          <GridItem>
            <ServiceButton icon={<GiSellCard size={30} />} label="Simulador de Vendas" />
          </GridItem>
          <GridItem>
            <ServiceButton icon={<FaCommentsDollar size={30} />} label="Chat" />
          </GridItem>
          <GridItem>
            <ServiceButton icon={<FaRegQuestionCircle size={30} />} label="Ajuda" />
          </GridItem>
        </Grid>
      </Box>

      <Box
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h3" size="md" mb={4}>
          Resumo do Mês de seu Negócio
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem bg="#EDFFB2" p={4} borderRadius="md">
            Entradas do Mês: R$ 20.000
          </GridItem>
          <GridItem bg="#EDFFB2" p={4} borderRadius="md">
            Saídas do Mês: R$ 10.000
          </GridItem>
          <GridItem bg="#EDFFB2" p={4} borderRadius="md">
            Caixa do Mês: R$ 10.000
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};
