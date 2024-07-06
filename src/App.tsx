import { Route, Routes } from 'react-router-dom'
import Lauout from './Lauout'
import ProductPage from './pages/ProductPage'
import DetailProductPage from './pages/DetailProductPage'
import BasketPage from './pages/BasketPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AuthProvider from './hooks/AuthProvider'
import { useAtom } from 'jotai'
import { isAuthUserAtom } from './atoms/auth'

function App() {
  const [iaAuth, setIsAuth] = useAtom(isAuthUserAtom);
  const token = window.localStorage.getItem('token');
  // const navigate = useNavigate();

  if (token) {
    setIsAuth(true);
  }

  return (
    <Routes>
      <Route path='/' element={<Lauout />}>
        <Route path='/' element={<ProductPage />} />
        <Route path='/:id' element={<DetailProductPage />} />
        <Route path='/basket' element={
          <AuthProvider>
            <BasketPage />
          </AuthProvider>
        } />
        <Route path='/profile' element={
          <AuthProvider>
            <ProfilePage />
          </AuthProvider>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  )
}

export default App
