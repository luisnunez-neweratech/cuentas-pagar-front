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
import { getAllPlazoPagos } from "../../../../../../catalogos/services/plazoPago.service";
import { TipoProveedor } from "../../../../../interfaces/TipoProveedor";
import { useDashboardLayoutStore } from "../../../../../../../store/dashboardLayout.store";
import {
  addProveedorContratoPerfil,
  updateProveedorContratoPerfil,
  getColaboradoresContrato,
} from "../../../../services/proveedor.contrato.service";
import { getProveedorPerfil } from "../../../../services/proveedor.perfil.service";
import type { StepDomicilio } from "../../../../interface/stepDomicilio";
import { TipoContacto } from "../../../../../interfaces/TipoContacto";
import type {
  HistorialDocumentos,
  ListaContratos,
} from "../../../../interface/stepContrato";

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

  const stateProveedor = useProveedorContratoStore((state) => state);

  const proveedorContratoState = useProveedorContratoStore((state) => state);
  const setStepDomicilio = useProveedorContratoStore(
    (state) => state.setStepDomicilio
  );
  const setNewStepContrato = useProveedorContratoStore(
    (state) => state.setNewStepContrato
  );
  const setStepContacto = useProveedorContratoStore(
    (state) => state.setStepContacto
  );
  const setStepCuentaBancaria = useProveedorContratoStore(
    (state) => state.setStepCuentaBancaria
  );

  const setIsLoading = useDashboardLayoutStore((state) => state.setIsLoading);

  const [disableButtons, setDisableButtons] = useState(false);
  const [clickedBy, setClickedBy] = useState<number>(0);

  const handleDisableButtons = (state: boolean) => {
    setDisableButtons(state);
    setIsLoading(state);
  };

  const toNextStep = (proveedorId: number, stay?: boolean) => {
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
      condicionesPago: values.condicionesPago,
    };
    setStepPerfil(pasoPerfil);
    setProveedorId(proveedorId);
    if (!stay) {
      handleNext();
    }
  };

  const createMutation = useMutation({
    mutationFn: addProveedorContratoPerfil,
    onSuccess: (data) => {
      toNextStep(data.id);
    },
    onError: (error) => {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
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
      toNextStep(proveedorContratoState.id!, true);
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
          ? proveedorPerfil?.contratos[proveedorPerfil?.contratos.length - 1].id // TODO obtener el tulimo contrato
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

  const { data: giros } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "Giros"],
    queryFn: () => getAllGiros(),
  });

  const { data: plazoPagos } = useQuery({
    queryKey: ["CatalogMaster", "GetAll", "PlazoPago"],
    queryFn: () => getAllPlazoPagos(),
  });

  const initialFormValues = () => {
    if (proveedorPerfil) {
      if (proveedorPerfil.tipoProveedor === TipoProveedor.Ocasional.value) {
        navigate(`/proveedor/${id}`);
      }

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
        giroPrincipal: proveedorPerfil?.giroPrincipal ?? "",
        productos: productos,
        condicionesPago: proveedorPerfil.paymentTermsId ?? "",
      };
    }
    const stepPerfil = getStepPerfil();

    // Buscar el ID de "Inmediato" en plazoPagos para establecerlo por defecto
    const inmediatoId = plazoPagos?.find(
      (plazo) => plazo.descripcion.toLowerCase() === "inmediato"
    )?.id ?? "";

    return {
      tipoEntidad: stepPerfil ? stepPerfil.tipoEntidad : "",
      tipoPersona: stepPerfil ? stepPerfil.tipoPersona : "",
      rfc: stepPerfil ? stepPerfil.rfc : "",
      razonSocial: stepPerfil ? stepPerfil.razonSocial : "",
      alias: stepPerfil ? stepPerfil.alias : "",
      email: stepPerfil ? stepPerfil.email : "",
      giroPrincipal: stepPerfil ? stepPerfil.giroPrincipal : "",
      productos: stepPerfil ? stepPerfil.productos : [],
      condicionesPago: stepPerfil?.condicionesPago ?? inmediatoId,
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
      createMutation.reset();
      updateMutation.reset();
      if (
        (proveedorPerfil && proveedorPerfil.id) || // cargado por id del url
        stateProveedor.id // cargado de transfer
      ) {
        // cargar datos a zustand
        //domicilio step
        if (id) {
          setProveedorId(+id!);
        }
        const pasoDomicilio: StepDomicilio = {
          ...proveedorPerfil,
        };
        setStepDomicilio(pasoDomicilio);

        // contrato step
        let historialDocumentos: HistorialDocumentos[] = [];
        let listaContratos: ListaContratos[] = [];

        //proveedorDocumentosContrato
        if (proveedorPerfil && proveedorPerfil.proveedorDocumentosContrato) {
          Object.entries(proveedorPerfil.proveedorDocumentosContrato).map(
            ([_key, value]: any) => {
              if (value.mainDocument) {
                listaContratos.push({
                  id: value.mainDocument.contractId,
                  fechaInicio: value.mainDocument.fechaInicio,
                  fechaFin: value.mainDocument.fechaVencimiento,
                  indeterminado: value.mainDocument.esIndeterminado,
                  nombreArchivo: value.mainDocument.fileName,
                });
                //TODO agregar tipodocumento 6
              }

            }
          );
        }

        // documentos normales
        proveedorPerfil &&
          proveedorPerfil.proveedorDocumentos?.map((documento: any, index: number) => {
            historialDocumentos.push({
              id: index,
              fechaInicio: documento.fechaInicio,
              fechaFin: documento.fechaVencimiento,
              indeterminado: documento.esIndeterminado,
              fileUrl: documento.downloadUrl,
              fileName: documento.fileName,
              tipoDocumento:
                documento.contractDocumentType ?? documento.profileDocumentType,
            });
          });


          console.log('historialDocumentos', historialDocumentos)
        // contrato es array, porque es historico
        let colaboradoresData = [];
        if (proveedorColaboradores && proveedorColaboradores.length > 0) {
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
        if (proveedorPerfil?.contratos.length > 0) {
          setNewStepContrato({
            id: proveedorPerfil.contratos[0].id,
            contractor: proveedorPerfil.contratos[0].isNEContractor,
            noColaborador: proveedorPerfil.contratos[0].neCollaboratorNumber,
            colaboradores: colaboradoresData,
            historialDocumentos: historialDocumentos,
            listaContratos: listaContratos,
            documentos: [
              {
                id: 1,
                fechaInicio: "",
                fechaFin: "",
                indeterminado: true,
                fileValue: null,
                addToContrato: false,
                fileName: "",
                tipoDocumento: 0,
                newElement: true,
              },
            ],
          });
        }

        // set step contacto
        let contactosData = [];
        if (proveedorPerfil?.contactos.length > 0) {
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
        if (
          proveedorPerfil &&
          proveedorPerfil.cuentasBancarias &&
          proveedorPerfil.cuentasBancarias.length > 0
        ) {
          cuentasData = proveedorPerfil.cuentasBancarias.map((cuenta: any) => {
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
              noCuenta: cuenta.accountNumber,
              routeNumber: cuenta.routeNumber,
            };
          });
        } else {
          cuentasData = [...proveedorContratoState.stepCuentaBancaria!];
        }
        setStepCuentaBancaria(cuentasData);

        //click en modificar
        if (clickedBy === 1) {
          updateMutation.mutate({
            putContratoPayload: {
              id: proveedorPerfil.id,
              supplierTypeId: TipoProveedor.Contrato.value,
              originId: +values.tipoEntidad,
              legalPersonTypeId: +values.tipoPersona,
              legalName: values.razonSocial.trim(),
              tradeName: values.alias.trim(),
              rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
              email: values?.email ? values.email.trim() : "",
              supplierActivity: values.giroPrincipal
                ? values.giroPrincipal.trim()
                : "",
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
            },
            clickedBy: clickedBy,
          });
        } else {
          //click en siguiente
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
            condicionesPago: values.condicionesPago,
          };
          setStepPerfil(pasoPerfil);
          handleDisableButtons(false);
          handleNext();
        }
      } else {
        // crear nuevo proveedor contrato
        createMutation.mutate({
          supplierTypeId: TipoProveedor.Contrato.value,
          originId: +values.tipoEntidad,
          legalPersonTypeId: +values.tipoPersona,
          legalName: values.razonSocial.trim(),
          tradeName: values.alias.trim(),
          rfc: values?.rfc ? values.rfc.toUpperCase().trim() : "",
          email: values?.email ? values.email.trim() : "",
          supplierActivity: values.giroPrincipal
            ? values.giroPrincipal.trim()
            : "",
          productServiceIds:
            values.productos?.map((producto: any) => producto.id) ?? [],
          paymentTermsId: Number(values.condicionesPago),
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
    disableButtons,
    id,
    setClickedBy,
    giros,
    plazoPagos,
    navigate,
  };
};
