import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  Checkbox,
  Link,
  VStack,
  Heading,
  Text,
  Icon,
  HStack,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");
  const navigate = useNavigate();
  const toast = useToast();

  // Check server status
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
        if (!API_BASE_URL) {
          throw new Error("VITE_API_BASE_URL não está definido.");
        }

        await axios.get(`${API_BASE_URL}/auth/health`);
        setServerStatus("online");
      } catch {
        setServerStatus("offline");
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 10000); // Check every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (serverStatus === "offline") {
      toast({
        title: "Erro no servidor",
        description: "O servidor está offline. Inicializando servidor aguarde alguns segundos.Ou prossiga para outras paginas pela URL até o servidor voltar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      if (!API_BASE_URL) {
        throw new Error("VITE_API_BASE_URL não está definido.");
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        senha: password,
      });

      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);

      toast({
        title: "Login bem-sucedido!",
        description: "Bem-vindo ao sistema.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/home");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Erro no login. Verifique suas credenciais.";
      toast({
        title: "Erro no login",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/signup");
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
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
        {serverStatus === "checking" && (
          <Text textAlign="center" color="yellow.400" mb={4}>
            Verificando o status do servidor... <Spinner size="sm" />
          </Text>
        )}
        {serverStatus === "offline" && (
          <Text textAlign="center" color="red.400" mb={4}>
            O servidor está offline. Aguarde ou tente novamente mais tarde.
          </Text>
        )}
        {serverStatus === "online" && (
          <>
            <Heading as="h2" size="lg" textAlign="center" color="white" mb={6}>
              Acesse o sistema
            </Heading>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Box position="relative" w="100%">
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-mail"
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
                    as={FaUser}
                    position="absolute"
                    right="25px"
                    top="50%"
                    transform="translateY(-50%)"
                    fontSize="18px"
                    color="white"
                  />
                </Box>
                <Box position="relative" w="100%">
                  <Input
                    id="password"
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
                <HStack justify="space-between" w="100%" fontSize="14.5px">
                  <Checkbox color="white">Lembre de mim</Checkbox>
                  <Link
                    color="white"
                    href="#"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Esqueceu a senha?
                  </Link>
                </HStack>
                <Button
                  type="submit"
                  width="100%"
                  height="50px"
                  bg="white"
                  borderRadius="40px"
                  _hover={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
                >
                  Entrar
                </Button>
                <Box textAlign="center" color="white" mt={4}>
                  <Text as="span">Não tem uma conta?{" "}</Text>
                  <Link
                    color="white"
                    _hover={{ textDecoration: "underline" }}
                    onClick={handleRegisterRedirect}
                  >
                    Registrar
                  </Link>
                </Box>
              </VStack>
            </form>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Login;
