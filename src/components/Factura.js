import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Flex, Heading, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";

export const Factura = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Factura enviada");
  };

  return (
    <Center>
      <Flex direction="column" mt="2">
        <Heading color="teal.300">Ingresar Factura</Heading>
        <form>
          <FormControl isRequired mt="2">
            <FormLabel>RUC de la Empresa</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Razon Social</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Numero de Factura</FormLabel>
            <Input />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Valor Nominal</FormLabel>
            <Input />
          </FormControl>

          <FormControl as="fieldset" mt="2">
            <FormLabel as="legend">Moneda</FormLabel>
            <RadioGroup defaultValue="pen">
              <HStack spacing="24px">
                <Radio value="pen">PEN</Radio>
                <Radio value="usd">USD</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <HStack mt="2">
            <FormControl>
              <FormLabel>Fecha de emision</FormLabel>
              <Input type="date" />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de pago</FormLabel>
              <Input type="date" />
            </FormControl>
          </HStack>

          <Center mt="2">
            <Button
              type="submit"
              mt="4"
              width="80%"
              color="teal"
              variant="outline"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Center>
        </form>
      </Flex>
    </Center>
  );
};
