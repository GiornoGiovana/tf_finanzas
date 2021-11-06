import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";

export const CalculadorFacturas = () => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Calculador de Facturas
      </Heading>
      <FormControl>
        <FormLabel>Dias año</FormLabel>
        <Select placeholder="Dias año">
          <option value="option1">360</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Plazo de tasa</FormLabel>
        <Select placeholder="Plazo de Tasa">
          <option value="option1">Anual </option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>

      <FormControl as="fieldset" mt="2">
        <FormLabel as="legend">Tipo Tasa</FormLabel>
        <RadioGroup defaultValue="efectiva">
          <HStack spacing="24px">
            <Radio value="efectiva">Efectiva</Radio>
            <Radio value="nominal">Nominal</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      <HStack spacing="24px">
        <FormControl isRequired>
          <FormLabel>Tasa</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha de Descuento</FormLabel>
          <Input type="date" />
        </FormControl>
      </HStack>
    </Box>
  );
};
