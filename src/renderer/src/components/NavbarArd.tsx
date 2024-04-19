import rasplo from '../images/arduinolo.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import linkify from '../images/linki.png'
import { useState } from 'react'

function NavbarRasp(): JSX.Element {
  const [activeButton, setActiveButton] = useState('kitalumnard')

  return (
    <>
      <div className="w-full h-full bg-[#ccfafc] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <div className="flex space-x-3 w-1/3">
          <Link to="/arduino/kitalumnard" className="flex">
            <Button
              className={`w-[140px] font-bold ${activeButton === 'kitalumnard' ? 'text-[#fff] bg-[#00989E]' : 'text-[#00989E] hover:text-[#fff]'}`}
              variant="light"
              color="default"
              onClick={() => setActiveButton('kitalumnard')}
            >
              <Icon
                icon="ph:student"
                color={`${activeButton === 'kitalumnard' ? '#ffffff' : '#00989E'}`}
                className="h-full w-[22px]"
              />
              Kit Alumno
            </Button>
          </Link>
          <Link to="/arduino/soliard" className="flex">
            <Button
              className={`w-[133px] font-bold ${activeButton === 'soliard' ? 'text-[#fff] bg-[#00989E]' : 'text-[#00989E] hover:text-[#fff]'} `}
              variant="light"
              color="default"
              onClick={() => setActiveButton('soliard')}
            >
              <Icon
                icon="solar:card-send-broken"
                color={`${activeButton === 'soliard' ? '#ffffff' : '#00989E'}`}
                className="h-full w-[22px]"
              />
              Solicitudes
            </Button>
          </Link>
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
