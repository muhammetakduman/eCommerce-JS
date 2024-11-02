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
import { useMediaQuery } from '@mui/material';
import '../css/Home.css';

function Home() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const dispatch = useDispatch();
    const { products } = useSelector((state: RootState) => state.app);

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
        <div className="category-container">
            <Category />
            <Container maxWidth="xl">
                <div className={isMobile ? "products-mobile" : "products"}>
                    {products && products.map((product: ProductType, index: number) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
