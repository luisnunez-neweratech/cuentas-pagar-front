import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf","image/jpeg"]; // mime type

export const validationArchivoschema = (idInput: string) => {
  return yup.object().shape({
    fechaInicio: yup.date().required("Fecha inicio es requerida"),
    fechaFin: yup
      .date()
      .when("fechaInicio", (fechaInicio, schema) => {
        const fecha = Array.isArray(fechaInicio) ? fechaInicio[0] : fechaInicio;
        if (fecha) {
          const dayAfter = new Date(fecha.getTime() + 86400000);

          return schema.min(dayAfter, "Tiene que ser mayor a Fecha Inicio");
        }

        return schema;
      })
      .required("Fecha fin es requerida"),
    [idInput]: yup
      .mixed()
      .required("A file is required")
      .test(
        "fileType",
        "Solo archivos con formato .pdf o .jpeg",
        (value: any) => {
          console.log('este values', value)
          console.log(SUPPORTED_FORMATS.includes(value.type))
          return value && SUPPORTED_FORMATS.includes(value.type)}
      ),
  });
};
