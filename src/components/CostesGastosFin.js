import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";

export const CostesGastosFin = () => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Costes / Gastos Finales
      </Heading>
      <FormControl>
        <FormLabel>Motivo Final Tipo</FormLabel>
        <Select placeholder="Motivo Inicial Tipo">
          <option value="portes">Portes</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Motivo Final Valor</FormLabel>
          <Select placeholder="Motivo Final Valor">
            <option value="efectivo">En Efectivo</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Motivo Final Monto</FormLabel>
          <Input />
        </FormControl>
      </HStack>
      <Button mt="2" variant="outline" colorScheme="teal">
        Añadir
      </Button>
    </Box>
  );
};
