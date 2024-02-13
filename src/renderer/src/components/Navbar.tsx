import React, { useState, useEffect } from 'react'
import prep6l from '../images/prep6l.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
const ipcRenderer = require('electron').ipcRenderer
import { Link } from 'react-router-dom'

function Navbar(): JSX.Element {
  const [nameuser, setNameuser] = useState(null)

  // TRAER NOMBRE COMPLETO DEL USUARIO
  useEffect(() => {
    ipcRenderer.send('nameuser', 'dataUser')
    ipcRenderer.once('nameu', (event, success, name) => {
      if (success) {
        setNameuser(name)
      } else {
        console.log('Nombre de usuario no encontrado')
      }
    })
  }, [])

  // SALIR DE MENU (SECOND) NAME = newWindow
  function exitMenu() {
    ipcRenderer.send('exitApp', 'exit')
  }

  return (
    <>
      <div className="w-full h-full bg-[#ffffff] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <p className="text-[25px] font-bold">{nameuser}</p>
        <Link to="/menu">
          <img src={prep6l} alt="Prepa6Logotipo" className="w-[250px]" />
        </Link>
        <Button
          className="w-[117px] bg-[#C80000] text-[#fff] font-bold"
          variant="shadow"
          color="danger"
          onClick={exitMenu}
        >
          SALIR <Icon icon="line-md:login" className="pt-1" width={25} />
        </Button>
      </div>
    </>
  )
}

export default Navbar
