import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router-dom'
import './index.css'
import Login from './Login'
import Menu from './Menu'
import Herramientas from './Herramientas'
import LegoSpike from './LegoSpike'
import Kittec from './Kittec'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('No se pudo encontrar el elemento root')
}

const root = ReactDOM.createRoot(rootElement)

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<Menu />}>
          <Route path="herramientas" element={<Herramientas />} />
        </Route>
        <Route path="/legospike" element={<LegoSpike />}>
          <Route path="kittec" element={<Kittec />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
