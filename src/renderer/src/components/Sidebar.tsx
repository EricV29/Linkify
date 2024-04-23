import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useState, useEffect } from 'react'
const { ipcRenderer } = require('electron')

function Sidebar(): JSX.Element {
  const [activeButton, setActiveButton] = useState('Tools')
  const [nameuser, setNameuser] = useState(null)
  const [rol, setRoluser] = useState(null)

  // TRAER DATOS DE USUARIO
  useEffect(() => {
    ipcRenderer.send('nameuser', 'dataUser')
    ipcRenderer.once('nameu', (success, arg) => {
      if (success) {
        setNameuser(arg[0])
        setRoluser(arg[1])
        //console.log(arg[1])
        console.log(nameuser)
      } else {
        console.log('Nombre de usuario no encontrado')
      }
    })
  }, [])

  return (
    <>
      <div className="h-full w-1/6 bg-[#343434] rounded-[10px] flex flex-col justify-start items-center space-y-4 pt-5 drop-shadow-xl ">
        {rol === 1 && (
          <>
            <Button
              className={`font-bold w-[170px] ${activeButton === 'Tools' ? 'text-[#fff] bg-[#00a539]' : 'text-[#ffffff] hover:text-[#00a539]'}`}
              variant="ghost"
              onClick={() => setActiveButton('Tools')}
            >
              <Link to="/menu/herramientas" className="w-full h-full flex items-center">
                <Icon icon="jam:tools-f" />
                Kits Tecnológicos
              </Link>
            </Button>
            <Button
              className={`font-bold w-[170px] ${activeButton === 'Admin' ? 'text-[#fff] bg-[#00a539]' : 'text-[#ffffff] hover:text-[#00a539]'}`}
              variant="ghost"
              onClick={() => setActiveButton('Admin')}
            >
              <Link to="/menu" className="w-full h-full flex items-center">
                <Icon icon="jam:tools-f" />
                Admin Prueba
              </Link>
            </Button>
          </>
        )}
        {rol === 2 && (
          <>
            <Button
              className={`font-bold w-[170px] ${activeButton === 'Tools' ? 'text-[#fff] bg-[#00a539]' : 'text-[#ffffff] hover:text-[#00a539]'}`}
              variant="ghost"
              onClick={() => setActiveButton('Tools')}
            >
              <Link to="/menu/herramientas" className="w-full h-full flex items-center">
                <Icon icon="jam:tools-f" />
                Kits Tecnológicos
              </Link>
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default Sidebar
