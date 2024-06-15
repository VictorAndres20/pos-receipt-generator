import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { PictureAsPdfRounded } from '@mui/icons-material';
import { getBytesPDF } from "../_events/generate-pdf.event";
import { alertError } from "../_utils/alert";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export function PDFModal({ data }){

    const [open, setOpen] = useState(false);
    const [bytes, setBytes] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        getBytesPDF(data)
        .then(result => {
            setTimeout(() => {
                setBytes(result);
            }, 2000);
        })
        .catch(err => {
            alertError(err.message);
        })
    };
    const handleClose = () => {
        setOpen(false);
        setBytes(null);
    };

    const renderPDF = () => {
        if(!bytes) return <>No file</>;

        return(
            <div style={{ width: '100%' }}>
                <object width="100%" height="600px" 
		            data={`data:application/pdf;base64,${bytes}`} 
		            type="application/pdf" className="internal"
		        >
		            <embed 
		                src={`data:application/pdf;base64,${bytes}`}
		                type="application/pdf"
		            />
		        </object>
            </div>
        );
    }

    return(
        <>
            <Button variant="contained" endIcon={<PictureAsPdfRounded />} onClick={handleOpen}>
                VER FACTURA
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                {
                    renderPDF()
                }
            </Box>
            </Modal>
        </>
    );

}