import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useForm } from "../hooks/useForm";

export const CostesGastosIni = ({ cgi, setCgi }) => {
  const [values, handleChange, cleanValues] = useForm({
    mit: "portes",
    miv: "efectivo",
    mim: "",
  });

  const handleClick = () => {
    setCgi((p) => [...p, values]);
    cleanValues();
  };

  return (
    <Box>
      <Heading as="h3" size="md">
        Costes / Gastos Iniciales
      </Heading>
      <FormControl>
        <FormLabel>Motivo Inicial Tipo</FormLabel>
        <Select name="mit" value={values.mit} onChange={handleChange}>
          <option value="portes">Portes</option>
          <option value="fotocopias">Fotocopias</option>
          <option value="comisionEstudio">Comisión de estudio</option>
          <option value="comisionDesembolso">Comisión de desembolso</option>
          <option value="comisionIntermediacion">
            Comisión de intermediación
          </option>
          <option value="gastosAdministracion">Gastos de administración</option>
          <option value="gastosNotariales">Gastos notariales</option>
          <option value="gastosRegistrales">Gastos registrales</option>
          <option value="seguro">Seguro</option>
          <option value="otrosPagos">Otros pagos</option>
        </Select>
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>Motivo Inicial Valor</FormLabel>
          <Select name="miv" value={values.miv} onChange={handleChange}>
            <option value="efectivo">En Efectivo</option>
            <option value="porcentaje">En Porcentaje</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Motivo Inicial Monto</FormLabel>
          <Input name="mim" value={values.mim} onChange={handleChange} />
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
          {cgi.map((val, idx) => (
            <Text key={idx} mx="2">
              {val.mit}: {val.mim}
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};
