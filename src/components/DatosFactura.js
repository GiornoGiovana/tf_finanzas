import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";

export const DatosFactura = () => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Datos de Factura
      </Heading>
      <FormControl>
        <FormLabel>Fecha de Emision</FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>Fecha de Pago</FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl>
        <FormLabel>Monto</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>Retencion</FormLabel>
        <Input />
      </FormControl>
    </Box>
  );
};
