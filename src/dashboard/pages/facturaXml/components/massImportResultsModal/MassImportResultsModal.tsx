import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    Typography,
    Box,
    Tooltip,
} from "@mui/material";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router";

export interface ImportResultItem {
    fileName?: string;
    success: boolean;
    invoiceId?: number;
    invoiceNumber?: string;
    fiscalFolio?: string;
    supplierRfc?: string;
    supplierName?: string;
    total?: number;
    errorMessage?: string[];
    messages: string[];
    warnings?: string[];
}

export interface MassImportResponse {
    totalProcessed: number;
    successful: number;
    failed: number;
    results: ImportResultItem[];
    processingTimeSeconds: number;
    summary: string;
}

interface MassImportResultsModalProps {
    open: boolean;
    onClose: () => void;
    data: MassImportResponse | null;
}

export const MassImportResultsModal = ({
    open,
    onClose,
    data,
}: MassImportResultsModalProps) => {
    if (!data) return null;

    const columns: GridColDef[] = [
        {
            field: "status",
            headerName: "Estado",
            width: 70,
            renderCell: (params: GridRenderCellParams<ImportResultItem>) => {
                const { success } = params.row;
                if (!success) {
                    return (
                        <Tooltip title="Fallido">
                            <ErrorIcon color="error" />
                        </Tooltip>
                    );
                }
                return (
                    <Tooltip title="Exitoso">
                        <CheckCircleIcon color="success" />
                    </Tooltip>
                );
            },
        },
        {
            field: "fileName", headerName: "Archivo", width: 150,
            renderCell: (params) => (
                params.row.invoiceId ? <Link to={`/facturas/${params.row.invoiceId}`}>{params.value}</Link> : params.row.fileName
            )
        },
        {
            field: "supplierName",
            headerName: "Proveedor",
            width: 200
        },
        {
            field: "total",
            headerName: "Total",
            width: 120,
            renderCell: (params) => (
                <NumericFormat
                    value={params.value}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale
                />
            ),
        },
        {
            field: "messages",
            headerName: "Mensajes",
            flex: 1,
            renderCell: (params) => {
                const { messages, errorMessage, warnings } = params.row;

                if (errorMessage) return <Typography variant="caption" color="error">{errorMessage}</Typography>

                // Prioritize warnings if any
                if (warnings && warnings.length > 0) {
                    return <Typography variant="caption">{warnings[0]} {warnings.length > 1 ? `(+${warnings.length - 1})` : ''}</Typography>
                }

                if (messages && messages.length > 0) {
                    // Show last message usually indicates success step
                    return <Typography variant="caption">{messages[messages.length - 1]}</Typography>
                }
                return null;
            }
        }
    ];

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            aria-labelledby="mass-import-dialog-title"
        >
            <DialogTitle id="mass-import-dialog-title">
                Resultados de Importación Masiva
            </DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                    <Grid container spacing={2}>
                        <Grid size={3}>
                            <Typography variant="body2">
                                Total Procesados: <strong>{data.totalProcessed}</strong>
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body2" color="success.main">
                                Exitosos: <strong>{data.successful}</strong>
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body2" color="error.main">
                                Fallidos: <strong>{data.failed}</strong>
                            </Typography>
                        </Grid>
                        <Grid size={3}>
                            <Typography variant="body2">
                                Tiempo: <strong>{data.processingTimeSeconds}s</strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>

                <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                        rows={data.results}
                        columns={columns}
                        getRowId={(row) => row.fileName} // unique identifier
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 25, 50]}
                        disableRowSelectionOnClick
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};
