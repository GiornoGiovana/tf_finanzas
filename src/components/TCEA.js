import { Button } from "@chakra-ui/button";
import { Center, Grid } from "@chakra-ui/layout";
import { CalculadorFacturas } from "./CalculadorFacturas";
import { CostesGastosFin } from "./CostesGastosFin";
import { CostesGastosIni } from "./CostesGastosIni";
import { DatosFactura } from "./DatosFactura";

export const TCEA = () => {
  return (
    <Center pt="4">
      <form>
        <Grid templateColumns="repeat(2, 370px)" gap={4}>
          <DatosFactura />
          <CalculadorFacturas />
          <CostesGastosIni />
          <CostesGastosFin />
        </Grid>
        <Center my="3">
          <Button w="50%" colorScheme="teal">
            Calcular
          </Button>
        </Center>
      </form>
    </Center>
  );
};
