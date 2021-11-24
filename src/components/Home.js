import { Container, Flex } from "@chakra-ui/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { Operacion } from "./Operacion";
import { HistorialOperaciones } from "./HistorialOperaciones";
import { CarteraOperaciones } from "./CarteraOperaciones";
import { useNavigate } from "react-router";

//https://api.apis.net.pe/v1/tipo-cambio-sunat

export const Home = ({ isLogged }) => {
  const navigate = useNavigate();
  if (!isLogged) {
    navigate("/login");
  }

  return (
    <Container maxW="100%">
      <Flex align="center">
        <Tabs orientation="vertical" width="100%">
          <TabList>
            <Tab>Registro de Operación</Tab>
            <Tab>Historial de Operaciones</Tab>
            <Tab>Cartera de Operaciones</Tab>
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
