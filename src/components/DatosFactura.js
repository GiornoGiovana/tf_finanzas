import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading } from "@chakra-ui/layout";

export const DatosFactura = ({ op }) => {
  return (
    <Box>
      <Heading as="h3" size="md">
        Datos de {op?.tipoOperacion}
      </Heading>
      <FormControl>
        <FormLabel>
          Fecha de {op?.tipoOperacion === "letra" ? "Giro" : "Emisión"}
        </FormLabel>
        <Input type="date" value={op?.fechaEmision} disabled />
      </FormControl>
      <FormControl>
        <FormLabel>
          Fecha de {op?.tipoOperacion === "letra" ? "Vencimiento" : "Pago"}
        </FormLabel>
        <Input type="date" value={op?.fechaPago} disabled />
      </FormControl>
      <FormControl>
        <FormLabel>
          {op?.tipoOperacion === "factura"
            ? "Total Facturado"
            : op?.tipoOperacion === "letra"
            ? "Valor Nominal"
            : "Total a Recibir"}
        </FormLabel>
        <Input value={op?.valorNominal} disabled />
      </FormControl>
      <FormControl>
        <FormLabel>Retencion</FormLabel>
        <Input value={op?.retencion} disabled />
      </FormControl>
    </Box>
  );
};
