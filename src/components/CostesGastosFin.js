import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "../hooks/useForm";

export const CostesGastosFin = ({ cgf, setCgf }) => {
  const [values, handleChange, cleanValues] = useForm({
    mft: "portes",
    mfv: "efectivo",
    mfm: "",
  });

  const handleClick = () => {
    setCgf((p) => [...p, values]);
    cleanValues();
  };

  return (
    <Box>
      <Heading as="h3" size="md">
        Costes / Gastos Finales
      </Heading>
      <FormControl>
        <FormLabel>Motivo Final Tipo</FormLabel>
        <Select name="mft" value={values.mft} onChange={handleChange}>
          <option value="portes">Portes</option>
          <option value="gastosAdmin">Gastos de administración</option>
          <option value="otrosGastos">Otros gastos</option>
        </Select>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Motivo Final Valor</FormLabel>
          <Select name="mfv" value={values.mfv} onChange={handleChange}>
            <option value="efectivo">En Efectivo</option>
            <option value="porcentaje">En Porcentaje</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Motivo Final Monto</FormLabel>
          <Input name="mfm" value={values.mfm} onChange={handleChange} />
        </FormControl>
      </HStack>

      <Flex align="center">
        <Button
          mt="2"
          variant="outline"
          colorScheme="teal"
          onClick={handleClick}
        >
          Añadir
        </Button>
        <Flex>
          {cgf.map((val, idx) => (
            <Text key={idx} mx="2">
              {val.mfm}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
