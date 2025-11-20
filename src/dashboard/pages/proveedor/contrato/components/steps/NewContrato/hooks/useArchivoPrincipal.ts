import { useState } from "react"

export const useArchivoPrincipal = () => {


    const [agregarPropuesta, setAgregarPropuesta] = useState(false);


    return {
        agregarPropuesta,
        setAgregarPropuesta
    }
}