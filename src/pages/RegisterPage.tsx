import React from 'react'
import '../css/Register.css'
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material';
import { RiLockPasswordLine } from "react-icons/ri";
import { registerPageSchema } from '../Schema/RegisterPageShcema';
import { userType } from '../types/Types';
import { toast } from 'react-toastify';
import RegisterPageService from '../services/RegisterPageService';
import { useNavigate } from 'react-router-dom';


function RegisterPage() {
    const navigate = useNavigate();
    const submit = async (values: any, actions: any) => {
        try {
            const payload: userType = {
                id: values.id,
                username: values.username,
                password: values.password,
                balance: 1000
            }
            const response = await RegisterPageService.register(payload)
            if (response) {
                clear();
                toast.success("Kullanıcı Kaydedildi")
                navigate('/login')
            }
        } catch (error) {
            toast.error('Kullanıcı kayıt durumunda bir hata oluştu.')

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
        alert('Form resetlendi.')
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
                        <div style={{ marginTop: '20px' }}>
                            <Button type='submit' size='small' style={{ textTransform: 'none', marginRight: '10px' }} variant='outlined' color='info' >Kayıt ol</Button>
                            <Button size='small' style={{ textTransform: 'none' }} variant='outlined' color='error' onClick={clear} >Temizle</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
