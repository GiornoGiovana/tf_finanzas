import { Heading, Link, Flex, Avatar } from "@chakra-ui/react";
import { signOut } from "@firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { auth } from "../firebase";

export const Header = ({ setIsLogged }) => {
  const user = useAuth();
  const handleLogout = () => {
    setIsLogged(false);
    signOut(auth);
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      bgColor="cyan.200"
      py="2"
      px="24"
    >
      <Link as={RouterLink} to="/" color="teal">
        <img
          style={{ height: 50, width: 235 }}
          src="/logoFinanzas.png"
          alt="logo"
        />
      </Link>

      {user && (
        <Flex align="center" gridGap="4" className="header__avatar">
          <Heading as="h5" size="md" color="rgb(99, 179, 237)">
            {user?.displayName}
          </Heading>
          <Avatar bg="teal.500" size="md" onClick={handleLogout} />
          <span className="logout" onClick={handleLogout}>
            Cerrar Sesion
          </span>
        </Flex>
      )}
    </Flex>
  );
};
