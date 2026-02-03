import { Button, Grid } from "@mui/material";
import { useFacturaXml } from "./hooks/useFacturaXml";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { XmlLoadedModal } from "./components/xmlLoadedModal/XmlLoadedModal";
import { MassImportResultsModal, type MassImportResponse } from "./components/massImportResultsModal/MassImportResultsModal";
import { useState } from "react";

export const FacturaXml = () => {
  const {
    handleXmlFileChange,
    xmlFileName,
    onClickCargarInformacion,
    openModal,
    onClickCloseModal,
    infoMessages,
    warningMessages,
    fileInputXmlRef,
    isLoading
  } = useFacturaXml();

  const [openResultsModal, setOpenResultsModal] = useState(false);

  const sampleData: MassImportResponse = {
    "totalProcessed": 27,
    "successful": 26,
    "failed": 1,
    "results": [
      {
        "fileName": "F-4f7ff.xml",
        "success": false,
        "invoiceId": undefined,
        "invoiceNumber": "10MEX-1516426260126023954612",
        "fiscalFolio": "4f7ff8b5-24a1-407e-b741-99110918cec2",
        "supplierRfc": "CCO8605231N4",
        "supplierName": "CADENA COMERCIAL OXXO",
        "total": 150,
        "errorMessage": ["Error al subir los documentos"],
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: CADENA COMERCIAL OXXO (ID: 1, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 1",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'EA' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-6CAE3.xml",
        "success": true,
        "invoiceId": 2,
        "invoiceNumber": "119",
        "fiscalFolio": "6CAE37D0-309B-474E-B5A1-F999443AE33F",
        "supplierRfc": "EJB2407113L2",
        "supplierName": "ESTUDIO JURIDICO BEROPA",
        "total": 24360,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: ESTUDIO JURIDICO BEROPA (ID: 2, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 2",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": undefined,
      },
      {
        "fileName": "F-9CCEA.xml",
        "success": true,
        "invoiceId": 3,
        "invoiceNumber": "POSM-12543386",
        "fiscalFolio": "9CCEADD0-6726-49D6-9A06-FDDC9758D391",
        "supplierRfc": "ODM950324V2A",
        "supplierName": "OFFICE DEPOT DE MEXICO",
        "total": 578,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: OFFICE DEPOT DE MEXICO (ID: 3, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 3",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'H87' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-21bb4.xml",
        "success": true,
        "invoiceId": 4,
        "invoiceNumber": "M-160643",
        "fiscalFolio": "21bb4bfe-93c8-471f-a38c-fb6a5f5660ce",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 19731.6,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 4",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-60AE7.xml",
        "success": true,
        "invoiceId": 5,
        "invoiceNumber": "FFP-4155085",
        "fiscalFolio": "60AE709D-16EE-4B02-90F5-4F496755F8EA",
        "supplierRfc": "TIN6008112W0",
        "supplierName": "TELEVISION INTERNACIONAL",
        "total": 1900.27,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: TELEVISION INTERNACIONAL (ID: 5, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 5",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-66DBD.xml",
        "success": true,
        "invoiceId": 6,
        "invoiceNumber": "MEXR-006212924",
        "fiscalFolio": "66DBD98C-3DBC-4043-872D-F389AFC782EB",
        "supplierRfc": "DEM8801152E9",
        "supplierName": "DHL EXPRESS MEXICO",
        "total": 801.7,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: DHL EXPRESS MEXICO (ID: 6, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 6",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-308c7.xml",
        "success": true,
        "invoiceId": 7,
        "invoiceNumber": "0205-000272053261341716",
        "fiscalFolio": "308c7a1e-3675-4b2c-b020-6b3a6a25221d",
        "supplierRfc": "GES171116D7A",
        "supplierName": "GPDC ESTACIONES DE SERVICIO",
        "total": 934.96,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: GPDC ESTACIONES DE SERVICIO (ID: 7, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 7",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'LTR' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-699D8.xml",
        "success": true,
        "invoiceId": 8,
        "invoiceNumber": "BAAGC-138958",
        "fiscalFolio": "699D8C6C-CE29-4DF4-BE40-5B93265F46B3",
        "supplierRfc": "TSO991022PB6",
        "supplierName": "TIENDAS SORIANA",
        "total": 168.1,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: TIENDAS SORIANA (ID: 8, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 8",
          "Se importaron 5 conceptos",
          "Se guardaron 5 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'H87' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-2677F.xml",
        "success": true,
        "invoiceId": 9,
        "invoiceNumber": "FDF-4422547",
        "fiscalFolio": "2677F9C6-ACBA-45EF-B282-60FB2DAD26F8",
        "supplierRfc": "IMM9304016Z4",
        "supplierName": "INGRAM MICRO MEXICO",
        "total": 18124.31,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: INGRAM MICRO MEXICO (ID: 9, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 9",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-2744D.xml",
        "success": true,
        "invoiceId": 10,
        "invoiceNumber": "FDF-4440699",
        "fiscalFolio": "2744DECD-B11C-4642-9344-71251E6EB89E",
        "supplierRfc": "IMM9304016Z4",
        "supplierName": "INGRAM MICRO MEXICO",
        "total": 6329.25,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: INGRAM MICRO MEXICO (ID: 9, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 10",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'H87' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-02814.xml",
        "success": true,
        "invoiceId": 11,
        "invoiceNumber": "AE-6536743",
        "fiscalFolio": "02814CCA-ED02-4E19-AB78-9B9D2C51EADA",
        "supplierRfc": "PME811211B20",
        "supplierName": "PLUXEE MEXICO",
        "total": 2120.94,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: PLUXEE MEXICO (ID: 10, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 11",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-7356e.xml",
        "success": true,
        "invoiceId": 12,
        "invoiceNumber": "M-160649",
        "fiscalFolio": "7356ecf5-f955-4b13-ba45-293ec76e1699",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 3967.2,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 12",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-18817.xml",
        "success": true,
        "invoiceId": 13,
        "invoiceNumber": "S6-9068",
        "fiscalFolio": "18817722-13a5-4f70-aa26-e2737ec45366",
        "supplierRfc": "GUN0802062I0",
        "supplierName": "GRUPO UNDERGROUND",
        "total": 154,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: GRUPO UNDERGROUND (ID: 11, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 13",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-56462.xml",
        "success": true,
        "invoiceId": 14,
        "invoiceNumber": "SCTLW-57548",
        "fiscalFolio": "5646261E-7108-49BE-A3E8-97DC2631B24E",
        "supplierRfc": "CSI020226MV4",
        "supplierName": "CAFE SIRENA",
        "total": 236,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: CAFE SIRENA (ID: 12, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 14",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-a1f9e.xml",
        "success": true,
        "invoiceId": 15,
        "invoiceNumber": "1631",
        "fiscalFolio": "a1f9ee15-5b20-4a80-b383-f031e3b9b5c3",
        "supplierRfc": "PRB100506U59",
        "supplierName": "PROYECTOS RBKM",
        "total": 121800,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: PROYECTOS RBKM (ID: 13, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 15",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-A3AF1.xml",
        "success": true,
        "invoiceId": 16,
        "invoiceNumber": "FFP-4157944",
        "fiscalFolio": "A3AF11E4-A616-4904-9CE0-0CB576CF21F3",
        "supplierRfc": "TIN6008112W0",
        "supplierName": "TELEVISION INTERNACIONAL",
        "total": 148.55,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: TELEVISION INTERNACIONAL (ID: 5, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 16",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-b968c.xml",
        "success": true,
        "invoiceId": 17,
        "invoiceNumber": "M-160623",
        "fiscalFolio": "b968c2dc-89b3-443d-b418-7ec0b0eebf3a",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 10092,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 17",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-bd1da.xml",
        "success": true,
        "invoiceId": 18,
        "invoiceNumber": "M-160613",
        "fiscalFolio": "bd1da1bf-8fa6-4681-8d95-3ce702f9870f",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 8004,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 18",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-c193c.xml",
        "success": true,
        "invoiceId": 19,
        "invoiceNumber": "M-160625",
        "fiscalFolio": "c193c17b-0090-47fc-9bfe-7487aca572c2",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 7830,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 19",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-d9897.xml",
        "success": true,
        "invoiceId": 20,
        "invoiceNumber": "M-160636",
        "fiscalFolio": "d9897f68-f9f4-49cd-9921-560bc23cc2af",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 8073.6,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 20",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-dc3d9.xml",
        "success": true,
        "invoiceId": 21,
        "invoiceNumber": "Serie de transacciones pr-ASCG-006850",
        "fiscalFolio": "dc3d95db-2b31-4bac-8013-2a1be0e41058",
        "supplierRfc": "ASA140829MI8",
        "supplierName": "ARREGUIN SANCHEZ Y ASOCIADOS",
        "total": 81722,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: ARREGUIN SANCHEZ Y ASOCIADOS (ID: 14, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 21",
          "Se importaron 6 conceptos",
          "Se guardaron 6 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-DDF58.xml",
        "success": true,
        "invoiceId": 22,
        "invoiceNumber": "FDF-4450296",
        "fiscalFolio": "DDF58B69-7AFF-4368-84B8-FBCB6146AAF7",
        "supplierRfc": "IMM9304016Z4",
        "supplierName": "INGRAM MICRO MEXICO",
        "total": 2130.61,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: INGRAM MICRO MEXICO (ID: 9, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 22",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-E7D29.xml",
        "success": true,
        "invoiceId": 23,
        "invoiceNumber": "FA-16576",
        "fiscalFolio": "E7D29377-4B21-5E4D-8F49-7909367F8708",
        "supplierRfc": "NTM080617UPA",
        "supplierName": "NZXT TELECOMUNICACIONES DE MEXICO",
        "total": 4801.24,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: NZXT TELECOMUNICACIONES DE MEXICO (ID: 15, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 23",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'A9' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-e736d.xml",
        "success": true,
        "invoiceId": 24,
        "invoiceNumber": "T-19047",
        "fiscalFolio": "e736dd2d-92cf-4a2a-ba28-ad3258ccf22c",
        "supplierRfc": "TMO1306279C5",
        "supplierName": "TU MEJOR OPCION EN OFICINAS",
        "total": 2550.84,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: TU MEJOR OPCION EN OFICINAS (ID: 16, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 24",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-E2827.xml",
        "success": true,
        "invoiceId": 25,
        "invoiceNumber": "A-1308",
        "fiscalFolio": "E2827C68-6F25-4497-861D-B2FFB2A38562",
        "supplierRfc": "NMT170406376",
        "supplierName": "NEURO ME Y TI,",
        "total": 1200,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: NEURO ME Y TI, (ID: 17, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 25",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo",
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-FC095.xml",
        "success": true,
        "invoiceId": 26,
        "invoiceNumber": "FFP-4152224",
        "fiscalFolio": "FC0954DE-20EA-4786-90D1-EE738A96D414",
        "supplierRfc": "CES1009306R0",
        "supplierName": "CM EQUIPOS Y SOPORTE",
        "total": 107.18,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: CM EQUIPOS Y SOPORTE (ID: 18, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 26",
          "Se importaron 1 conceptos",
          "Se guardaron 1 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'E48' no encontrada en catálogo"
        ]
      },
      {
        "fileName": "F-fe527.xml",
        "success": true,
        "invoiceId": 27,
        "invoiceNumber": "M-160628",
        "fiscalFolio": "fe5279e6-0ad4-4593-a39c-d13eb126a914",
        "supplierRfc": "KCR0610195G0",
        "supplierName": "K C RENTAS",
        "total": 3828,
        "errorMessage": undefined,
        "messages": [
          "XML CFDI 4.0 parseado correctamente",
          "Proveedor creado automáticamente: K C RENTAS (ID: 4, Tipo: Ocasional)",
          "Tipo de documento: FACTURA",
          "Factura creada con ID: 27",
          "Se importaron 2 conceptos",
          "Se guardaron 2 registros de impuestos",
          "Archivo XML guardado correctamente"
        ],
        "warnings": [
          "Unidad de medida 'DAY' no encontrada en catálogo",
          "Unidad de medida 'DAY' no encontrada en catálogo"
        ]
      }
    ],
    "processingTimeSeconds": 36.6536492,
    "summary": "Importación masiva completada: 26 exitosos, 1 fallidos de 27 archivos procesados en 36.65 segundos."
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 3 }}>
      <Grid size={3} sx={{ marginTop: -5 }}>
        <>
          <input
            type="file"
            id="facturaXML"
            style={{ display: "none" }}
            onChange={handleXmlFileChange}
            ref={fileInputXmlRef}
            accept=".xml"
            multiple
          />

          <label htmlFor="facturaXML">
            <Button
              variant="outlined"
              component="span"
              style={{ marginTop: 14 }}
            >
              Seleccionar XML
              <FileUploadIcon />
            </Button>
          </label>
        </>
      </Grid>
      <Grid size={3} sx={{ marginTop: -4 }}>
        {xmlFileName && (
          <p style={{ marginTop: 0, color: "rgba(0, 0, 0, 0.6)" }}>
            {`${xmlFileName}`}
          </p>
        )}
      </Grid>

      <Grid size={4} />
      <Grid size={2}>
        <Button
          variant="contained"
          disabled={xmlFileName.length === 0 || isLoading}
          onClick={onClickCargarInformacion}
        >
          Cargar Información
        </Button>
        <Button
          variant="text"
          onClick={() => setOpenResultsModal(true)}
          sx={{ ml: 1 }}
        >
          Resultados Test
        </Button>
      </Grid>
      <XmlLoadedModal
        open={openModal}
        onClose={onClickCloseModal}
        warnings={warningMessages}
        info={infoMessages}
      />
      <MassImportResultsModal
        open={openResultsModal}
        onClose={() => setOpenResultsModal(false)}
      />
    </Grid>
  );
};
