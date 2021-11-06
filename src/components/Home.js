import { Container, Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Factura } from "./Factura";
import { HistorialFacturas } from "./HistorialFacturas";

export const Home = () => {
  return (
    <Container maxW="100%">
      <Flex align="center">
        <Tabs orientation="vertical" width="100%">
          <TabList>
            <Tab>Registro de Facturas</Tab>
            <Tab>Historial de Facturas</Tab>
            <Tab>Cartera de Facturas</Tab>
          </TabList>

          <TabPanels flex="1">
            <TabPanel>
              <Factura />
            </TabPanel>
            <TabPanel>
              <HistorialFacturas />
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
