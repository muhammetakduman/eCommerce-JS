import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import podium from '../images/red-light-round-podium-black-background-mock-up.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setCurrentUser, setDrawer, setLoading, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { FaShoppingBasket } from "react-icons/fa";
import Badge from '@mui/material/Badge';
import { RootState } from '../redux/store';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';

function Navbar() {
    const isMobile = useMediaQuery('(max-width:600px)'); // 600px altındaki ekranları mobil olarak tanımladık
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { basket } = useSelector((state: RootState) => state.basket);
    const { currentUser } = useSelector((state: RootState) => state.app); // Redux store'dan currentUser'ı aldık

    const handleFilter = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.value) {
                dispatch(filterProducts(e.target.value));
            } else {
                const products: ProductType[] = await productService.getAllProducts();
                dispatch(setProducts(products));
            }
        } catch (err) {
            toast.error("Filtrelerken hata oluştu:" + err);
        }
    };

    const openDrawer = () => {
        dispatch(setDrawer(true));
    };

    const logout = () => {
        localStorage.removeItem('currentUser');
        dispatch(setCurrentUser(null)); // Kullanıcıyı çıkış yaptıktan sonra currentUser'ı null yapıyoruz
        dispatch(setLoading(false));
        toast.error('Başarıyla çıkış yaptınız');
        navigate('/login'); // Çıkıştan sonra login sayfasına yönlendirme
    };

    const handleLogin = () => {
        navigate('/login'); // Giriş yap butonuna basıldığında login sayfasına yönlendirme
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#d1113a' }}>
            <Toolbar>
                {/* Sol Kısım: Logo ve Başlık */}
                <Box display="flex" alignItems="center" flexGrow={1}>
                    <IconButton
                        onClick={() => navigate('/')}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img src={podium} width={isMobile ? 40 : 60} height={isMobile ? 40 : 60} alt="" />
                    </IconButton>
                    {!isMobile && (
                        <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ cursor: 'pointer' }}>
                            AKDUMAN TİCARET
                        </Typography>
                    )}
                </Box>

                {/* Orta Kısım: Arama Çubuğu */}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent={isMobile ? 'center' : 'flex-end'}
                    sx={{ mx: 2, flexGrow: 1 }}
                >
                    <TextField
                        onChange={handleFilter}
                        sx={{ width: '100%', maxWidth: '250px' }}
                        id="searchInput"
                        placeholder="Arama yap"
                        variant="standard"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                            style: {
                                color: '#fff',
                                borderBottom: '2px solid black'
                            }
                        }}
                    />
                </Box>

                {/* Sağ Kısım: Sepet ve Kullanıcı İşlemleri */}
                <Box display="flex" alignItems="center">
                    <Badge
                        sx={{ mr: 2 }}
                        badgeContent={basket.length}
                        color="primary"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <FaShoppingBasket onClick={openDrawer} style={{ fontSize: isMobile ? '20px' : '23px', cursor: 'pointer' }} />
                    </Badge>

                    {/* Kullanıcı Giriş/Çıkış Durumuna Göre Buton */}
                    {currentUser ? (
                        <Button
                            variant="outlined"
                            onClick={logout} // Çıkış için logout fonksiyonunu çalıştırıyoruz
                            sx={{ textTransform: 'none' }}
                            color="inherit"
                        >
                            Çıkış Yap
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={handleLogin} // Giriş yap butonuna basıldığında login sayfasına yönlendiriyor
                            sx={{ textTransform: 'none' }}
                            color="inherit"
                        >
                            Giriş Yap
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
