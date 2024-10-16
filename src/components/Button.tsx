import { useState } from "react";
import { Button, Box } from "@chakra-ui/react";
import { DRETable } from "./DRETable"; // Importe o componente da tabela

export const MyButton = () => {
  const [showTable, setShowTable] = useState(false);

  const handleClick = () => {
    setShowTable(!showTable);
  };

  return (
    <Box>
      <Button bg="#EDFFB2" color="black" mb={6} _hover={{ bg: "#DDECAA" }} onClick={handleClick}>
        Informações gerenciais do seu negócio
      </Button>
      {showTable && <DRETable />} {/* Renderiza a tabela ao clicar */}
    </Box>
  );
};
