import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { usePrint } from './hooks/use-print.hook';
import { PDFModal } from './components/pdf-modal';
import { ReplayRounded } from '@mui/icons-material';
import { Products } from './components/products';

function AppContent({ products }){
    const print = usePrint();
  
    return(
      <Box sx={{ width: '100%' }}>
        <Grid container>
            <Grid item xs={6} sx={{ padding: '15px 15px' }}>
                <Box sx={{  backgroundColor: '#DDD',  }}>
                <Typography variant='h6'>Selecciona productos</Typography>
                <Divider />
                <Products groups={products} addFunction={(product) => print.addData(product)} />
                </Box>
            </Grid>
            <Grid item xs={6}>
                <Button variant='contained' color='error' onClick={() => print.resetData()} endIcon={<ReplayRounded />}>
                    Volver a empezar
                </Button>
                <Box sx={{ padding: '40px 0', height: '300px', overflowY: 'auto' }}>
                    {
                        print.data.products.map((product, index) => (
                            <Grid key={index} sx={{ margin: '10px 0' }} container>
                                <Grid item xs={2}>
                                    <Button onClick={() => print.sub(index)} variant='contained'>-</Button>
                                </Grid>
                                <Grid item xs={4}>
                                    <span style={{ fontSize: '15px' }}>{product.descrip}</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <span style={{ fontSize: '15px' }}>{product.quantity}</span>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => print.sum(index)} variant='contained'>+</Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button onClick={() => print.removeData(index)} color='error' variant='contained'>ELIMINAR</Button>
                                </Grid>
                            </Grid>
                        ))
                    }
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <input value={print.data.number} onChange={(e) => print.setNumber(e.target.value)} style={{ width: '200px', height: '40px' }} placeholder='Número de factura' />
                        <input value={print.data.paymentGot} onChange={(e) => print.setPaymentGot(e.target.value)} style={{ width: '200px', height: '40px', margin: '10px 0' }} placeholder='Dinero recibido' />
                    </Box>
                <PDFModal data={print.data} />
                </Grid>
        </Grid>
      </Box>
    );
}

export default AppContent;