import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { Button, useMediaQuery } from '@mui/material';
import { addProductToBasket } from '../redux/basketSlice';
import '../css/ProductDetail.css';

function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProducts] = useState<ProductType | null>();
    const [count, setCount] = useState<number>(0);
    const isMobile = useMediaQuery('(max-width:600px)'); // Mobil kontrolü

    useEffect(() => {
        const getProductById = async (productId: number) => {
            try {
                dispatch(setLoading(true));
                const product = await productService.getProductById(productId);
                setProducts(product);
            } catch (error) {
                toast.error("Ürün detayına giderken hata oluştu:" + error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        getProductById(Number(productId));
    }, [productId, dispatch]);

    const addBasket = () => {
        if (count === 0) {
            toast.warn("Lütfen kaç adet istediğinizi belirtiniz.");
            return;
        }

        if (product) {
            const payload: ProductType = { ...product, count };
            toast.success("Sepete eklendi: " + product.title);
            dispatch(addProductToBasket(payload));
        }
    };

    return (
        <Container maxWidth="lg">
            {product && (
                <div
                    className={`product-detail-container ${isMobile ? '' : 'desktop'}`}
                >
                    <div>
                        <img
                            src={product.image}
                            alt={product.title}
                            className={`product-image ${isMobile ? '' : 'desktop'}`}
                        />
                    </div>
                    <div className={`product-info ${isMobile ? '' : 'desktop'}`}>
                        <div className={`product-title ${isMobile ? '' : 'desktop'}`}>
                            {product.title}
                        </div>
                        <div className={`product-description ${isMobile ? '' : 'desktop'}`}>
                            {product.description}
                        </div>
                        <div className={`product-price ${isMobile ? '' : 'desktop'}`}>
                            {product.price} ₺
                        </div>
                        <div className={`quantity-controls ${isMobile ? '' : 'desktop'}`}>
                            <span
                                onClick={() => setCount(count + 1)}
                                className={`quantity-button ${isMobile ? '' : 'desktop'}`}
                            >
                                +
                            </span>
                            <span className={`quantity-button ${isMobile ? '' : 'desktop'}`}>
                                {count}
                            </span>
                            <span
                                onClick={() => setCount(Math.max(0, count - 1))}
                                className={`quantity-button ${isMobile ? '' : 'desktop'}`}
                            >
                                -
                            </span>
                        </div>
                        <div className={`add-to-basket ${isMobile ? '' : 'desktop'}`}>
                            <Button
                                onClick={addBasket}
                                color="error"
                                variant="contained"
                                size="medium"
                                sx={{ textTransform: 'none', width: isMobile ? '100%' : 'auto' }}
                            >
                                Sepete Ekle
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default ProductDetail;
