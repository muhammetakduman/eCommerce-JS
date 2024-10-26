import React, { useEffect, useState } from 'react'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import categoryService from '../services/CategoryService';
import { setLoading, setProducts } from '../redux/appSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';

function Category() {

    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true));
            if (e.target.checked) {
                const products: ProductType[] = await categoryService.getProductsByCategoryName(categoryName)
                dispatch(setProducts(products))
            } else {
                const prodcuts: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(prodcuts))
            }
        } catch (err) {
            toast.error("Kategoriye bir hata oluştu:" + err)
        }
        finally {
            dispatch(setLoading(false));
        }


    }

    const [categories, setCategories] = useState<string[]>();

    const dispatch = useDispatch();

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true))
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategori listesi alınırken hata oluştu:" + error);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(() => {
        getAllCategories();
    }, [])
    return (
        <div style={{ marginTop: '60px', marginLeft: '20px' }}>
            {
                categories && categories.map((category: string, index: number) => (
                    <FormGroup>
                        <FormControlLabel key={index} control={<Checkbox onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCategory(e, category)} />} label={category} />
                    </FormGroup>
                ))
            }

        </div>
    )
}

export default Category
