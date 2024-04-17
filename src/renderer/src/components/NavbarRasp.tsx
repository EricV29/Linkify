import rasplo from '../images/rasplo.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import linkify from '../images/linki.png'
import { useState } from 'react'

function NavbarRasp(): JSX.Element {
  const [activeButton, setActiveButton] = useState('kitalumnrasp')

  return (
    <>
      <div className="w-full h-full bg-[#E1E1E1] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <div className="flex space-x-3 w-1/3">
          <Link to="/raspberry/kitalumnrasp" className="flex">
            <Button
              className={`w-[140px] font-bold ${activeButton === 'kitalumnrasp' ? 'text-[#fff] bg-[#DC0941]' : 'text-[#DC0941] hover:text-[#fff]'}`}
              variant="light"
              color="danger"
              onClick={() => setActiveButton('kitalumnrasp')}
            >
              <Icon
                icon="ph:student"
                color={`${activeButton === 'kitalumnrasp' ? '#ffffff' : '#DC0941'}`}
                className="h-full w-[22px]"
              />
              Kit Alumno
            </Button>
          </Link>
          <Link to="/raspberry/solirasp" className="flex">
            <Button
              className={`w-[133px] font-bold ${activeButton === 'solirasp' ? 'text-[#fff] bg-[#DC0941]' : 'text-[#DC0941] hover:text-[#fff]'} `}
              variant="light"
              color="danger"
              onClick={() => setActiveButton('solirasp')}
            >
              <Icon
                icon="solar:card-send-broken"
                color={`${activeButton === 'solirasp' ? '#ffffff' : '#DC0941'}`}
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
