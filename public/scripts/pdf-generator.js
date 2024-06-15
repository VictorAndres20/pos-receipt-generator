const PDFDocument = require('pdfkit');
const fs = require('node:fs');
const path = require('node:path');
const { readConfigurationJson, readBase64InternalFile, deleteInternalFile } = require('./file-system');

const initialPosY = 40;
const posYAddition = 24;
const pathFile = path.join(__dirname, `${Math.random()}.pdf`);

const USDFormater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const monthsLabels = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic'
];


const formatToUSD = (value) => {
    return USDFormater.format(value)
}

const buildPreZeros = (value) => {
    if(value.toString().length === 1) return `0${value}`;
    return value;
}

const buildDateStr = (date) => {
    return `${buildPreZeros(date.getDate())}-${monthsLabels[date.getMonth()]}-${date.getFullYear()}`;
}

const buildTimeStr = (date) => {
    return `${buildPreZeros(date.getHours())}:${buildPreZeros(date.getMinutes())}:${buildPreZeros(date.getSeconds())}`;
}

const getPrintPDF = async (data) => {
    await generatePDF(data);
    const bytes = readBase64InternalFile(pathFile);
    deleteInternalFile(pathFile);
    return bytes;
}

const generatePDF = (data) => {
    const config = readConfigurationJson();

    return new Promise((resolve, reject) => {        
        let writeStream = fs.createWriteStream(`${pathFile}`);         
        let doc = new PDFDocument({
            margins: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            }
        });
        doc.pipe(writeStream);

        let posY = initialPosY;
        posY = writeHeader(doc, config, data, posY);
        posY = writeProducts(doc, data, posY);
        posY = writeFooter(doc, config, posY);
        

        finishPDFDocument(doc);
        writeStream.on('finish', function (err) {
            if(err)
                reject(err);
            else
                resolve(true);
        });
    });
}

const writeHeader = (doc, config, data, posY) => {
    const today = new Date();
    writeCenteredPDFDoc(doc, `${config?.welcomeMessage}`, posY);
    posY += posYAddition;
    writeBoldCenteredPDFDoc(doc, `${config?.place}`, posY);
    posY += posYAddition;
    writeBoldCenteredPDFDoc(doc, `${config?.company}`, posY);
    posY += posYAddition;
    writeCenteredPDFDoc(doc, `${config?.companyType}`, posY);
    posY += posYAddition;
    writeCenteredPDFDoc(doc, `${config?.idName} ${config?.id}`, posY);
    posY += posYAddition;
    writeCenteredPDFDoc(doc, `${config?.address}`, posY);
    posY += posYAddition;
    writeCenteredPDFDoc(doc, `${config?.phone}`, posY);
    posY += posYAddition;
    writeBoldCenteredPDFDoc(doc, `${config?.prefix} ${data?.number}`, posY);
    posY += posYAddition;
    writePDFDoc(doc, `Fecha: ${buildDateStr(today)}`, 20, posY);
    writePDFDoc(doc, `Hora: ${buildTimeStr(today)}`, 470, posY);
    posY += posYAddition;
    return posY;
}

