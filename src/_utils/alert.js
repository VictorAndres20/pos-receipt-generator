const alertId = 'alertV';
const title = 'alertTitle';
const messageId = 'alertMsg';
const successIcon = 'alertSuccessIcon';
const errorIcon = 'alertErrorIcon';

export const alertMessage = (msg) => {
    document.getElementById(messageId).innerHTML = msg;
    document.getElementById(alertId).style.display = 'flex';
} 

export const alertSuccess = (msg) => {
    document.getElementById(successIcon).style.display = 'flex';
    document.getElementById(errorIcon).style.display = 'none';
    document.getElementById(title).innerHTML = 'Correcto';
    alertMessage(msg);
}

export const alertError = (msg) => {
    document.getElementById(errorIcon).style.display = 'flex';
    document.getElementById(successIcon).style.display = 'none';
    document.getElementById(title).innerHTML = 'Error';
    alertMessage(msg);
}
