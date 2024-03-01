import rasplo from '../images/arduinolo.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import linkify from '../images/linki.png'

function NavbarRasp(): JSX.Element {
  return (
    <>
      <div className="w-full h-full bg-[#ccfafc] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <div className="flex space-x-3 w-1/3">
          <div className="w-[150px] text-[#fff] font-bold h-[40px] bg-[#00989E] rounded-[12px] flex items-center justify-center">
            <Icon icon="ph:student" color="#fff" className="h-full w-[22px]" />
            Kit Alumno
          </div>
        </div>
        <div className="w-1/3">
          <img src={rasplo} alt="Prepa6Logotipo" className="w-[100px]" />
        </div>
        <img src={linkify} alt="linkify" className="h-full drop-shadow-xl" />
      </div>
    </>
  )
}

export default NavbarRasp
