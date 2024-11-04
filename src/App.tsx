import RouterConfig from './config/RouterConfig'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ProductType, userType } from './types/Types';
import productService from './services/ProductService';
import { setCurrentUser, setProducts } from './redux/appSlice';
import { useEffect } from 'react';
import { setBasket } from './redux/basketSlice';
import BasketDetail from './components/BasketDetail';
import { useLocation } from 'react-router-dom';


function App() {
  const dispatch = useDispatch()
  const location = useLocation();

  const gelAllProducts = async () => {
    try {
      const product: ProductType[] = await productService.getAllProducts();
      dispatch(setProducts(product))
    } catch (e) {
      console.error('Ürünler getirilirken bir hata oluştu:', e)
    }
  }
  useEffect(() => {
    gelAllProducts()
  }, [])

  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem('currentUser');
    if (currentUserString) {
      const currentUser: userType = JSON.parse(currentUserString) as userType;
      dispatch(setCurrentUser(currentUser))
    }
  }, [])

  useEffect(() => {
    const basketString = localStorage.getItem('basket')
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket))
    }
  }, [])
  const { currentUser } = useSelector((state: RootState) => state.app)
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <RouterConfig />
      <ToastContainer autoClose={2000} />
      <Spinner />
      <BasketDetail />
    </div>
  )
}

export default App