const writeProducts = (doc, data, posY) => {
    const products = data?.products ?? [];
    const moneyGot = data?.paymentGot ?? 0;
    let totalPrice = 0;

    const initialPosX = 20;
    writeBoldPDFDoc(doc, `Cod.`, 20, posY, 18);
    writeBoldPDFDoc(doc, `Cant.`, initialPosX + 70, posY, 18);
    writeBoldPDFDoc(doc, `Descripción`, initialPosX + 150, posY, 18);
    writeBoldPDFDoc(doc, `I.V.A. / Valor`, initialPosX + 430, posY, 18);
    posY += posYAddition;
    writeLinePDFDoc(doc, posY);
    posY += posYAddition;

    for (let index = 0; index < products.length; index++) {
        const product = products[index];
        const unitPrice = product?.precio ?? 0;
        const quantity = product?.quantity ?? 0;
        const total = unitPrice * quantity
        totalPrice += total;
        writePDFDoc(doc, `${product?.codigo}`, 20, posY, 16);
        writePDFDoc(doc, `${quantity}`, initialPosX + 70, posY, 16);
        writePDFDoc(doc, `${product?.descrip}`, initialPosX + 100, posY, 14);
        writeBoldPDFDoc(doc, ` - /  ${formatToUSD(total)}`, initialPosX + 460, posY, 16);
        posY = validateAdditionPage(doc, posY);
        posY += posYAddition;
    }
    posY = nextLine(doc, posY);
    writeLinePDFDoc(doc, posY);
    posY = nextLine(doc, posY);
    writePDFDoc(doc, `Detalle de valores`, initialPosX + 200, posY);
    posY = nextLine(doc, posY);
    writeLinePDFDoc(doc, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Valor Bruto:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(totalPrice)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Valor descuento:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(0)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Sub Total:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(totalPrice)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Impoconsumo:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(0)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `I.V.A.:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(0)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeLinePDFDoc(doc, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Total Factura:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(totalPrice)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `Propina:`, initialPosX + 200, posY);
    writePDFDoc(doc, `${formatToUSD(0)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `TOTA A PAGAR:`, initialPosX + 200, posY);
    writeBoldPDFDoc(doc, `${formatToUSD(totalPrice)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeLinePDFDoc(doc, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `RECIBE`, initialPosX + 200, posY);
    writeBoldPDFDoc(doc, `${formatToUSD(moneyGot)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);
    writeBoldPDFDoc(doc, `CAMBIO:`, initialPosX + 200, posY);
    writeBoldPDFDoc(doc, `${formatToUSD(moneyGot - totalPrice)}`, initialPosX + 450, posY);
    posY = nextLine(doc, posY);

    return posY;
}

const writeFooter = (doc, config, posY) => {
    if(config?.info === 1){
        writeCenteredPDFDoc(doc, `${config?.info1}`, posY);
        posY = nextLine(doc, posY);
        writeCenteredPDFDoc(doc, `${config?.info2}`, posY);
        posY = nextLine(doc, posY);
        writeCenteredPDFDoc(doc, `${config?.info3}`, posY);
        posY = nextLine(doc, posY);
        writeCenteredPDFDoc(doc, `${config?.info4}`, posY);
        posY = nextLine(doc, posY);
        writeCenteredPDFDoc(doc, `${config?.info5}`, posY);
        posY = nextLine(doc, posY);
    }
    writeCenteredPDFDoc(doc, `${config?.byeMessage}`, posY);
    posY = nextLine(doc, posY);

    return posY;
}

const nextLine = (doc, posY) => {
    posY += posYAddition;
    return validateAdditionPage(doc, posY);
}

const validateAdditionPage = (doc, posY) => {
    if(posY >= 700) {
        addPDFPage(doc);
        posY = initialPosY;
    }
    return posY;
}

const addPDFPage = (doc) => {
    doc.addPage();
}

const writeBoldPDFDoc = (
        doc, 
        value, 
        posX, 
        posY,
        fonSize = 15) => {
    doc.font('Helvetica-Bold')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

const writePDFDoc = (
        doc, 
        value, 
        posX, 
        posY,
        fonSize = 15) => {
    doc.font('Helvetica')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

const writeLinePDFDoc = (
        doc,
        posY) => {
    doc.save()
        .moveTo(10, posY)
        .lineTo(550, posY)
        .fill('#000000');
}

const writeCenteredPDFDoc = (doc, value, posY, fonSize = 22) => {
    const pageWidth = doc.page.width;
    const textWidth = doc.widthOfString(value);
    const posX = (pageWidth - textWidth) / 2;
    
    doc.font('Helvetica')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

const writeBoldCenteredPDFDoc = (doc, value, posY, fonSize = 22) => {
    const pageWidth = doc.page.width;
    const textWidth = doc.widthOfString(value);
    const posX = (pageWidth - textWidth) / 2;
    
    doc.font('Helvetica-Bold')
        .fontSize(fonSize)
        .text(value, posX, posY);
}

const finishPDFDocument = (doc) => {
    doc.end();
}

module.exports = {
    getPrintPDF
}