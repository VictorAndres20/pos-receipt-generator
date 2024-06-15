import { useEffect, useRef, useState } from "react";
import { readExcel } from "../_utils/bridge";
import { alertError, alertSuccess } from "../_utils/alert";
import { buildProducts } from "../_utils/products-group";

export const useProducts = () => {

    const productsRef = useRef([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        readExcel()
        .then(data => {
            productsRef.current = buildProducts(data.rows);
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