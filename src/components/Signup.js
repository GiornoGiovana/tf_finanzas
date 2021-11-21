import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Container, Grid, Heading, Link } from "@chakra-ui/layout";
import { useForm } from "../hooks/useForm";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection } from "@firebase/firestore";

export const Signup = ({ setIsLogged }) => {
  const navigate = useNavigate();
  const [state, handleChange] = useForm({
    nombre: "",
    apellido: "",
    correo: "",
    ruc: "",
    dni: "",
    fechaNac: "",
    password: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, state.correo, state.password)
      .then(async (userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: state.nombre + " " + state.apellido,
        });
        console.log("User: ", userCredential);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            userId: userCredential.user.uid,
            born: state.fechaNac,
            dni: parseInt(state.dni),
            ruc: parseInt(state.ruc),
          });
          if (docRef.id) {
            setIsLogged(true);
            navigate("/");
          }
        } catch (e) {
          console.error(e);
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Center>
      <Container flex minW="fit-content">
        <Heading mx="auto" mt="4" w="fit-content" color="blackAlpha.300">
          Registro
        </Heading>
        <form>
          <Grid templateColumns="repeat(2, 300px)" gap={6} mt="4">
            <FormControl isRequired>
              <FormLabel>Nombre</FormLabel>
              <Input
                name="nombre"
                value={state.nombre}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Apellido</FormLabel>
              <Input
                name="apellido"
                value={state.apellido}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Correo Electronico</FormLabel>
              <Input
                type="email"
                name="correo"
                value={state.correo}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>RUC (Opcional)</FormLabel>
              <Input name="ruc" value={state.ruc} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>DNI</FormLabel>
              <Input name="dni" value={state.dni} onChange={handleChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Fecha de Nacimiento</FormLabel>
              <Input
                type="date"
                name="fechaNac"
                value={state.fechaNac}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <FormControl mt="4" w="fit-content" mx="auto">
            <Link as={RouterLink} to="/login" color="blue.300">
              Ya estas registrado? Inicia Sesion aqui!
            </Link>
          </FormControl>
          <Center>
            <Button
              type="submit"
              onClick={handleClick}
              mt="4"
              width="80%"
              color="teal"
              variant="outline"
            >
              Bienvenido
            </Button>
          </Center>
        </form>
      </Container>
    </Center>
  );
};
