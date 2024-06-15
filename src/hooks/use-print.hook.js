import { useState } from "react";

const initialPrintData = {
    number: '',
    paymentType: '',
    paymentGot: '',
    products: []
}

export const usePrint = () => {
    const [data, setData] = useState(initialPrintData);

    const setNumber = (value) => {
        setData({...data, number: value});
    }

    const setPaymentType = (value) => {
        setData({...data, paymentType: value});
    }

    const setPaymentGot = (value) => {
        setData({...data, paymentGot: value});
    }

    const addData = (product) => {
        let products = [...data.products];
        products.push({...product, quantity: 1});
        setData({...data, products});
    }

    const sum = (index) => {
        editData(index, data.products[index].quantity + 1);
    }

    const sub = (index) => {
        editData(index, data.products[index].quantity - 1);
    }

    const editData = (index, quantity) => {
        let products = [...data.products];
        const product = products[index];
        if(!product) throw new Error('Producto no encontrado');
        products[index] = {...product, quantity};
        setData({...data, products});
    }

    const removeData = (index) => {
        let products = [...data.products];
        const product = products[index];
        if(!product) throw new Error('Producto no encontrado');
        products.splice(index, 1);
        setData({...data, products});
    }

    const resetData = () => {
        setData(initialPrintData);
    }

    return{
        data,
        setNumber,
        setPaymentType,
        setPaymentGot,
        addData,
        editData,
        removeData,
        resetData,
        sum,
        sub
    }
}