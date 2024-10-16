import { Flex, Spacer, Menu, MenuButton, MenuList, MenuItem, IconButton, Image } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import logoMosca from '../assets/logo_mosca.svg';  // Importando o SVG corretamente
import { useNavigate } from "react-router-dom";  // Importando o hook de navegação

export const Header = () => {
  const navigate = useNavigate();  // Hook de navegação

  const handleLogout = () => {
    console.log("Sair do site");
    navigate("/login");  // Redireciona para a página de login
  };

  return (
    <Flex 
      as="header" 
      bg="black" 
      color="white" 
      p={0} 
      align="center" 
      justify="space-between"  
      px={58}  // Ajuste o padding conforme necessário
    >
      {/* Substituindo o texto por uma imagem */}
      <Image src={logoMosca} alt="Mosca Branca Logo" boxSize="110px" /> {/* Ajuste o tamanho da logo */}
      <Spacer />
      {/* Menu de ícone hamburguer */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<RxHamburgerMenu />}
          variant="ghost"
          aria-label="Options"
          fontSize="24px"
          color="white"
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        />
        <MenuList boxShadow="lg" borderRadius="md">
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }}  // Cor ao passar o mouse
            _focus={{ bg: "#EDFFB2" }}  // Cor quando estiver focado (selecionado)
          >
            Mosca Branca - Deep Tech
          </MenuItem>
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }}  // Cor ao passar o mouse
            _focus={{ bg: "#EDFFB2" }}  // Cor quando estiver focado (selecionado)
          >
            Sobre
          </MenuItem>
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }}  // Cor ao passar o mouse
            _focus={{ bg: "#EDFFB2" }}  // Cor quando estiver focado (selecionado)
            onClick={handleLogout}  // Chama a função handleLogout para sair
          >
            Sair 
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
