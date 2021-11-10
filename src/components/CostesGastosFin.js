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
        <Select defaultValue="portes">
          <option value="portes">Portes</option>
          <option value="gastosAdmin">Gastos de administración</option>
          <option value="otrosGastos">Otros gastos</option>
        </Select>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Motivo Final Valor</FormLabel>
          <Select defaultValue="efectivo">
            <option value="efectivo">En Efectivo</option>
            <option value="porcentaje">En Porcentaje</option>
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
