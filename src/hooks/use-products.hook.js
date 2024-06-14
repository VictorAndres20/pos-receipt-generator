import { useEffect, useRef, useState } from "react";
import { readExcel } from "../_utils/bridge";
import { alertError, alertSuccess } from "../_utils/alert";

export const useProducts = () => {

    const productsRef = useRef([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        readExcel()
        .then(data => {
            productsRef.current = data.rows;
            alertSuccess("Productos cargados");
            setLoading(false);
        })
        .catch(err => {
            alertError(err.message);
        });
    },[]);

    return{
        loading,
        data: productsRef.current
    }
}