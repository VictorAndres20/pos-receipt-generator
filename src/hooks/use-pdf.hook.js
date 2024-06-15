import { useState } from "react";
import { getBytesPDF } from "../_events/generate-pdf.event";
import { alertError } from "../_utils/alert";

export const usePDF = () => {
    const [bytes, setBytes] = useState(null);

    const getBytes = (data) => {
        getBytesPDF(data)
        .then(result => {
            setBytes(result);
        })
        .catch(err => {
            alertError(err.message);
        })
    }

    return{
        bytes,
        getBytes
    }
}