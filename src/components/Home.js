import { Container, Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Operacion } from "./Operacion";
import { HistorialOperaciones } from "./HistorialOperaciones";
import { CarteraOperaciones } from "./CarteraOperaciones";

//https://api.apis.net.pe/v1/tipo-cambio-sunat

export const Home = () => {
  return (
    <Container maxW="100%">
      <Flex align="center">
        <Tabs orientation="vertical" width="100%">
          <TabList>
            <Tab>Registro de Operación</Tab>
            <Tab>Historial de Operaciones</Tab>
            <Tab>Cartera de Facturas</Tab>
          </TabList>

          <TabPanels flex="1">
            <TabPanel>
              <Operacion />
            </TabPanel>
            <TabPanel>
              <HistorialOperaciones />
            </TabPanel>
            <TabPanel>
              <CarteraOperaciones />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};
