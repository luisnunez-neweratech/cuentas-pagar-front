import * as yup from "yup";

//const SUPPORTED_FORMATS = ["application/pdf", "image/jpeg"]; // mime type

export const validationArchivoschema = () => {
  return yup.object().shape({
    /* fechaInicio: yup.date().when("indeterminado", {
      is: true,
      then: (s) => s.required("Fecha Inicio es requerida"),
    }), */
    fechaInicio: yup.date().when(["filePrincipal"], (arrayValues, schema) => {
      const filePrincipal = arrayValues[0];      
      if(filePrincipal){
        return schema
            .required("Fecha Inicio requerida")
      }
      return schema;
    }),
    fechaFin: yup
      .date()
      .when(["fechaInicio", "indeterminado"], (arrayValues, schema) => {
        const fecha = arrayValues[0];
        const indeterminado = arrayValues[1];

        if (fecha && !indeterminado) {
          const dayAfter = new Date(fecha.getTime() + 86400000);

          return schema
            .min(dayAfter, "Tiene que ser mayor a Fecha Inicio")
            .required("Fecha Fin requerida");
        }

        return schema;
      }),
    filePrincipal: yup
      .mixed()
      .notRequired()
       /*.when(["fechaInicio"], (arrayValues, schema) => {
         const fechaInicio = arrayValues[0];

        if (fechaInicio) {
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
      }),  */   
  });
};
