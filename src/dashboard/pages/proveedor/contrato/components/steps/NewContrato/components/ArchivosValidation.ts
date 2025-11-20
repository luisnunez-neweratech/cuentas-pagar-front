import * as yup from "yup";

const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg"]; // mime type

export const validationArchivoschema = (idInput: string) => {
  return yup.object().shape({
    /* fechaInicio: yup.date().when("indeterminado", {
      is: true,
      then: (s) => s.required("Fecha Inicio es requerida"),
    }), */
    fechaInicio: yup.date().notRequired(),
    fechaFin: yup
      .date()
      .when(
        ["fechaInicio", "indeterminado"],
        (arrayValues, schema) => {
          const fecha = arrayValues[0];
          const indeterminado = arrayValues[1];
         

          if (fecha && !indeterminado ) {
            const dayAfter = new Date(fecha.getTime() + 86400000);

            return schema
              .min(dayAfter, "Tiene que ser mayor a Fecha Inicio")
              .required("Fecha Fin requerida");
          }

          return schema;
        }
      ),
    [idInput]: yup
      .mixed()
      .notRequired()
      .when(["downloadUrl"], (arrayValues, schema) => {
        const downloadUrl = arrayValues[0];

        if (!downloadUrl) {
          return schema
            .required("Archivo requerido")
            .test(
              "fileType",
              "Solo archivos con formato .pdf o .jpeg",
              (value: any) => {
                return value && SUPPORTED_FORMATS.includes(value.type);
              }
            );
        }
        return schema;
      }),
    /* , */
  });
};
