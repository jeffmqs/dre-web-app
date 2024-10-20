import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
} from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert(`${username} autenticado com sucesso!`);
    navigate('/home'); 
  };

  const handleRegisterRedirect = () => {
    navigate('/signup'); 
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
        <Heading as="h2" size="lg" textAlign="center" color="white" mb={6}>
          Acesse o sistema
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
        
            <Box position="relative" w="100%">
              <Input
                type="email"
                placeholder="E-mail"
                required
                onChange={(e) => setUsername(e.target.value)}
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaUser} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>
           
            <Box position="relative" w="100%">
              <Input
                type="password"
                placeholder="Senha"
                required
                onChange={(e) => setPassword(e.target.value)}
                bg="transparent"
                border="2px solid rgba(255, 255, 255, 0.2)"
                borderRadius="40px"
                color="white"
                p="20px 25px"
                _placeholder={{ color: "white" }}
              />
              <Icon as={FaLock} position="absolute" right="25px" top="50%" transform="translateY(-50%)" fontSize="18px" color="white" />
            </Box>
            
            <HStack justify="space-between" w="100%" fontSize="14.5px">
              <Checkbox color="white">Lembre de mim</Checkbox>
              <Link color="white" href="#" _hover={{ textDecoration: "underline" }}>
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
              <Text>
                Não tem uma conta?{" "}
                <Link color="white" _hover={{ textDecoration: "underline" }} onClick={handleRegisterRedirect}>
                  Registrar
                </Link>
              </Text>
            </Box>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
