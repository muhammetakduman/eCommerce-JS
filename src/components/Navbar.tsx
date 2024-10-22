import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import podium from '../images/red-light-round-podium-black-background-mock-up.jpg'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
        dispatch(setCurrentUser(null))
        dispatch(setLoading(false))
        navigate('/login')
        toast.success('Başarıyla çıkış yaptınız')
    }
    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: '#d1113a' }}>
                <Toolbar>
                    <IconButton
                        onClick={() => navigate('/')}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <img src={podium} width={60} height={60} />
                    </IconButton>
                    <Typography onClick={() => navigate('/')} variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }}>
                        AKDUMAN TİCARET
                    </Typography>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TextField sx={{ width: '250px', marginBottom: '25px', marginRight: '20px' }}
                            id="searchInput"
                            placeholder='Arama yap'
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                        </InputAdornment>
                                    ),
                                    style: {
                                        color: '#fff',
                                        borderBottom: '2px solid black'
                                    }
                                },
                            }}
                            variant="standard"
                        />

                        <Button onClick={logout} sx={{ textTransform: 'none' }} color="inherit">Çıkış yap</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
