import * as yup from "yup";

export const validationArchivoschema = yup.object().shape({
  fechaInicio: yup.date().required("Fecha inicio es requerida"),
  fechaFin: yup.date().when("fechaInicio", (fechaInicio, schema) => {
    const fecha = Array.isArray(fechaInicio) ? fechaInicio[0] : fechaInicio;
    if (fecha) {
      const dayAfter = new Date(fecha.getTime() + 86400000);

      return schema.min(dayAfter, "Tiene que ser mayor a Fecha Inicio");
    }

    return schema;
  }).required("Fecha fin es requerida"),
});
