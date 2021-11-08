import { Heading, Link, Flex, Avatar } from "@chakra-ui/react";
import { signOut } from "@firebase/auth";
import { Link as RouterLink } from "react-router-dom";
import { auth } from "../firebase";

export const Header = () => {
  const handleLogout = () => {
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
        <Heading as="h3" size="lg">
          My Wallet
        </Heading>
      </Link>

      {auth?.currentUser?.displayName && (
        <Flex align="center" gridGap="4" className="header__avatar">
          <Heading as="h5" size="md" color="whitesmoke">
            {auth.currentUser.displayName}
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
