import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Lauout from './Lauout'
import ProductPage from './pages/ProductPage'
import DetailProductPage from './pages/DetailProductPage'
import BasketPage from './pages/BasketPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Lauout />}>
        <Route path='/' element={<ProductPage />} />
        <Route path='/:id' element={<DetailProductPage />} />
        <Route path='/basket' element={<BasketPage />} />
      </Route>
    </Routes>
  )
}

export default App
