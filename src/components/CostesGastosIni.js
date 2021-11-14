import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import { useOperacion } from "../hooks/useOperacion";

export const CostesGastosIni = () => {
  const { _, setOperacion } = useOperacion();

  const handleChange = (field, val) => {
    setOperacion((p) => ({ ...p, [field]: val }));
  };

  return (
    <Box>
      <Heading as="h3" size="md">
        Costes / Gastos Iniciales
      </Heading>
      <FormControl>
        <FormLabel>Motivo Inicial Tipo</FormLabel>
        <Select
          defaultValue="portes"
          onChange={(e) => handleChange("mit", e.target.value)}
        >
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
          <Select
            defaultValue="efectivo"
            onChange={(e) => handleChange("miv", e.target.value)}
          >
            <option value="efectivo">En Efectivo</option>
            <option value="porcentaje">En Porcentaje</option>
          </Select>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Motivo Inicial Monto</FormLabel>
          <Input onChange={(e) => handleChange("mim", e.target.value)} />
        </FormControl>
      </HStack>
      <Button mt="2" variant="outline" colorScheme="teal">
        Añadir
      </Button>
    </Box>
  );
};
