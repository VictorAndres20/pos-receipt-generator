const { ipcRenderer } = window.require('electron');

export const readExcel = async () => {
    return await ipcRenderer.invoke('readProductsExcel');
}

export const getPDF = async (data) => {
    return await ipcRenderer.invoke('getPrintPDF', data);
}