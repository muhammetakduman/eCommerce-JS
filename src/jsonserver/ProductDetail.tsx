import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { Button } from '@mui/material';
import { addProductToBasket } from '../redux/basketSlice';

function ProductDetail() {

    const { productId } = useParams()
    const dispatch = useDispatch()
    const [product, setProducts] = useState<ProductType | null>()
    const [count, setCount] = useState<number>(0)


    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true))
            const product: ProductType = await productService.getProductById(productId)
            setProducts(product)
        } catch (error) {
            toast.error("Ürün detayına giderken hata oluştu:" + error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    const addBasket = () => {
        if (product) {
            const payload: ProductType = {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload))
        }

    }

    useEffect(() => {
        getProductById(Number(productId))
    }, [])

    return (
        <div>
            <Container maxWidth="lg">
                {
                    product && <>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop: '100px' }}>
                            <div>
                                <img src={product.image} width={250} height={400} />
                            </div>
                            <div style={{ marginLeft: '100px', marginTop: '100px' }}>
                                <div style={{ fontFamily: 'arial', fontSize: '25px' }}>{product.title}</div>
                                <div style={{ fontFamily: 'arial', fontSize: '15px', marginTop: '25px', height: '100px' }}>{product.description}</div>
                                <div style={{ fontFamily: 'arial', fontSize: '40px', fontWeight: 'bold' }}>{product.price} ₺</div>

                                <div style={{ marginTop: '40px' }}>
                                    <span onClick={() => setCount(count + 1)} style={{ fontSize: '40px', fontWeight: 'bold', cursor: 'pointer', marginRight: '15px' }}> + </span>
                                    <span style={{ fontSize: '40px', fontWeight: 'bold', marginRight: '15px' }}> {count} </span>
                                    <span onClick={() => setCount(count - 1)} style={{ fontSize: '40px', fontWeight: 'bold', cursor: 'pointer', marginRight: '15px' }}> - </span>
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <Button onClick={addBasket} color='error' variant='contained' size='medium' sx={{ textTransform: 'none' }}>Sepete Ekle</Button>
                                </div>
                            </div>
                        </div>

                    </>
                }
            </Container>
        </div>
    )
}

export default ProductDetail
