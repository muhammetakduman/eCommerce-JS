import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductType } from '../types/Types';
import { setLoading, setProducts } from '../redux/appSlice';
import productService from '../services/ProductService';
import { toast } from 'react-toastify';
import { RootState } from '../redux/store';
import ProductCard from '../components/ProductCard';
import Category from '../components/Category';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import '../css/Home.css';

function Home() {
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.app);
    const isMobile = useMediaQuery('(max-width:600px)'); // Mobil kontrolü

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response: ProductType[] = await productService.getAllProducts();
            if (response) {
                dispatch(setProducts(response));
            }
        } catch (error) {
            toast.error("Ürünler getirilirken bir hata oluştu:" + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ padding: '20px' }}>
            <Box
                display="flex"
                flexDirection={isMobile ? 'column' : 'row'}
                gap={3}
            >

                <Box flex={isMobile ? '1' : '0 0 250px'}>
                    <Category />
                </Box>


                <Box
                    display="grid"
                    gridTemplateColumns={isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'}
                    gap={3}
                    flex="1"
                >
                    {products && products.map((product: ProductType, index: number) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}

export default Home;
