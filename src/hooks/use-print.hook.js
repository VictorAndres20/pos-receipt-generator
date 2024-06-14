import { useState } from "react";

export const usePrint = () => {
    const [data, setData] = useState([]);

    const addData = (product) => {
        let newData = [...data];
        newData.push(product);
        setData(newData);
    }

    const editData = (index, quantity) => {
        let newData = [...data];
        const product = newData[index];
        if(!product) throw new Error('Producto no encontrado');
        newData[index] = {...product, quantity};
        setData(newData);
    }

    const removeData = (index) => {
        let newData = [...data];
        const product = newData[index];
        if(!product) throw new Error('Producto no encontrado');
        newData.splice(index, 1);
        setData(newData);
    }

    return{
        data,
        addData,
        editData,
        removeData
    }
}