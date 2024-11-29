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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // Reset error state before API call
      setError("");

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL não está definido.");
      }

      // Send registration data to the server
      await axios.post(`${API_BASE_URL}/auth/register`, {
        nome: name,
        email,
        senha: password,
      });

      // Show success toast
      toast({
        title: "Cadastro bem-sucedido!",
        description: "Sua conta foi criada com sucesso.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Navigate to login page
      navigate("/login");
    } catch (err: any) {
      // Display error message from server response or generic message
      const errorMessage = err.response?.data?.message || "Erro ao cadastrar. Tente novamente.";
      setError(errorMessage);
    }
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

        {/* Show error alert if an error exists */}
        {error && (
          <Alert status="error" mb={4} borderRadius="10px">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            {/* Name Input */}
            <Box position="relative" width="100%">
              <Input
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon
                as={FaUser}
                position="absolute"
                right="25px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="18px"
                color="white"
              />
            </Box>

            {/* Email Input */}
            <Box position="relative" width="100%">
              <Input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon
                as={FaEnvelope}
                position="absolute"
                right="25px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="18px"
                color="white"
              />
            </Box>

            {/* Password Input */}
            <Box position="relative" width="100%">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon
                as={FaLock}
                position="absolute"
                right="25px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="18px"
                color="white"
              />
            </Box>

            {/* Confirm Password Input */}
            <Box position="relative" width="100%">
              <Input
                type="password"
                placeholder="Repita sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon
                as={FaLock}
                position="absolute"
                right="25px"
                top="50%"
                transform="translateY(-50%)"
                fontSize="18px"
                color="white"
              />
            </Box>

            {/* Submit Button */}
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

            {/* Redirect to Login */}
            <Text color="white" textAlign="center" mt={6}>
              Já tem uma conta?{" "}
              <Link
                color="white"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/login")}
              >
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
