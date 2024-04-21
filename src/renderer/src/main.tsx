import React from 'react'
import ReactDOM from 'react-dom/client'
import { Routes, Route, HashRouter } from 'react-router-dom'
import './index.css'
import Login from './Login'
import Menu from './Menu'
import Herramientas from './Herramientas'
import LegoSpike from './LegoSpike'
import Kitleg from './KitLeg'
import RaspBerry from './RaspBerry'
import Arduino from './Arduino'
import KitExt from './KitExt'
import SoliLego from './SoliLego'
import Welcome from './Welcome'
import KitRasp from './KitRasp'
import SoliRasp from './SoliRasp'
import KitArd from './KitArd'
import SoliArd from './SoliArd'

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
          <Route path="/menu" element={<Welcome />} />
          <Route path="herramientas" element={<Herramientas />} />
        </Route>
        <Route path="/legospike" element={<LegoSpike />}>
          <Route path="kitleg" element={<Kitleg />} />
          <Route path="kitext" element={<KitExt />} />
          <Route path="solilego" element={<SoliLego />} />
        </Route>
        <Route path="/raspberry" element={<RaspBerry />}>
          <Route path="kitalumnrasp" element={<KitRasp />} />
          <Route path="solirasp" element={<SoliRasp />} />
        </Route>

        <Route path="/arduino" element={<Arduino />}>
          <Route path="kitalumnard" element={<KitArd />} />
          <Route path="soliard" element={<SoliArd />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
