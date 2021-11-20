import { Flex, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export const Results = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "operaciones", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        alert("No such document!");
      }
    })();
  }, [id]);

  return (
    <>
      {data ? (
        <Flex justify="space-between">
          <Flex direction="column" gridGap="2px">
            <Text>
              Tasa Efectiva Anual (sin costes): {parseFloat(data?.tasa)}%
            </Text>
            <Text>
              Tasa Efectiva a {data?.numDias} días:{" "}
              {parseFloat(data?.tasaEfectiva)}%
            </Text>
            <Text>
              Tasa Descontada a {data.numDias} días:{" "}
              {parseFloat(data?.tasaDescontada)}%
            </Text>
            <Text>
              Descuento por {data.numDias} días: {parseFloat(data?.descuento)}
            </Text>
          </Flex>

          <Flex direction="column" gridGap="2px">
            <Text>
              Costes Inciales Totales: {parseFloat(data?.totalCostoInicial)}
            </Text>
            <Text>Valor Neto: {parseFloat(data?.valorNeto)}</Text>
            <Text>
              Valor Total a Recibir: {parseFloat(data?.valorRecibido)}
            </Text>
            <Text>
              Costes Finales Totales: {parseFloat(data?.totalCostoFinal)}
            </Text>
            <Text>
              Valor Total a Entregar: {parseFloat(data?.valorEntregado)}
            </Text>
            <Text>
              <b>Tasa de Coste Efectiva Anual</b>: {parseFloat(data?.tcea)}%
            </Text>
          </Flex>
        </Flex>
      ) : (
        <Spinner />
      )}
    </>
  );
};
