import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Center, Grid } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { db } from "../firebase";
import { useOperacion } from "../hooks/useOperacion";
import { CalculadorFacturas } from "./CalculadorFacturas";
import { CostesGastosFin } from "./CostesGastosFin";
import { CostesGastosIni } from "./CostesGastosIni";
import { DatosFactura } from "./DatosFactura";
import { Results } from "./Results";

export const TCEA = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cgi, setCgi] = useState([]);
  const [cgf, setCgf] = useState([]);

  const { operacion, _ } = useOperacion();
  const navigate = useNavigate();

  const [op, setOp] = useState();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "operaciones", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setOp(docSnap.data());
      } else {
        alert("No such document!");
      }
    })();
  }, [id]);

  const handleClick = () => {
    calcularTCEA(op, operacion, cgi, cgf, id);
    onOpen();
  };

  return (
    <Center pt="4">
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resultados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Results id={id} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <form>
        <Grid templateColumns="repeat(2, 370px)" gap={4}>
          <DatosFactura op={op} />
          <CalculadorFacturas />
          <CostesGastosIni cgi={cgi} setCgi={setCgi} />
          <CostesGastosFin cgf={cgf} setCgf={setCgf} />
        </Grid>
        <Center my="3">
          <Button w="50%" colorScheme="teal" onClick={handleClick}>
            Calcular
          </Button>
        </Center>
      </form>
    </Center>
  );
};

const calcularTCEA = (op, operacion, cgi, cgf, docId) => {
  console.log("OP: ", op);
  console.log("operacion: ", operacion);
  console.log("cgi: ", cgi);
  console.log("cgf: ", cgf);

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

  console.log("Valor nom", parseInt(op.valorNominal));
  console.log("desct", desct);
  console.log("tci", tci);
  //Valor Neto
  let vn = parseInt(op.valorNominal) - desct;
  console.log("vn", vn);
  //Valor Recibido
  let vr = vn - parseInt(!op.retencion ? 0 : op.retencion) - tci;
  console.log("vr", vr);
  //Valor Entregado
  let ve =
    parseInt(op.valorNominal) +
    tcf -
    parseInt(!op.retencion ? 0 : op.retencion);
  console.log("ve", ve);
  //TCEA
  let tcea = Math.pow(ve / vr, diasAnio / numDias) - 1;

  const opeRef = doc(db, "operaciones", docId);
  setDoc(
    opeRef,
    {
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
    },
    { merge: true }
  );
};

// //Total Facturado
//       double tf = f.getTotalFacturado();
//       //Dias anio
//       double diasanio = (double)f.getCartera().getTasa().getDiasAnio();

//       //Numero de dias
//       int numDias =  (int)((f.getFechaPago().getTime() - f.getCartera().getTasa().getFechaDescuento().getTime())/86400000);
//       double te = Math.pow(1 + (f.getCartera().getTasa().getValor()/100), numDias/diasanio) - 1;
//       double td = te/(1 + te);
//       //Descuento
//       double desct = Math.rint(td * tf * 100)/100;
//       //Total Costo Inicial
//       double tci = 0;
//       ArrayList<CostoInicial> costosIniciales = new ArrayList<CostoInicial>();
//       costosIniciales = (ArrayList<CostoInicial>) facturaRepository.listarCostosInicialesDeFactura(f.getId());

//       for (CostoInicial data : costosIniciales) {
//           tci += data.getMontoCI();
//       }
//       //Total Costo Final
//       double tcf = 0;
//       ArrayList<CostoFinal> costosFinales = new ArrayList<CostoFinal>();
//       costosFinales = (ArrayList<CostoFinal>) facturaRepository.listarCostosFinalesDeFactura(f.getId());

//       for (CostoFinal data : costosFinales) {
//           tcf += data.getMontoCF();
//       }
//       //Valor Neto
//       double vn = f.getTotalFacturado() - desct;
//       //Valor Recibido
//       double vr = vn - f.getRetencion() - tci;
//       //Valor Entregado
//       double ve = f.getTotalFacturado() + tcf - f.getRetencion();
//       //TCEA
//       double tcea = Math.pow((ve/vr), (diasanio/numDias)) - 1;
