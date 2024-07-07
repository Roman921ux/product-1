import { Route, Routes } from 'react-router-dom'
import Lauout from './Lauout'
import ProductPage from './pages/ProductPage'
import DetailProductPage from './pages/DetailProductPage'
import BasketPage from './pages/BasketPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from './hooks/AuthProvider'
import { useAtom } from 'jotai'
import { isAuthUserAtom } from './atoms/auth'
import GraficPage from './pages/GraficPage'

function App() {
  const [iaAuth, setIsAuth] = useAtom(isAuthUserAtom);
  const token = window.localStorage.getItem('token');
  // const navigate = useNavigate();

  if (token) {
    setIsAuth(true);
    console.log(iaAuth)
  }

  return (
    <Routes>
      <Route path='/' element={<Lauout />}>
        <Route path='/' element={<ProductPage />} />
        <Route path='/grafic' element={<GraficPage />} />
        <Route path='/:id' element={<DetailProductPage />} />
        <Route path='/basket' element={
          <AuthProvider>
            <BasketPage />
          </AuthProvider>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
