import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  Heading,
  Icon,
  VStack,
  Text,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate(); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("O e-mail deve ser válido e conter '.com'.");
      return;
    }

    
    const passwordRegex = /^(?=.*[A-Za-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("A senha deve ter pelo menos 6 caracteres, e que ao menos uma letra (minúscula ou maiúscula) esteja presente.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem. Por favor, tente novamente.");
      return;
    }

    setError("");
    navigate("/complete-registration", { state: { username, email } });
  };

  const handleLoginRedirect = () => {
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
        <Heading as="h2" size="lg" textAlign="center" color="white" mb={6}>
          Crie sua conta
        </Heading>

        {error && (
          <Alert status="error" mb={4}>
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Box position="relative" width="100%">
              <Input
                type="text"
                placeholder="Digite seu nome"
                onChange={(e) => setUsername(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaUser} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>

            <Box position="relative" width="100%">
              <Input
                type="email"
                placeholder="Digite seu E-mail"
                onChange={(e) => setEmail(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaEnvelope} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>

            <Box position="relative" width="100%">
              <Input
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaLock} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>
            
            <Box position="relative" width="100%">
              <Input
                type="password"
                placeholder="Repita sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaLock} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>
          
            <Button 
              type="submit" 
              width="full" 
              height="50px" 
              bg="white" 
              borderRadius="40px" 
              _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
            >
              Cadastrar
            </Button>
            
            <Text color="white" textAlign="center" mt={6}>
              Já tem uma conta?{" "}
              <Link color="white" _hover={{ textDecoration: "underline" }} onClick={handleLoginRedirect}>
                Entrar
              </Link>
            </Text>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
