import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductType, userType } from '../types/Types'
import { setCurrentUser, setLoading, setProducts } from '../redux/appSlice'
import productService from '../services/ProductService'
import { toast } from 'react-toastify'
import { RootState } from '../redux/store'
import ProductCard from '../components/ProductCard'
import '../css/Home.css'
import Category from '../components/Category'
import Container from '@mui/material/Container';
function Home() {
    const dispatch = useDispatch()
    const { products } = useSelector((state: RootState) => state.app)

    const getAllProducts = async () => {
        try {
            dispatch(setLoading(true));
            const response: ProductType[] = await productService.getAllProducts();
            if (response) {
                dispatch(setProducts(response));
            }
        } catch (error) {
            toast.error("Ürünler getirilirken bir hata oluştu:" + error)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
        const result = localStorage.getItem("currentUser")
        if (result) {
            const currentUser: userType = JSON.parse(result) as userType;
            dispatch(setCurrentUser(currentUser));
        }
    }, [])

    return (
        <div className='category'>
            <Category />
            <Container maxWidth="xl">
                <div className='products'>
                    {
                        products && products.map((product: ProductType, index: number) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Home