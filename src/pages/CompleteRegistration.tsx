import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  Icon,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FaUser, FaLock } from "react-icons/fa"; 

const CompleteRegistration: React.FC = () => {
  const location = useLocation();
  const [birthdate, setBirthdate] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!cpf && !cnpj) {
      alert("Por favor, informe o CPF ou CNPJ.");
      return;
    }
    alert(`Cadastro Concluído!`);
    navigate("/");
  };

  return (
    <Box 
      minHeight="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bgImage="url('/bg.png')" 
      bgSize="cover" 
      bgPosition="center"
    >
      <Box 
        width="450px" 
        bg="rgba(255, 255, 255, 0.15)" 
        backdropFilter="blur(10px)" 
        border="2px solid rgba(255, 255, 255, 0.2)" 
        p={8} 
        borderRadius="10px"
      >
        <form onSubmit={handleSubmit}>
          <Heading as="h2" size="lg" textAlign="center" color="white" mb={6}>
            Complete seu cadastro
          </Heading>

          <VStack spacing={4}>
            {/* Campo de Data de Nascimento */}
            <Box position="relative" width="100%">
              <Input
                type="date"
                onChange={(e) => setBirthdate(e.target.value)}
                required
                color="white"
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                p="20px 25px"
              />
            </Box>

            {/* Campo de CPF */}
            <Box position="relative" width="100%">
              <Input
                type="text"
                placeholder="Informe seu CPF"
                onChange={(e) => setCpf(e.target.value)}
                color="white"
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                p="20px 25px"
              />
            </Box>

            {/* Campo de CNPJ (opcional) */}
            <Box position="relative" width="100%">
              <Input
                type="text"
                placeholder="Informe seu CNPJ (opcional)"
                onChange={(e) => setCnpj(e.target.value)}
                color="white"
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                p="20px 25px"
              />
            </Box>

            {/* Campo de Endereço */}
            <Box position="relative" width="100%">
              <Input
                type="text"
                placeholder="Informe seu endereço"
                onChange={(e) => setAddress(e.target.value)}
                required
                color="white"
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                p="20px 25px"
              />
            </Box>

        
            <Button 
              type="submit" 
              width="full" 
              height="50px" 
              bg="white" 
              borderRadius="40px" 
              _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              Continuar
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default CompleteRegistration;