import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

        </Routes>
    )

}
export default RouterConfig