
import '../css/login.css'
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material';
import { RiLockPasswordLine } from "react-icons/ri";
import { registerPageSchema } from '../Schema/RegisterPageShcema';
import { userType } from '../types/Types';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice'
import LoginPageService from '../services/LoginPageService';
import { useNavigate } from 'react-router-dom';

interface CheckUserType {
    result: boolean,
    currentUser: userType | null
}
function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const checkUser = (userList: userType[], username: string, password: string): CheckUserType => {
        const response: CheckUserType = { result: false, currentUser: null }

        userList.forEach((user: userType) => {
            if (user.username === username && user.password === password) {
                response.result = true
                response.currentUser = user;

            }
        })
        return response;
    }

    const submit = async (values: any, action: any) => {
        try {
            dispatch(setLoading(true))
            const response: userType[] = await LoginPageService.login()
            if (response) {
                const checkUserResponse: CheckUserType = checkUser(response, values.username, values.password);
                if (checkUserResponse.result && checkUserResponse.currentUser) {
                    dispatch(setCurrentUser(checkUserResponse.currentUser));
                    localStorage.setItem('currentUser', JSON.stringify(checkUserResponse.currentUser));
                    navigate('/');
                }
            } else {
                toast.error("Kullanıcı adı veya şifre yanlış")
            }
        } catch (error) {
            toast.error("Giriş yapılırken hata oluştu:" + error)
        } finally {
            dispatch(setLoading(false))
        }
    }
    const { values, handleSubmit, handleChange, errors, resetForm } = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: submit,
        validationSchema: registerPageSchema
    });

    const clear = () => {
        resetForm();
    }
    return (
        <div className='register'>
            <div className='main'>
                <form onSubmit={handleSubmit} >
                    <div className='form-div'>
                        <TextField sx={{ backgroundColor: 'lightgrey', borderRadius: '7px' }}

                            id="username"

                            placeholder='Kullanıcı Adı'
                            value={values.username}
                            onChange={handleChange}
                            helperText={values.username && <span>{errors.username}</span>}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                        />
                        <TextField sx={{ backgroundColor: 'lightgrey', borderRadius: '7px', marginTop: '15px' }}

                            id="password"
                            placeholder='Şifre Giriniz'
                            type='password'
                            value={values.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <RiLockPasswordLine style={{ margin: '4px' }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            variant="outlined"
                            helperText={values.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                        />
                        <div className='button-group' style={{ marginTop: '20px' }}>
                            <Button type='submit' size='small' style={{ textTransform: 'none', marginRight: '10px' }} variant='outlined' color='info' >Giriş Yap</Button>
                            <Button size='small' style={{ textTransform: 'none' }} variant='outlined' color='error' onClick={clear} >Temizle</Button>
                            <Button sx={{ marginLeft: '7px' }} size='small' style={{ textTransform: 'none' }} variant='outlined' color='success' onClick={() => navigate('/register')} >Kayıt ol </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;