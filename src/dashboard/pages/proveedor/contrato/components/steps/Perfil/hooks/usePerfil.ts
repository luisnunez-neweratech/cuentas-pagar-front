import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { validationSchema } from "../Validations";
import { useProveedorContratoStore } from "../../../../store/ProveedorContrato.store";
import type { StepPerfil } from "../../../../interface/stepPerfil";
import type { Giro } from "../../../../../../catalogos/giros/interfaces/Giro";
import { getAllGiros } from "../../../../../../catalogos/services/giros.service";
import { TipoProveedor } from "../../../../../interfaces/TipoProveedor";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import {
  addProveedorContratoPerfil,
  updateProveedorContratoPerfil,
  getProveedorDocumentos,
  getColaboradoresContrato,
  getProveedorCuentas,
} from "../../../../services/proveedor.contrato.service";
import { getProveedorPerfil } from "../../../../services/proveedor.perfil.service";
import type { StepDomicilio } from "../../../../interface/stepDomicilio";
import { TipoDocumentoProveedor } from "../../../../services/interfaces/TipoDocumentoProveedor";
import { TipoContacto } from "../../../../../interfaces/TipoContacto";

export const usePerfil = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleNext = useProveedorContratoStore((state) => state.handleNext);
  const setStepPerfil = useProveedorContratoStore(
    (state) => state.setStepPerfil
  );
  const setProveedorId = useProveedorContratoStore(
    (state) => state.setProveedorId
  );
  const getStepPerfil = useProveedorContratoStore(
    (state) => state.getStepPerfil
  );
  const proveedorContratoState = useProveedorContratoStore((state) => state);
  const setStepDomicilio = useProveedorContratoStore(
    (state) => state.setStepDomicilio
  );
  const setStepContrato = useProveedorContratoStore(
    (state) => state.setStepContrato
  );
  const setStepContacto = useProveedorContratoStore(
    (state) => state.setStepContacto
  );
  const setStepCuentaBancaria = useProveedorContratoStore(
    (state) => state.setStepCuentaBancaria
  );

  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const [disableButtons, setDisableButtons] = useState(false);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const toNextStep = (proveedorId: number) => {
    toast.success("Información Actualizada");
    const pasoPerfil: StepPerfil = {
      tipoProveedor: TipoProveedor.Contrato.value,
      tipoEntidad: +values.tipoEntidad,
      tipoPersona: +values.tipoPersona,
      razonSocial: values.razonSocial,
      alias: values.alias,
      rfc: values.rfc,
      email: values.email,
      giroPrincipal: values.giroPrincipal,
      productos: values.productos,
    };
    setStepPerfil(pasoPerfil);
    setProveedorId(proveedorId);
    handleNext();
  };

  const createMutation = useMutation({
    mutationFn: addProveedorContratoPerfil,
    onSuccess: (data) => {
      toNextStep(data.id);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProveedorContratoPerfil,
    onSuccess: () => {
      toast.success("Informacion Actualizada");
      toNextStep(proveedorContratoState.id!);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
      toast.error("Error al actualizar el proveedor");
      return;
    },
    onSettled: () => {
      handleDisableButtons(false);
    },
  });

  //cargar datos de perfil, domicilio, contrato
  const {
    isLoading,
    isError: isErrorGet,
    error: errorGet,
    data: proveedorPerfil,
  } = useQuery({
    queryKey: ["Supplier", `${id}`, "Details"],
    queryFn: () => getProveedorPerfil(id || ""),
    enabled: !!id,
  });

  // cargar documentos
  const {
    /* isError: isErrorGet,
    error: errorGet, */
    data: proveedorDocumentos,
  } = useQuery({
    queryKey: ["SupplierProfileDocument", `${id}`],
    queryFn: () => getProveedorDocumentos(id || ""),
    enabled: !!id,
  });

  // cargar colaboradores
  const {
    /* isError: isErrorGet,
    error: errorGet, */
    data: proveedorColaboradores,
  } = useQuery({
    queryKey: [
      "ContractCollaborator",
      "Contract",
      `${
        proveedorPerfil?.contratos && proveedorPerfil?.contratos.length > 0
          ? proveedorPerfil?.contratos[0].id
          : 0
      }`,
    ],
    queryFn: () =>
      getColaboradoresContrato(
        proveedorPerfil?.contratos && proveedorPerfil?.contratos.length > 0
          ? proveedorPerfil?.contratos[0].id
          : 0
      ),
    enabled: !!id && !!proveedorPerfil?.contratos,
  });

  // cargar cuentas bancarias
  const {
    /* isError: isErrorGet,
    error: errorGet, */
    data: proveedorCuentasBancarias,
  } = useQuery({
    queryKey: ["BankDetail", "Supplier", `${id}`],
    queryFn: () => getProveedorCuentas(id!),
    enabled: !!id,
  });

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const initialFormValues = () => {
    if (proveedorPerfil) {
      if (proveedorPerfil.tipoProveedor === TipoProveedor.Ocasional.value) {
        navigate(`/proveedor/${id}`);
      }

      const giroPrincipal = proveedorPerfil.giroPrincipal
        ? giros?.find((giro) => giro.id === proveedorPerfil.giroPrincipal)
        : null;

      const productos = giros?.filter((obj) =>
        proveedorPerfil.productos.includes(obj.id)
      );

      return {
        tipoEntidad: proveedorPerfil.tipoEntidad,
        tipoPersona: proveedorPerfil.tipoPersona,
        rfc: proveedorPerfil.rfc,
        razonSocial: proveedorPerfil.razonSocial,
        alias: proveedorPerfil.alias ?? "",
        email: proveedorPerfil.email,
        giroPrincipal: giroPrincipal?.descripcion ?? "",
        productos: productos,
      };
    }
    const stepPerfil = getStepPerfil();

    return {
      tipoEntidad: stepPerfil ? stepPerfil.tipoEntidad : "",
      tipoPersona: stepPerfil ? stepPerfil.tipoPersona : "",
      rfc: stepPerfil ? stepPerfil.rfc : "",
      razonSocial: stepPerfil ? stepPerfil.razonSocial : "",
      alias: stepPerfil ? stepPerfil.alias : "",
      email: stepPerfil ? stepPerfil.email : "",
      giroPrincipal: stepPerfil ? stepPerfil.giroPrincipal : "",
      productos: stepPerfil ? stepPerfil.productos : [],
    };
  };

  const {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialFormValues(),
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleDisableButtons(true);
      const giroPrincipal = giros?.find(
        (giro) => giro.descripcion === values.giroPrincipal
      );
      if (proveedorPerfil && proveedorPerfil.id) {
        // cargar datos a zustand
        //domicilio step
        setProveedorId(+id!);
        const pasoDomicilio: StepDomicilio = {
          ...proveedorPerfil,
        };
        setStepDomicilio(pasoDomicilio);

        // contrato step

        console.log("proveedorDocumentos", proveedorDocumentos);

        const csfDocument = proveedorDocumentos.find(
          (documento: any) =>
            documento.documentType === TipoDocumentoProveedor.CSF
        );
        let dataCsf = null;
        if (csfDocument) {
          dataCsf = {
            id: csfDocument.id,
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true, //TODO falta el dato de BD
            downloadUrl: csfDocument.downloadUrl,
            fileName: csfDocument.fileName,
          };
        } else {
          dataCsf = {
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true,
          };
        }

        const idRepLegalDocument = proveedorDocumentos.find(
          (documento: any) =>
            documento.documentType === TipoDocumentoProveedor.IdRepLegal
        );
        let dataidRepLegal = null;
        if (idRepLegalDocument) {
          dataidRepLegal = {
            id: idRepLegalDocument.id,
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true, //TODO falta el dato de BD
            downloadUrl: idRepLegalDocument.downloadUrl,
            fileName: idRepLegalDocument.fileName,
          };
        } else {
          dataidRepLegal = {
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true,
          };
        }

        const comDomDocument = proveedorDocumentos.find(
          (documento: any) =>
            documento.documentType === TipoDocumentoProveedor.CompDom
        );
        let dataComDom = null;
        if (comDomDocument) {
          dataComDom = {
            id: comDomDocument.id,
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true, //TODO falta el dato de BD
            downloadUrl: comDomDocument.downloadUrl,
            fileName: comDomDocument.fileName,
          };
        } else {
          dataComDom = {
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true,
          };
        }

        const poderRepDocument = proveedorDocumentos.find(
          (documento: any) =>
            documento.documentType === TipoDocumentoProveedor.PoderRep
        );
        let dataPoderRep = null;
        if (poderRepDocument) {
          dataPoderRep = {
            id: poderRepDocument.id,
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true, //TODO falta el dato de BD
            downloadUrl: poderRepDocument.downloadUrl,
            fileName: poderRepDocument.fileName,
          };
        } else {
          dataPoderRep = {
            fileValue: null,
            fechaInicio: "",
            fechaFin: "",
            indeterminado: true,
          };
        }

        // contrato es array, porque es historico
        let colaboradoresData = [];
        if (proveedorColaboradores.length > 0) {
          colaboradoresData = proveedorColaboradores.map((colaborador: any) => {
            return {
              id: colaborador.id,
              valido: true,
              noColaborador: colaborador.collaboratorNumber,
              nombre: colaborador.name,
              fechaInicio: colaborador.startDate.toString(),
              fechaFin: colaborador.tentativeEndDate.toString(),
              status: colaborador.status === "Active" ? true : false,
              newElement: false,
            };
          });
        } else {
          colaboradoresData = [
            ...proveedorContratoState.stepContrato?.colaboradores!,
          ];
        }
        console.log("proveedorPerfil", proveedorPerfil);
        if (proveedorPerfil.contratos.length > 0) {
          setStepContrato({
            id: proveedorPerfil.contratos[0].id,
            contractor: proveedorPerfil.contratos[0].isNEContractor,
            noColaborador: proveedorPerfil.contratos[0].neCollaboratorNumber,
            colaboradores: colaboradoresData,
            documentos: {
              ...proveedorContratoState.stepContrato?.documentos!,
              //tipo: "contrato", //propuesta
              principal: {
                id: proveedorPerfil.contratos[0].id,
                fileValue: undefined,
                fechaInicio: proveedorPerfil.contratos[0].startDate,
                fechaFin: proveedorPerfil.contratos[0].endDate,
                indeterminado: proveedorPerfil.contratos[0].indefiniteEnd,
                /* downloadUrl: poderRepDocument.downloadUrl,
                fileName: poderRepDocument.fileName, */
              },
              //proveedorDocumentos
              csf: dataCsf,
              idRepLegal: dataidRepLegal,
              compDomicilio: dataComDom,
              poderRepLegal: dataPoderRep,
              /*
              anexo: {
                fileValue: null,
                fechaInicio: "",
                fechaFin: "",
                indeterminado: true,
              },*/
            },
          });
        }

        // set step contacto
        let contactosData = [];
        if (proveedorPerfil.contactos.length > 0) {
          contactosData = proveedorPerfil.contactos.map((contacto: any) => {
            return {
              id: contacto.id,
              valido: true,
              tipoContacto:
                contacto.contactType === "Pago"
                  ? TipoContacto.Pago.value
                  : TipoContacto.Venta.value,
              contacto: contacto.name,
              telefono: contacto.phone,
              email: contacto.email,
              paginaWeb: contacto.website ?? "",
              newElement: false,
            };
          });
        } else {
          contactosData = [...proveedorContratoState.stepContacto!];
        }

        setStepContacto(contactosData);

        //cuentas bancarias
        let cuentasData = [];
        if (proveedorCuentasBancarias && proveedorCuentasBancarias.length > 0) {
          cuentasData = proveedorCuentasBancarias.map((cuenta: any) => {
            return {
              id: cuenta.id,
              valido: true,
              banco: cuenta.bankName,
              monedaVenta: cuenta.saleCurrencyId,
              clabe: cuenta.clabe,
              swift: cuenta.swiftCode,
              condicionesPago: cuenta.paymentTermsId,
              status: cuenta.isActive,
              downloadUrl: cuenta.downloadUrl,
              newElement: false,
            };
          });
        } else {
          cuentasData = [...proveedorContratoState.stepCuentaBancaria!];
        }
        setStepCuentaBancaria(cuentasData);

        updateMutation.mutate({
          id: proveedorPerfil.id,
          supplierTypeId: TipoProveedor.Contrato.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
          email: values?.email ? values.email.trim() : "",
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],

          // si tiene domicilio actulizarlo
          country: proveedorPerfil.pais ?? "",
          postalCode: proveedorPerfil.codigoPostal ?? "",
          state: proveedorPerfil.estado ?? "",
          municipality: proveedorPerfil.municipio ?? "",
          city: proveedorPerfil.ciudad ?? "",
          neighborhood: proveedorPerfil.colonia ?? "",
          street: proveedorPerfil.calle ?? "",
          interiorNumber: proveedorPerfil.numInterior,
          exteriorNumber: proveedorPerfil.numExterior,
        });
      } else {
        createMutation.mutate({
          supplierTypeId: TipoProveedor.Contrato.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
          email: values?.email ? values.email.trim() : "",
          supplierActivityId: giroPrincipal?.id ?? null,
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
        });
      }
    },
  });

  const onChangeAutocomplete = (newValues: Giro[]) => {
    setFieldValue("productos", newValues);
  };

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isErrorGet) {
      if (errorGet instanceof AxiosError) {
        toast.error(errorGet.response?.data ?? errorGet.message);
        return;
      }
      toast.error("Error al obtener el proveedor");
    }
  }, [isErrorGet]);

  return {
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    errors,
    onChangeAutocomplete,
    giros: giros ?? [],
    setFieldValue,
    disableButtons,
  };
};
