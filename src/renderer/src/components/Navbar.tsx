import { useState, useEffect } from 'react'
//import prep6l from '../images/prep6l.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
const ipcRenderer = require('electron').ipcRenderer
import { Link } from 'react-router-dom'
import linkilogo from '../images/linkilogo.png'

function Navbar(): JSX.Element {
  const [nameuser, setNameuser] = useState(null)

  // TRAER NOMBRE COMPLETO DEL USUARIO
  useEffect(() => {
    ipcRenderer.send('nameuser', 'dataUser')
    ipcRenderer.once('nameu', (success, arg) => {
      if (success) {
        setNameuser(arg[0])
        ipcRenderer.send('msgOption', 'Bienvenido ' + arg[0])
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
      <div className="w-full h-full bg-[#343434] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <p className="text-[25px] font-semibold text-[#00a539] animate-fade-right animate-once animate-ease-in-out">
          {nameuser}
        </p>
        <Link to="/menu">
          <img
            src={linkilogo}
            alt="LinkiLogotipo"
            className="w-[250px] animate-fade animate-once animate-ease-in"
          />
        </Link>
        <Button
          className="w-[117px] bg-[#00a539] text-[#fff] font-bold"
          variant="shadow"
          color="success"
          onClick={exitMenu}
        >
          SALIR <Icon icon="line-md:login" className="pt-1" width={25} />
        </Button>
      </div>
    </>
  )
}

export default Navbar
