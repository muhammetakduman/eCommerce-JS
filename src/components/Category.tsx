import React, { useEffect, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import categoryService from '../services/CategoryService';
import { setLoading, setProducts } from '../redux/appSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { useMediaQuery, Typography, Box, Collapse } from '@mui/material';

function Category() {
    const isMobile = useMediaQuery('(max-width: 600px)'); // Mobil ekran kontrolü
    const [categories, setCategories] = useState<string[]>(); // Kategori listesi
    const [open, setOpen] = useState(false); // Menü aç/kapa durumu
    const dispatch = useDispatch();

    const handleCategory = async (e: React.ChangeEvent<HTMLInputElement>, categoryName: string) => {
        try {
            dispatch(setLoading(true));
            if (e.target.checked) {
                const products: ProductType[] = await categoryService.getProductsByCategoryName(categoryName);
                dispatch(setProducts(products));
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (err) {
            toast.error("Kategoriye bir hata oluştu: " + err);
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getAllCategories = async () => {
        try {
            dispatch(setLoading(true));
            const categories: string[] = await categoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            toast.error("Kategori listesi alınırken hata oluştu: " + error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <div
            style={{
                marginTop: isMobile ? '20px' : '60px',
                marginLeft: isMobile ? '10px' : '20px',
                width: isMobile ? '80%' : '200px',
            }}
        >
            {isMobile ? (
                // Mobilde "Filtreleme" başlıklı hamburger menü
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => setOpen(!open)} color="primary">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }}>
                        Kategoriler
                    </Typography>
                </Box>
            ) : (
                // Masaüstünde doğrudan kategoriler
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Kategoriler
                </Typography>
            )}
            <Collapse in={open || !isMobile}>
                {/* Kategoriler: Mobilde açılabilir menü, masaüstünde varsayılan */}
                {categories && categories.map((category: string, index: number) => (
                    <FormGroup key={index}>
                        <FormControlLabel
                            control={<Checkbox onChange={(e) => handleCategory(e, category)} />}
                            label={category}
                        />
                    </FormGroup>
                ))}
            </Collapse>
        </div>
    );
}

export default Category;
