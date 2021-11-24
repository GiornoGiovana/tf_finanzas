import { Center, Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export const HistorialOperaciones = () => {
  const navigate = useNavigate();
  const [operaciones, setOperaciones] = useState([]);
  const user = useAuth();

  useEffect(() => {
    let unsub;
    if (user) {
      const q = query(
        collection(db, "operaciones"),
        where("userId", "==", user?.uid)
      );
      unsub = onSnapshot(q, (docs) => {
        const arr = [];
        docs.forEach((data) => {
          arr.push({ ...data.data(), id: data.id });
        });
        setOperaciones([...arr]);
      });
    }
    return unsub;
  }, [user]);

  const handleClick = (id) => {
    navigate(`/tcea/${id}`);
  };

  return (
    <Center>
      <Flex direction="column">
        <Heading color="teal.300">Historial de Operaciones</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tipo de Operacion</Th>
              <Th>Fecha de Emision o giro</Th>
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
                  {operacion.moneda === "pen" ? "S/" : "$/"}
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
                      onClick={() => handleClick(operacion.id)}
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
