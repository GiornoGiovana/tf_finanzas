import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Container, Heading, Link } from "@chakra-ui/layout";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useForm } from "../hooks/useForm";

export const Login = () => {
  const navigate = useNavigate();
  const [state, handleChange] = useForm({
    correo: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, state.correo, state.password)
      .then((userCredential) => {
        console.log("User logged: ", userCredential);
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Center h="lg">
      <Container flex>
        <Heading m="auto" w="fit-content" color="blackAlpha.300">
          Iniciar Sesion
        </Heading>
        <form>
          <FormControl mt="4" isRequired>
            <FormLabel>Correo</FormLabel>
            <Input
              name="correo"
              value={state.correo}
              onChange={handleChange}
              placeholder="Ej. example@gmail.com"
            />
          </FormControl>
          <FormControl mt="4" isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input
              name="password"
              value={state.password}
              onChange={handleChange}
              type="password"
            />
          </FormControl>
          <FormControl mt="4" w="fit-content" mx="auto">
            <Link as={RouterLink} to="/signup" color="blue.300">
              No estas registrado? Registrate Aqui!
            </Link>
          </FormControl>
          <Center>
            <Button
              type="submit"
              mt="4"
              width="80%"
              color="teal"
              variant="outline"
              onClick={handleSubmit}
            >
              Iniciar sesion
            </Button>
          </Center>
        </form>
      </Container>
    </Center>
  );
};
