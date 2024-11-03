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

function ProductDetail() {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProducts] = useState<ProductType | null>();
    const [count, setCount] = useState<number>(0);
    const isMobile = useMediaQuery('(max-width:600px)'); // Mobil kontrolü

    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await productService.getProductById(productId);
            setProducts(product);
        } catch (error) {
            toast.error("Ürün detayına giderken hata oluştu:" + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const addBasket = () => {
        if (product) {
            const payload: ProductType = {
                ...product,
                count: count
            };
            dispatch(addProductToBasket(payload));
        }
    };

    useEffect(() => {
        getProductById(Number(productId));
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                {product && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row', // Mobilde dikey, masaüstünde yatay
                            alignItems: isMobile ? 'center' : 'flex-start',
                            justifyContent: isMobile ? 'center' : 'flex-start',
                            marginTop: isMobile ? '20px' : '100px',
                            padding: isMobile ? '10px' : '0',
                        }}
                    >
                        <div>
                            <img
                                src={product.image}
                                width={isMobile ? 200 : 250}
                                height={isMobile ? 300 : 400}
                                alt={product.title}
                                style={{ marginBottom: isMobile ? '20px' : '0' }}
                            />
                        </div>
                        <div style={{ marginLeft: isMobile ? '0' : '100px', textAlign: isMobile ? 'center' : 'left' }}>
                            <div
                                style={{
                                    fontFamily: 'arial',
                                    fontSize: isMobile ? '20px' : '25px',
                                    fontWeight: isMobile ? 'bold' : 'normal',
                                }}
                            >
                                {product.title}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'arial',
                                    fontSize: isMobile ? '14px' : '15px',
                                    marginTop: isMobile ? '10px' : '25px',
                                    height: isMobile ? 'auto' : '100px',
                                }}
                            >
                                {product.description}
                            </div>
                            <div
                                style={{
                                    fontFamily: 'arial',
                                    fontSize: isMobile ? '30px' : '40px',
                                    fontWeight: 'bold',
                                    marginTop: isMobile ? '10px' : '0',
                                }}
                            >
                                {product.price} ₺
                            </div>
                            <div
                                style={{
                                    marginTop: isMobile ? '20px' : '40px',
                                    display: 'flex',
                                    justifyContent: isMobile ? 'center' : 'flex-start',
                                    alignItems: 'center',
                                }}
                            >
                                <span
                                    onClick={() => setCount(count + 1)}
                                    style={{
                                        fontSize: isMobile ? '30px' : '40px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginRight: '15px',
                                    }}
                                >
                                    +
                                </span>
                                <span
                                    style={{
                                        fontSize: isMobile ? '30px' : '40px',
                                        fontWeight: 'bold',
                                        marginRight: '15px',
                                    }}
                                >
                                    {count}
                                </span>
                                <span
                                    onClick={() => setCount(count - 1)}
                                    style={{
                                        fontSize: isMobile ? '30px' : '40px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        marginRight: '15px',
                                    }}
                                >
                                    -
                                </span>
                            </div>
                            <div style={{ marginTop: '15px', display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
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
        </div>
    );
}

export default ProductDetail;
