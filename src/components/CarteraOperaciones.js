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
import { useAuth } from "../hooks/useAuth";
import {
  Table,
  TableCaption,
  Td,
  Tbody,
  Tr,
  Thead,
  Th,
} from "@chakra-ui/table";
import moment from "moment";

export const CarteraOperaciones = () => {
  const [operaciones, setOperaciones] = useState([]);
  const [cartera, setCartera] = useState(null);

  const [count, setCount] = useState(0);

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

  const [tipoTasa, setTipoTasa] = useState("efectiva");

  const [operacion, handleChange2, cleanValues2] = useForm({
    diasAnio: 360,
    plazoTasa: 360,
    tasa: "",
    fechaDescuento: "",
    peridoCap: 360,
  });

  const [operacion1, handleChange3, cleanValues3] = useForm({
    fechaEmi: "",
    fechaPago: "",
    valorNominal: "",
    retencion: "",
  });

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
    if (!user) return;
    setCount(count + 1);
    const operacionTasa = { ...operacion, tipoTasa };
    const operacionCompleta = { ...operacionTasa, ...operacion1, id: count };
    setOperaciones((p) => [...p, operacionCompleta]);
    cleanValues();
    cleanValues1();
    cleanValues3();
    calcularTCEA(operacion1, operacionTasa, cgi, cgf, count, setOperaciones);
  };

  useEffect(() => {
    calcularCartera(operaciones, setCartera);
  }, [operaciones]);

  return (
    <Box>
      <form>
        <Flex direction="column" justify="space-evenly" width="800px" m="auto">
          {/* Left */}
          <Flex gridGap="4">
            <Box w="100%">
              <Heading as="h3" size="md">
                Tasa y Plazo
              </Heading>
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
                <RadioGroup value={tipoTasa} onChange={(e) => setTipoTasa(e)}>
                  <HStack spacing="24px">
                    <Radio value="efectiva">Efectiva</Radio>
                    <Radio value="nominal">Nominal</Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>

              {tipoTasa === "nominal" && (
                <FormControl>
                  <FormLabel>Periodo de Cap.</FormLabel>
                  <Select
                    name="peridoCap"
                    value={operacion.periodoCap}
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
              )}

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
                    name="fechaDescuento"
                    value={operacion.fechaDescuento}
                    onChange={handleChange2}
                  />
                </FormControl>
              </HStack>
            </Box>

            <Box w="100%">
              <Heading as="h3" size="md">
                Datos de Operación
              </Heading>
              <FormControl>
                <FormLabel>Fecha de Emision o Giro</FormLabel>
                <Input
                  name="fechaEmi"
                  type="date"
                  value={operacion1.fechaEmi}
                  onChange={handleChange3}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Fecha de Pago</FormLabel>
                <Input
                  type="date"
                  name="fechaPago"
                  value={operacion1.fechaPago}
                  onChange={handleChange3}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Monto</FormLabel>
                <Input
                  name="valorNominal"
                  value={operacion1.valorNominal}
                  onChange={handleChange3}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Retencion</FormLabel>
                <Input
                  name="retencion"
                  value={operacion1.retencion}
                  onChange={handleChange3}
                />
              </FormControl>
            </Box>
          </Flex>

          {/* Right */}
          <Flex gridGap="4">
            <Box>
              <Heading as="h3" size="md">
                Costes / Gastos Iniciales
              </Heading>
              <FormControl>
                <FormLabel>Motivo Inicial Tipo</FormLabel>
                <Select
                  name="mit"
                  value={cgiValues.mit}
                  onChange={handleChange}
                >
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
                      {val.mit}: {val.mim}
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
                <Select
                  name="mft"
                  value={cgfValues.mft}
                  onChange={handleChange1}
                >
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
                      {val.mft}: {val.mfm}
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

      {cartera?.suma_vr > 0 && (
        <Table>
          <TableCaption placement="top">
            <Heading size="lg" as="h2">
              Resultados
            </Heading>
          </TableCaption>
          <Tbody>
            <Tr>
              <Td display="flex" gridGap="200px">
                (VR) Valor Total a Recibir por la cartera:{" "}
                <Box>{cartera?.suma_vr}</Box>
              </Td>
              <Td display="flex" gridGap="130px">
                (TCEA) Tasa de Coste Efectiva Anual de la cartera:{" "}
                <Box>{cartera?.ctea.toFixed(6)}%</Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      )}

      <br />
      <br />

      {operaciones.length > 0 && (
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Nº</Th>
              <Th>Fecha Giro</Th>
              <Th>Val. Nom.</Th>
              <Th>Fecha Ven.</Th>
              <Th>Días</Th>
              <Th>Retención</Th>
              <Th>TE %</Th>
              <Th>d %</Th>
              <Th>Descuento</Th>
              <Th>Coste Ini.</Th>
              <Th>Coste Fin.</Th>
              <Th>Val. Neto</Th>
              <Th>Val. Rec.</Th>
              <Th>Val. Ent.</Th>
              <Th>TCEA %</Th>
            </Tr>
          </Thead>
          <Tbody>
            {operaciones.map((op) => (
              <Tr key={op.id}>
                <Td>{op.id + 1}</Td>
                <Td whiteSpace="nowrap">{op.fechaEmi}</Td>
                <Td>{op.valorNominal}</Td>
                <Td whiteSpace="nowrap">{op.fechaPago}</Td>
                <Td>{op.numDias}</Td>
                <Td>{op.retencion}</Td>
                <Td>{op.tasaEfectiva}%</Td>
                <Td>{op.tasaDescontada}%</Td>
                <Td>{op.descuento}</Td>
                <Td>{op.totalCostoInicial}</Td>
                <Td>{op.totalCostoFinal}</Td>
                <Td>{op.valorNeto}</Td>
                <Td>{op.valorRecibido}</Td>
                <Td>{op.valorEntregado}</Td>
                <Td>{op.tcea.toFixed(7)}%</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

const calcularTCEA = (op, operacion, cgi, cgf, id, setOperaciones) => {
  //Total facturado
  let tf = parseFloat(op.valorNominal);
  //Dias anio
  let diasAnio = parseFloat(operacion.diasAnio);

  //Numero de dias
  let fechPago = moment(op.fechaPago, "YYYY/MM/DD");
  let fechDesc = moment(operacion.fechaDescuento, "YYYY/MM/DD");
  let fechDiff = parseInt(fechPago.diff(fechDesc, "days"));
  // let numDias = parseInt(fechDiff / 86400000);
  let numDias = fechDiff;

  let te = 0;

  if (operacion.tipoTasa === "nominal") {
    let m = operacion.plazoTasa / operacion.periodoCap;
    let n = numDias / operacion.periodoCap;
    te = Math.pow(1 + parseFloat(operacion.tasa) / 100 / m, n) - 1;
  } else {
    te = parseFloat(
      Math.pow(
        1 + parseFloat(operacion.tasa) / 100,
        numDias / operacion.plazoTasa
      ) - 1
    );
  }

  let td = te / (1 + te);

  //Descuento
  let desct = parseFloat(Math.round(td * tf * 100) / 100);

  //Total Costo Incial
  let tci = 0;
  let costosIniciales = [...cgi];

  costosIniciales.forEach((data) => {
    tci += parseInt(data.mim);
  });

  //Total Costo Final
  let tcf = 0;
  let costosFinales = [...cgf];

  costosFinales.forEach((data) => {
    tcf += parseInt(data.mfm);
  });
  //Valor Neto
  let vn = parseInt(op.valorNominal) - desct;
  //Valor Recibido
  let vr = vn - parseInt(!op.retencion ? 0 : op.retencion) - tci;
  //Valor Entregado
  let ve =
    parseInt(op.valorNominal) +
    tcf -
    parseInt(!op.retencion ? 0 : op.retencion);
  //TCEA
  let tcea = Math.pow(ve / vr, diasAnio / numDias) - 1;

  const opData = {
    diasAnio,
    numDias,
    tasa: parseFloat(operacion.tasa),
    tasaEfectiva: Math.round(te * 1000000000) / 10000000,
    tasaDescontada: Math.round(td * 1000000000) / 10000000,
    descuento: desct,
    totalCostoInicial: tci,
    totalCostoFinal: tcf,
    valorNeto: vn,
    valorRecibido: vr,
    valorEntregado: ve,
    tcea: Math.round(tcea * 1000000000) / 10000000,
  };

  setOperaciones((p) => {
    return p.map((op, idx) => {
      if (op?.id === id) {
        p[idx] = { ...op, ...opData };
      }
      return p[idx];
    });
  });
};

const calcularCartera = (ops, setCartera) => {
  if (ops.length === 0) return;
  let operaciones = [...ops];

  let tir = 0;
  let tcea = 0;

  let suma_vr = 0;
  let suma_ve = 0;
  let transcurridos = 0;
  let dias = 0;

  operaciones.forEach((operacion) => {
    suma_vr += operacion.valorRecibido;
    suma_ve += operacion.valorEntregado;
    dias += operacion.diasAnio;
    transcurridos += operacion.numDias;
  });

  tcea = Math.pow(suma_ve / suma_vr, dias / transcurridos) - 1;

  // let F = 1;
  // let a = 0.0;
  // let b = 0.8;

  // for (let k = 0; k < 1000; k++) {
  //   let valc = 0.0;
  //   let c = (a + b) / 2;
  //   operaciones.forEach((operacion) => {
  //     valc += operacion.valorEntregado / Math.pow(1 + c, operacion.numDias);
  //   });

  //   if (valc < suma_vr) {
  //     b = c;
  //   } else {
  //     a = c;
  //   }

  //   if (Math.abs(valc - suma_vr) < 0.001) {
  //     tir = c;
  //     tcea = Math.pow(1 + tir, parseInt(diasAnio)) - 1;
  //     k = 1000;
  //   }
  // }

  setCartera({ suma_vr, tir: tir * 100, ctea: tcea * 100 });
};
