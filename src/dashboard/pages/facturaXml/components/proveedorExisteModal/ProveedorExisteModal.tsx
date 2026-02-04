import { Backdrop, Box, Button, Grid, Paper } from "@mui/material"
import { useFacturaXMLStore } from "../../store/FacturaXml.store";

interface props {
    open: boolean;
    onClose: () => void;
}

export const ProveedorExisteModal = ({ open, onClose }: props) => {

    const proveedorExisteMessage = useFacturaXMLStore((state) => state.proveedorExisteMessage);

    return (
        <Backdrop
            sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
            open={open}
        >
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    "& > :not(style)": {
                        m: 1,
                        width: 800,
                        minHeight: 200,
                    },
                }}
            >
                <Paper
                    sx={{
                        paddingTop: 4,
                        paddingLeft: 2,
                        paddingRight: 2,
                        paddingBottom: 2,
                    }}
                    elevation={3}
                >
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <pre style={{ whiteSpace: "pre-wrap", fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif` }}>{proveedorExisteMessage}</pre>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                sx={{ marginTop: 2 }}
                                fullWidth
                                variant="contained"
                                onClick={onClose}
                                color="success"
                            >
                                Aceptar
                            </Button>
                        </Grid>
                        <Grid size={6}>
                            <Button
                                sx={{ marginTop: 2 }}
                                fullWidth
                                variant="contained"
                                onClick={onClose}
                                color="error"
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>

                </Paper>
            </Box>
        </Backdrop>
    )
}
