import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Select } from "@chakra-ui/select";
import { useEffect } from "react";
import { useOperacion } from "../hooks/useOperacion";

export const CalculadorFacturas = () => {
  const { operacion, setOperacion } = useOperacion();

  useEffect(() => {
    setOperacion({
      diasAnio: 360,
      plazoTasa: 360,
      tipoTasa: "efectiva",
    });
  }, []);

  const handleChange = (field, val) => {
    setOperacion((p) => ({ ...p, [field]: val }));
  };

  return (
    <Box>
      <Heading as="h3" size="md">
        Tasa y Plazo
      </Heading>
      <FormControl>
        <FormLabel>Días por año</FormLabel>
        <Select
          defaultValue={360}
          onChange={(e) => handleChange("diasAnio", e.target.value)}
        >
          <option value={360}>360 días</option>
          <option value={365}>365 días</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel>Plazo de tasa</FormLabel>
        <Select
          defaultValue={360}
          onChange={(e) => handleChange("plazoTasa", e.target.value)}
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
          defaultValue="efectiva"
          onChange={(val) => handleChange("tipoTasa", val)}
        >
          <HStack spacing="24px">
            <Radio value="efectiva">Efectiva</Radio>
            <Radio value="nominal">Nominal</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>

      {operacion.tipoTasa === "nominal" && (
        <FormControl>
          <FormLabel>Periodo de Cap.</FormLabel>
          <Select
            defaultValue={360}
            onChange={(e) => handleChange("periodoCap", e.target.value)}
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
          <Input onChange={(e) => handleChange("tasa", e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Fecha de Descuento</FormLabel>
          <Input
            type="date"
            onChange={(e) => handleChange("fechaDescuento", e.target.value)}
          />
        </FormControl>
      </HStack>
    </Box>
  );
};
