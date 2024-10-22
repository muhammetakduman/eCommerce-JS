import RouterConfig from './config/RouterConfig'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';


function App() {

  return (
    <div>
      <RouterConfig />
      <ToastContainer autoClose={2000} />
      <Spinner />
    </div>
  )
}

export default App
