import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import HistoryIcon from "@mui/icons-material/History";
import { Box, Grid, Typography } from "@mui/material";
import { Historico } from "./Historico";
import { CargaArchivos } from "./CargaArchivos";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const TabsDocumentos = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    
      <Grid size={12}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab icon={<DriveFolderUploadIcon />} label="Carga de Documentos" />
          <Tab icon={<HistoryIcon />} label="Histórico" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <CargaArchivos />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Historico />
        </TabPanel>
      </Grid>
    
  );
};
