import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Flex, Heading, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import { useForm } from "../hooks/useForm";

export const Factura = () => {
  const [moneda, setMoneda] = useState("pen");
  const [facturaFields, handleChange] = useForm({
    rucEmpresa: "",
    razonSocial: "",
    numeroFactura: "",
    valorNominal: "",
    fechaEmision: "",
    fechaPago: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "facturas"), {
        ...facturaFields,
        rucEmpresa: parseInt(facturaFields.rucEmpresa),
        numeroFactura: parseInt(facturaFields.numeroFactura),
        valorNominal: parseInt(facturaFields.valorNominal),
        moneda,
      });
    } catch (error) {
      console.error(e);
    }
  };

  return (
    <Center>
      <Flex width="65%" direction="column">
        <Heading color="teal.300">Ingresar Factura</Heading>
        <form>
          <FormControl isRequired mt="2">
            <FormLabel>RUC de la Empresa</FormLabel>
            <Input
              name="rucEmpresa"
              value={facturaFields.rucEmpresa}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Razon Social</FormLabel>
            <Input
              name="razonSocial"
              value={facturaFields.razonSocial}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Numero de Factura</FormLabel>
            <Input
              name="numeroFactura"
              value={facturaFields.numeroFactura}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Valor Nominal</FormLabel>
            <Input
              name="valorNominal"
              value={facturaFields.valorNominal}
              onChange={handleChange}
            />
          </FormControl>

          <HStack mt="2">
            <FormControl as="fieldset">
              <FormLabel as="legend">Moneda</FormLabel>
              <RadioGroup value={moneda} onChange={(val) => setMoneda(val)}>
                <HStack spacing="24px">
                  <Radio value="pen">PEN</Radio>
                  <Radio value="usd">USD</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Tipo de factura</FormLabel>
              <Select defaultValue="efectivo">
                <option value="factura">Factura</option>
                <option value="letra">Letra</option>
                <option value="recibo">Recibo</option>
              </Select>
            </FormControl>
          </HStack>

          <HStack mt="2">
            <FormControl>
              <FormLabel>Fecha de emision</FormLabel>
              <Input
                type="date"
                name="fechaEmision"
                value={facturaFields.fechaEmision}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de pago</FormLabel>
              <Input
                type="date"
                name="fechaPago"
                value={facturaFields.fechaPago}
                onChange={handleChange}
              />
            </FormControl>
          </HStack>

          <Center mt="2">
            <Button
              type="submit"
              mt="4"
              width="80%"
              colorScheme="teal"
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </Center>
        </form>
      </Flex>
    </Center>
  );
};
