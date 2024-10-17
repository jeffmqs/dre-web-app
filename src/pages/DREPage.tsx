import { Box } from "@chakra-ui/react";
import { DRETable } from "../components/DRETable";
import { Header } from "../components/Header";

export const DREPage = () => {
  return (
    <>
    <Header/>
    <Box p={8}>
      <DRETable />
    </Box>
    </>
  );
};
