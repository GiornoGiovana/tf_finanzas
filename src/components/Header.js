import { Heading, Link, Button, Flex, Avatar } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
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

      <Flex align="center" gridGap="4">
        <Button colorScheme="teal" size="md">
          Cerrar Sesion
        </Button>
        <Avatar bg="teal.500" size="md" />
      </Flex>
    </Flex>
  );
};
