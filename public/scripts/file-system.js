const fs = require("node:fs");
const path = require('node:path');
const readXlsxFile = require('read-excel-file/node')

const fileName = '../data/products';
const configurationFileName = '../data/settings';

const readProductsExcel = async () => {
    return await readXlsxFile(path.join(__dirname, `${fileName}.xlsx`), {
        schema: {
            'nomlinea': {
                prop: 'nomlinea',
                type: String
            },
            'codigo': {
                prop: 'codigo',
                type: String
            },
            'descrip': {
                prop: 'descrip',
                type: String
            },
            'precio': {
                prop: 'precio',
                type: Number
            }
        }
    });
}

const writeProductsJson = (data) => {
    console.log(data);
}

const readProductsJson = () => {
    return ['JSON'];
}

const readConfigurationJson = () => {
    const config = fs.readFileSync(`${path.join(__dirname, configurationFileName)}.json`, 'utf-8');
    return JSON.parse(config);
}

const readBase64InternalFile = (pathFile) => {
    return fs.readFileSync(pathFile, {encoding: 'base64'});
}
  
const deleteInternalFile = (pathFile) => {
    fs.unlinkSync(pathFile)
}

module.exports = {
    readProductsExcel,
    readProductsJson,
    writeProductsJson,
    readConfigurationJson,
    readBase64InternalFile,
    deleteInternalFile
}
