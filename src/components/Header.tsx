import { Flex, Spacer, Menu, MenuButton, MenuList, MenuItem, IconButton, Image } from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import logoMosca from '../assets/logo_mosca.svg';
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sair do site");
    navigate("/login");
  };

  return (
    <Flex 
      as="header" 
      bg="black" 
      color="white" 
      p={0} 
      align="center" 
      justify="space-between"  
      px={58}
    >
      <Image src={logoMosca} alt="Mosca Branca Logo" boxSize="110px" />
      <Spacer />
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
            _hover={{ bg: "#EDFFB2" }}  
            onClick={() => navigate("/home")} 
          >
            Mosca Branca - Deep Tech
          </MenuItem>
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }}  
            onClick={() => navigate("/dre")} 
          >
            Tabela DRE
          </MenuItem>
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }} 
            _focus={{ bg: "#EDFFB2" }}  
          >
            Sobre
          </MenuItem>
          <MenuItem 
            color="black"
            _hover={{ bg: "#EDFFB2" }}  
            onClick={handleLogout}
          >
            Sair 
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
