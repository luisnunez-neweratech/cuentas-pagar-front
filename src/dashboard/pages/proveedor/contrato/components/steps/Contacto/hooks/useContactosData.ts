import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import { useFormik } from "formik";
import { validationSchema } from "../components/Validations";

interface props {
  id: number;
  isValidForm: (id: number, valid: boolean) => void;
}

export const useContactosData = ({ id, isValidForm }: props) => {
  const getStepContacto = useProveedorContratoStore(
    (state) => state.getStepContacto
  );
  const updateContacto = useProveedorContratoStore(
    (state) => state.updateContacto
  );

  const getInitialValues = () => {
    const contacto = getStepContacto()?.find((item) => item.id === id);

    return {
      tipoContacto: contacto?.tipoContacto,
      contacto: contacto?.contacto,
      telefono: contacto?.telefono,
      email: contacto?.email,
      paginaWeb: contacto?.paginaWeb,
    };
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    validateForm,
  } = useFormik({
    initialValues: getInitialValues(),
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onMouseLeaveComponent = async () => {

    handleSubmit(); // show the errors
    validateForm().then((errors) => {
      console.log('errros', errors)
      if (Object.keys(errors).length === 0) {
        isValidForm(id, true);
        updateContacto(id, {
          id: id,
          valido: true,
          tipoContacto: values.tipoContacto!,
          contacto: values.contacto!,
          telefono: values.telefono!,
          email: values.email!,
          paginaWeb: values.paginaWeb,
        });
      } else {
        isValidForm(id, false);
      }
    });
  };

  return {
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onMouseLeaveComponent,
  };
};
