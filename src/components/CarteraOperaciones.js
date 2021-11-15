import { Flex } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Select } from "@chakra-ui/select";
import { Box, Center, Heading, HStack } from "@chakra-ui/layout";
import { RadioGroup, Radio } from "@chakra-ui/radio";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../hooks/useAuth";

export const CarteraOperaciones = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [cgi, setCgi] = useState([]);
  const [cgf, setCgf] = useState([]);

  const user = useAuth();

  const [cgiValues, handleChange, cleanValues] = useForm({
    mit: "portes",
    miv: "efectivo",
    mim: "",
  });

  const [cgfValues, handleChange1, cleanValues1] = useForm({
    mft: "portes",
    mfv: "efectivo",
    mfm: "",
  });

  const [operacion, handleChange2, cleanValues2] = useForm({
    diasAnio: 360,
    plazoTasa: 360,
    tipoTasa: "efectiva",
    tasa: "",
    fechaDesc: "",
  });

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

  const handleClick1 = () => {
    setCgf((p) => [...p, cgfValues]);
    cleanValues1();
  };

  const handleClick = () => {
    setCgi((p) => [...p, cgiValues]);
    cleanValues();
  };

  const handleCalcular = (e) => {
    e.preventDefault();

    calcularCartera(operaciones, operacion.diasAnio);

    cleanValues2();
  };

  return (
    <form>
      <Flex justify="space-evenly">
        {/* Left */}
        <Flex direction="column">
          <FormControl>
            <FormLabel>Días por año</FormLabel>
            <Select
              name="diasAnio"
              value={operacion.diasAnio}
              onChange={handleChange2}
            >
              <option value={360}>360 días</option>
              <option value={365}>365 días</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Plazo de tasa</FormLabel>
            <Select
              name="plazoTasa"
              value={operacion.plazoTasa}
              onChange={handleChange2}
            >
              <option value={1}>Diario</option>
              <option value={15}>Quincenal</option>
              <option value={30}>Mensual</option>
              <option value={60}>Bimestral</option>
              <option value={90}>Trimestral</option>
              <option value={120}>Cuatrimestral</option>
              <option value={180}>Semestral</option>
              <option value={360}>Anual</option>
              {/* <option value={360}>Especial</option> */}
            </Select>
          </FormControl>

          <FormControl as="fieldset" mt="2">
            <FormLabel as="legend">Tipo Tasa</FormLabel>
            <RadioGroup
              name="tipoTasa"
              value={operacion.tipoTasa}
              onChange={handleChange2}
            >
              <HStack spacing="24px">
                <Radio value="efectiva">Efectiva</Radio>
                <Radio value="nominal">Nominal</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <HStack spacing="24px">
            <FormControl isRequired>
              <FormLabel>Tasa</FormLabel>
              <Input
                name="tasa"
                value={operacion.tasa}
                onChange={handleChange2}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha de Descuento</FormLabel>
              <Input
                type="date"
                name="fechaDesc"
                value={operacion.fechaDesc}
                onChange={handleChange2}
              />
            </FormControl>
          </HStack>
        </Flex>

        {/* Right */}
        <Flex direction="column" gridGap="4">
          <Box>
            <Heading as="h3" size="md">
              Costes / Gastos Iniciales
            </Heading>
            <FormControl>
              <FormLabel>Motivo Inicial Tipo</FormLabel>
              <Select name="mit" value={cgiValues.mit} onChange={handleChange}>
                <option value="portes">Portes</option>
                <option value="fotocopias">Fotocopias</option>
                <option value="comisionEstudio">Comisión de estudio</option>
                <option value="comisionDesembolso">
                  Comisión de desembolso
                </option>
                <option value="comisionIntermediacion">
                  Comisión de intermediación
                </option>
                <option value="gastosAdministracion">
                  Gastos de administración
                </option>
                <option value="gastosNotariales">Gastos notariales</option>
                <option value="gastosRegistrales">Gastos registrales</option>
                <option value="seguro">Seguro</option>
                <option value="otrosPagos">Otros pagos</option>
              </Select>
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel>Motivo Inicial Valor</FormLabel>
                <Select
                  name="miv"
                  value={cgiValues.miv}
                  onChange={handleChange}
                >
                  <option value="efectivo">En Efectivo</option>
                  <option value="porcentaje">En Porcentaje</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Motivo Inicial Monto</FormLabel>
                <Input
                  name="mim"
                  value={cgiValues.mim}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <Flex align="center">
              <Button
                mt="2"
                variant="outline"
                colorScheme="teal"
                onClick={handleClick}
              >
                Añadir
              </Button>
              <Flex>
                {cgi.map((val, idx) => (
                  <Text key={idx} mx="2">
                    {val.mim}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Box>

          <Box>
            <Heading as="h3" size="md">
              Costes / Gastos Finales
            </Heading>
            <FormControl>
              <FormLabel>Motivo Final Tipo</FormLabel>
              <Select name="mft" value={cgfValues.mft} onChange={handleChange1}>
                <option value="portes">Portes</option>
                <option value="gastosAdmin">Gastos de administración</option>
                <option value="otrosGastos">Otros gastos</option>
              </Select>
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel>Motivo Final Valor</FormLabel>
                <Select
                  name="mfv"
                  value={cgfValues.mfv}
                  onChange={handleChange1}
                >
                  <option value="efectivo">En Efectivo</option>
                  <option value="porcentaje">En Porcentaje</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Motivo Final Monto</FormLabel>
                <Input
                  name="mfm"
                  value={cgfValues.mfm}
                  onChange={handleChange1}
                />
              </FormControl>
            </HStack>

            <Flex align="center">
              <Button
                mt="2"
                variant="outline"
                colorScheme="teal"
                onClick={handleClick1}
              >
                Añadir
              </Button>
              <Flex>
                {cgf.map((val, idx) => (
                  <Text key={idx} mx="2">
                    {val.mfm}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Center mt="4" width="100%">
        <Button colorScheme="teal" width="25%" onClick={handleCalcular}>
          Calcular
        </Button>
      </Center>
    </form>
  );
};

const calcularCartera = (ops, diasAnio) => {
  let operaciones = [...ops];

  let tir = 0;
  let tcea = 0;

  let suma_vr = 0;

  operaciones.forEach((operacion) => {
    suma_vr += operacion.valorRecibido;
  });

  // let F = 1;
  let a = 0.0;
  let b = 0.8;

  for (let k = 0; k < 1000; k++) {
    let valc = 0.0;
    let c = (a + b) / 2;
    operaciones.forEach((operacion) => {
      valc += operacion.valorEntregado / Math.pow(1 + c, operacion.numDias);
    });

    if (valc < suma_vr) {
      b = c;
    } else {
      a = c;
    }

    if (Math.abs(valc - suma_vr) < 0.001) {
      tir = c;
      tcea = Math.pow(1 + tir, parseInt(diasAnio)) - 1;
      k = 1000;
    }
  }

  console.log("VALOR TOTAL RECIBIR: ", suma_vr);
  console.log("ACTUALIZAR TIR: ", tir * 100);
  console.log("ACTUALIZAR TCEA: ", tcea * 100);
};
