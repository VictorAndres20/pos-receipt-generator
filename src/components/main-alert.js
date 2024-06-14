import React from "react";
import { CheckCircle, ErrorRounded } from '@mui/icons-material'

export const MainAlert = () => {

    return(
        <div id="alertV" style={{ width: '100%', position: 'absolute', top: '50px', zIndex: 100, display: 'none', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="toast active">  
                <div className="toast-content">
                    <div className="message">
                    <div id='alertSuccessIcon' style={{ display: 'none' }}>
                        <CheckCircle sx={{ color: 'green' }} />
                    </div>
                    <div id='alertErrorIcon' style={{ display: 'none' }}>
                        <ErrorRounded sx={{ color: 'red' }} />
                    </div>
                    <span id="alertTitle" className="text text-1">Success</span>
                    <div style={{ maxWidth: '300px', padding: '20px 10px', display: 'flex', flexDirection: 'column' }}>
                    <span id="alertMsg" className="text text-2">Your changes has been saved</span>
                    </div>
                    <input type='button' onClick={() => {document.getElementById('alertV').style.display='none';}} value="Ok" />
                    </div>
                </div>
                <div className="progress active"></div>
            </div>
        </div>
    );
}
