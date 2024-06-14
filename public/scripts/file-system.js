const fs = require("node:fs");
const path = require('node:path');
const readXlsxFile = require('read-excel-file/node')

const fileName = '../data/products';

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

module.exports = {
    readProductsExcel,
    readProductsJson,
    writeProductsJson
}
