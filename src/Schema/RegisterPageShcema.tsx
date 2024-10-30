import * as yup from 'yup';

export const registerPageSchema = yup.object().shape({
    username: yup.string().required("Kullanıcı adı boş olamaz"),
    password: yup.string().required("Şifre boş olamaz").min(9, 'Şifreniz 9 karakterden büyük olmalıdır.')
})