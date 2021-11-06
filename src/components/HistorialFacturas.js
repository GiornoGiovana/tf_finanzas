import { Center, Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { FACTURAS } from "../fakeData";
import { useNavigate } from "react-router";

export const HistorialFacturas = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tcea");
  };

  return (
    <Center>
      <Flex direction="column">
        <Heading color="teal.300">Historial de Facturas</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Fecha de Emision</Th>
              <Th>Nombre de la Empresa</Th>
              <Th>Monto</Th>
              <Th>Fecha de Pago</Th>
              <Th>TCEA(%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {FACTURAS.map((factura) => (
              <Tr key={factura.id}>
                <Td>{factura.fechaEmision}</Td>
                <Td>{factura.nombreEmpresa}</Td>
                <Td>S/{factura.monto}</Td>
                <Td>{factura.fechaPago}</Td>
                {factura.tcea ? (
                  <Td>{factura.tcea}%</Td>
                ) : (
                  <Td>
                    <Button
                      size="sm"
                      variant="outline"
                      colorScheme="teal"
                      onClick={handleClick}
                    >
                      Calcular TCEA
                    </Button>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
    </Center>
  );
};
