import { Container, Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Operacion } from "./Operacion";
import { HistorialOperaciones } from "./HistorialOperaciones";

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
              <h1>Cartera de Facturas</h1>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};
