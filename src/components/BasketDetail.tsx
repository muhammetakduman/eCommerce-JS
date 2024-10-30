import React, { useEffect } from 'react'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setDrawer, updateBalance } from '../redux/appSlice';
import { ProductType, userType } from '../types/Types';
import '../css/BasketDetail.css'
import Button from '@mui/material/Button';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/basketSlice';
import { toast } from 'react-toastify';

function BasketDetail() {
    const { drawer, currentUser } = useSelector((state: RootState) => state.app)
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(calculateBasket())
    }, [basket])
    const closeDrawer = () => {
        dispatch(setDrawer(false))
    }
    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId))
        toast.success('Ürün sepetinizden çıkarıldı.')
    }
    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Bakiyeniz Yetersiz.")
            return;
        }
        if (currentUser?.balance) {
            const lastTotal = currentUser.balance - totalAmount;
            const payload: userType = {
                ...currentUser,
                balance: lastTotal
            }
            dispatch(updateBalance(payload))
            dispatch(setBasket([]));
            localStorage.removeItem("basket")
            toast.success('Siparişiniz Başarıyla Alınmıştır.')
        }
    }
    return (
        <Drawer open={drawer} anchor='right' onClose={closeDrawer} >
            {
                basket && basket.map((product: ProductType) => (
                    <>
                        <div className='all-product'>
                            <div style={{ marginRight: '20px' }}>
                                <img src={product.image} width={70} height={70} alt="" />
                            </div>
                            <div style={{ width: '350px', marginRight: '20px' }}>
                                <div className='title'>{product.title.substring(0, 20)}...</div>
                                <div>{product.description.substring(0, 40)}... </div>
                            </div>
                            <div className='count'><h4>{product.count}</h4></div>
                            <div className='price'>{product.price} ₺</div>
                            <div>
                                <Button onClick={() => removeProduct(product.id)} color='error' size='small' sx={{ textTransform: 'none', height: '25px' }} variant='outlined'>Çıkar</Button>
                            </div>
                        </div>
                    </>

                ))
            }
            <div className='totalAmont'>
                <div className='totalAmountchild'>Toplam Tutar:   {totalAmount} ₺</div>
                <div>
                    <Button onClick={buy} sx={{ textTransform: 'none', height: '40px', marginTop: '100px' }} size='large' variant='contained' color='warning'>
                        Satın Al
                    </Button>
                </div>
            </div>

        </Drawer>
    )
}

export default BasketDetail