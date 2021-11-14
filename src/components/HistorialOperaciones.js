import { Center, Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy } from "@firebase/firestore";
import { db } from "../firebase";

export const HistorialOperaciones = () => {
  const navigate = useNavigate();
  const [operaciones, setOperaciones] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "operaciones"),
      orderBy("fechaEmision", "asc")
    );
    const unsub = onSnapshot(q, (docs) => {
      docs.forEach((data) => {
        setOperaciones((p) => [...p, data.data()]);
      });
    });
    return unsub;
  }, []);

  const handleClick = () => {
    navigate("/tcea");
  };

  return (
    <Center>
      <Flex direction="column">
        <Heading color="teal.300">Historial de Operaciones</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tipo de Operacion</Th>
              <Th>Fecha de Emision</Th>
              <Th>Nombre de la Empresa</Th>
              <Th>Monto</Th>
              <Th>Fecha de Pago</Th>
              <Th>TCEA(%)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operaciones?.map((operacion, idx) => (
              <Tr key={idx}>
                <Td>{textFormatted(operacion.tipoOperacion)}</Td>
                <Td>{operacion.fechaEmision}</Td>
                <Td>{operacion.razonSocial}</Td>
                <Td>
                  {operacion.moneda === "pen" ? "S" : "$"}
                  {operacion.valorNominal}
                </Td>
                <Td>{operacion.fechaPago}</Td>
                {operacion.tcea ? (
                  <Td>{operacion.tcea}%</Td>
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

const textFormatted = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1, text.length);
};
