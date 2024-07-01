import { Box, Card, Grid } from "@mui/material";
import { useEffect, useState } from "react";

export function Products({ groups, addFunction = () => {} }){

    const [groupSelected, setGroupSelected] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const newProducts = groups.find(g => g.group === groupSelected);
        setProducts(newProducts?.products ?? []);
    }, [groupSelected]);

    return(
        <Grid container>
            <Grid item xs={6}>
            <Box sx={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                {
                    groups.map((group, index) => (
                        <Box key={index} sx={{ width: '150px', padding: '20px 20px' }}>
                            <Card style={{ cursor: 'pointer' }} onClick={() => setGroupSelected(group['group'])}>
                                <Box sx={{ width: '100%', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    {group['group']}
                                </Box>
                            </Card>
                        </Box>
                    ))
                }
            </Box>
            </Grid>
            <Grid item xs={6}>
            <Box sx={{ width: '100%', height: '500px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                {
                    products.map((product, index) => (
                        <Box key={index} sx={{  width: '150px', padding: '20px 20px' }}>
                            <Card style={{ cursor: 'pointer' }} onClick={() => addFunction(product)}>
                                <Box sx={{ width: '100%', height: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    {product['descrip']}
                                </Box>
                            </Card>
                        </Box>
                    ))
                }
            </Box>
            </Grid>
        </Grid>
    );
}