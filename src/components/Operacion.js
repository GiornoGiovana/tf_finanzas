import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Center, Flex, Heading, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { addDoc, collection } from "@firebase/firestore";
import { useState } from "react";
import { db, auth } from "../firebase";
import { useForm } from "../hooks/useForm";

export const Operacion = () => {
  const user = auth?.currentUser;
  const [operacionTipo, setOperacionTipo] = useState("factura");
  const [moneda, setMoneda] = useState("pen");
  const [operacionFields, handleChange, restartFields] = useForm({
    rucEmpresa: "",
    razonSocial: "",
    numeroFactura: "",
    valorNominal: "",
    fechaEmision: "",
    fechaPago: "",
    retencion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, "operaciones"), {
        ...operacionFields,
        userId: user.uid,
        tipoOperacion: operacionTipo,
        rucEmpresa: parseInt(operacionFields.rucEmpresa),
        numeroFactura: parseInt(operacionFields.numeroFactura),
        valorNominal: parseInt(operacionFields.valorNominal),
        moneda,
      });
      alert(`Se ha creado una nueva ${operacionTipo}`);
      restartFields();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center>
      <Flex width="65%" direction="column">
        <Heading color="teal.300">Registrar Operación</Heading>
        <form>
          <FormControl isRequired mt="2">
            <FormLabel>RUC de la Empresa</FormLabel>
            <Input
              name="rucEmpresa"
              value={operacionFields.rucEmpresa}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Razon Social</FormLabel>
            <Input
              name="razonSocial"
              value={operacionFields.razonSocial}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Número de Factura</FormLabel>
            <Input
              name="numeroFactura"
              value={operacionFields.numeroFactura}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl isRequired mt="2">
            <FormLabel>Valor Nominal</FormLabel>
            <Input
              name="valorNominal"
              value={operacionFields.valorNominal}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl isRequired mt="2">
            <FormLabel>Retencion</FormLabel>
            <Input
              name="retencion"
              value={operacionFields.retencion}
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
              <FormLabel>Tipo de Operación</FormLabel>
              <Select
                value={operacionTipo}
                onChange={(val) => setOperacionTipo(val.target.value)}
              >
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
                value={operacionFields.fechaEmision}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de pago</FormLabel>
              <Input
                type="date"
                name="fechaPago"
                value={operacionFields.fechaPago}
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
