import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

export const CostesGastosIni = () => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Costes / Gastos Iniciales
      </Heading>
      <FormControl>
        <FormLabel>Motivo Inicial Tipo</FormLabel>
        <Select placeholder="Motivo Inicial Tipo">
          <option value="estudio">Comision de Estudio</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Motivo Inicial Valor</FormLabel>
          <Select placeholder="Motivo Inicial Valor">
            <option value="efectivo">En Efectivo</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Motivo Inicial Monto</FormLabel>
          <Input />
        </FormControl>
      </HStack>
      <Button mt="2" variant="outline" colorScheme="teal">
        Añadir
      </Button>
    </Box>
  );
};
