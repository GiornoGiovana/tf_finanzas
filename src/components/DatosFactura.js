import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";
import { useOperacion } from "../hooks/useOperacion";

export const DatosFactura = () => {
  const { _, setOperacion } = useOperacion();

  const handleChange = (field, val) => {
    setOperacion((p) => ({ ...p, [field]: val }));
  };

  return (
    <Box>
      <Heading as="h3" size="md">
        Datos de Factura
      </Heading>
      <FormControl>
        <FormLabel>Fecha de Emision</FormLabel>
        <Input
          type="date"
          onChange={(e) => handleChange("fechaEmision", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Fecha de Pago</FormLabel>
        <Input
          type="date"
          onChange={(e) => handleChange("fechaPago", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Monto</FormLabel>
        <Input onChange={(e) => handleChange("monto", e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Retencion</FormLabel>
        <Input onChange={(e) => handleChange("retencion", e.target.value)} />
      </FormControl>
    </Box>
  );
};
