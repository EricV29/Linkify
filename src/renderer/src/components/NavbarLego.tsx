import { useState } from 'react'
import spikelo from '../images/spikelo.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import linkify from '../images/linki.png'

function NavbarLego(): JSX.Element {
  const [activeButton, setActiveButton] = useState(null)

  return (
    <>
      <div className="w-full h-full bg-[#FED700] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <div className="flex space-x-3 w-1/3">
          <Button
            className={`w-[117px] font-bold ${activeButton === 'kitAlumno' ? 'text-[#fff] bg-[#C80000]' : 'text-[#C80000] hover:text-[#fff]'} `}
            variant="light"
            color="danger"
            onClick={() => setActiveButton('kitAlumno')}
          >
            <Link to="/legospike/kittec" className="flex">
              <Icon
                icon="ph:student"
                color={`${activeButton === 'kitAlumno' ? '#ffffff' : '#C80000'}`}
                className="h-full w-[22px]"
              />
              Kit Alumno
            </Link>
          </Button>
          <Button
            className={`w-[117px] font-bold ${activeButton === 'kitExtra' ? 'text-[#fff] bg-[#C80000]' : 'text-[#C80000] hover:text-[#fff]'} `}
            variant="light"
            color="danger"
            onClick={() => setActiveButton('kitExtra')}
          >
            <Link to="/legospike/kitext" className="flex">
              <Icon
                icon="tabler:lego"
                color={`${activeButton === 'kitExtra' ? '#ffffff' : '#C80000'}`}
                className="h-full w-[22px]"
              />
              Kit Extra
            </Link>
          </Button>
          <Button
            className={`w-[117px] font-bold ${activeButton === 'solicitud' ? 'text-[#fff] bg-[#C80000]' : 'text-[#C80000] hover:text-[#fff]'} `}
            variant="light"
            color="danger"
            onClick={() => setActiveButton('solicitud')}
          >
            <Link to="/legospike/solicitud" className="flex">
              <Icon
                icon="solar:card-send-broken"
                color={`${activeButton === 'solicitud' ? '#ffffff' : '#C80000'}`}
                className="h-full w-[22px]"
              />
              Solicitud
            </Link>
          </Button>
        </div>
        <div className="w-1/3">
          <img src={spikelo} alt="Prepa6Logotipo" className="w-[100px]" />
        </div>
        <img src={linkify} alt="linkify" className="h-full drop-shadow-xl" />
      </div>
    </>
  )
}

export default NavbarLego