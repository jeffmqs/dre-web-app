import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Input, Box, Heading } from "@chakra-ui/react";

export const DRETable = () => {
  return (
    <Box p={8} bg="#F0F0F0" borderRadius="md" boxShadow="md">
      <Heading as="h3" size="lg" mb={6} textAlign="center">
        Modelo DRE
      </Heading>
      <TableContainer>
        <Table variant="simple" colorScheme="gray" size="md">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Ano 1</Th>
              <Th>Ano 2</Th>
              <Th>Ano 3</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td><strong>Receita Bruta</strong></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>CMV</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Comissões (5%)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Receita Líquida</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
                <Td colSpan={4}>
                <Box height="2px" bg="gray.300" />
                </Td>
                </Tr>
            <Tr>
              <Td><strong>Despesas Operacionais</strong></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>AWS</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Sócios (prolabore)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Vendedores</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
                <Td colSpan={4}>
                <Box height="2px" bg="gray.300" />
                </Td>
                </Tr>
            <Tr>
              <Td><strong>Despesa (SG&A)</strong></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>EBITDA</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Depreciação</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Impostos (15.5%)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
                <Td colSpan={4}>
                <Box height="2px" bg="gray.300" />
                </Td>
                </Tr>
            <Tr>
              <Td><strong>Lucro Líquido</strong></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>FCO (Fluxo de Caixa Operacional)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>FCI (Fluxo de Caixa de Investimento)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>FCF (Fluxo de Caixa de Financiamento)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>FCL (Fluxo de Caixa Livre)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>VPL Fluxo Explicito</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Somatório dos 5 Anos</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>VPL Perpetuidade</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Perpetuidade (G)</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>WACC</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
            <Tr>
              <Td>Valuation em relação ao múltiplo</Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
              <Td><Input type="number" step="0.01" placeholder="0.00" border="1px solid gray" /></Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

