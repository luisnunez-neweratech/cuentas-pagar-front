import {
  Box,
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, green } from "@mui/material/colors";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRef, useState } from "react";

import type { GridColDef } from "@mui/x-data-grid";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { usecuentaBancaria } from "./hooks/usecuentaBancaria";
import { CuentasBancarias } from "./components/CuentasBancarias";

/* 
function createData(
  id: number,
  banco: string,
  monedaDeVenta: string,
  clabe: string,
  codigoSwift: string,
  condicionesDePago: string,
  caraturlaBancaria: string
) {
  return {
    id,
    banco,
    monedaDeVenta,
    clabe,
    codigoSwift,
    condicionesDePago,
    caraturlaBancaria,
  };
} */

export const CuentaBancaria = () => {
  /*   const [rows, setRows] = useState([
    createData(
      1,
      "BBVA",
      "Peso Mexicano",
      "123273373",
      "787681",
      "30 días",
      "archivo.pdf"
    ),
    createData(
      2,
      "Santander",
      "Dollar",
      "82827276",
      "000921",
      "90 días",
      "archivo2.pdf"
    ),
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<File | null>(null);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    {
      field: "banco",
      headerName: "Banco",
      width: 180,
      sortable: false,
      renderCell: (_params) => {
        return (
          <TextField
            variant="outlined"
            margin="normal"
            id="banco"
            label="Banco"
            name="banco"
          />
        );
      },
    },
    {
      field: "monedaDeVenta",
      headerName: "Moneda de venta",
      width: 130,
      sortable: false,
      renderCell: (_params) => {
        return (
          <Select
            id="moneda-venta-select"
            labelId="moneda-venta-label"
            //value={tipoPersona}
            //onChange={handleChangeTipoPersona}
          >
            <MenuItem value="pesos">Pesos</MenuItem>
            <MenuItem value="dolares">Dolares</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "clabe",
      headerName: "CLABE Interbancaria",
      width: 180,
      sortable: false,
      renderCell: (_params) => {
        return (
          <TextField
            variant="outlined"
            margin="normal"
            id="clabe"
            name="clabe"
            label="CLABE Interbancaria"
          />
        );
      },
    },
    {
      field: "codigoSwift",
      headerName: "Código SWIFT",
      width: 180,
      sortable: false,
      renderCell: (_params) => {
        return (
          <TextField
            variant="outlined"
            margin="normal"
            id="codigoSwift"
            name="codigoSwift"
            label="Código SWIFT"
          />
        );
      },
    },
    {
      field: "condicionesDePago",
      headerName: "Condiciones de pago",
      width: 160,
      sortable: false,
      renderCell: (_params) => {
        return (
          <Select
            id="condiciones-pago-select"
            //value={tipoPersona}

            //onChange={handleChangeTipoPersona}
          >
            <MenuItem value="30">30 Dias</MenuItem>
            <MenuItem value="60">60 Dias</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "caraturlaBancaria",
      headerName: "Carátula bancaria",
      width: 200,
      sortable: false,
      renderCell: (_params) => {
        return (
          <Button fullWidth variant="contained" component="label">
            Cargar Archivo
            <UploadFileIcon style={{ marginLeft: 8 }} />
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files?.length) {
                  setFileList(e.target.files[0]);
                }
              }}
              hidden
            />
          </Button>
        );
      },
    },
    {
      field: "actions",
      headerName: "",
      width: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={() => {
                setRows(rows.filter((rowfilter) => rowfilter.id !== params.id));
              }}
            >
              <DeleteIcon style={{ color: red[400] }} />
            </IconButton>
            {params.id === rows.length && (
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={() => {
                  setRows([
                    ...rows,
                    createData(
                      rows.length + 1,
                      "BBVA",
                      "Peso Mexicano",
                      "123273373",
                      "787681",
                      "30 días",
                      "archivo.pdf"
                    ),
                  ]);
                }}
              >
                <AddCircleIcon style={{ color: green[400] }} />
              </IconButton>
            )}
          </>
        );
      },
    },
  ]; */

  const { handleBack } = usecuentaBancaria();

  return (
    <Grid container sx={{ marginTop: 4 }} spacing={2}>
      {/* <Grid size={12}>
        <DataGrid
          disableColumnMenu
          rows={rows}
          rowHeight={90}
          //getRowId={(row) => row._id}
          columns={columns}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          sx={{ border: 0 }}
          disableRowSelectionOnClick
        />
      </Grid>
 */}

      <CuentasBancarias />
      <Grid size={12}>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
            Atras
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />

          <Button type="submit">Siguiente</Button>
        </Box>
      </Grid>
    </Grid>
  );
};
