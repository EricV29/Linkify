import spikelo from '../images/spikelo.png'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

function NavbarLego(): JSX.Element {
  return (
    <>
      <div className="w-full h-full bg-[#FED700] drop-shadow-xl flex justify-between items-center pr-6 pl-6">
        <div className="flex space-x-3 w-1/3">
          <Button
            className="w-[117px]  text-[#C80000] hover:text-[#fff] font-bold"
            variant="light"
            color="danger"
          >
            <Link to="/legospike/kittec">Kits Tecnológicos</Link>
          </Button>
          <Button
            className="w-[117px] text-[#C80000] hover:text-[#fff] font-bold"
            variant="light"
            color="danger"
          >
            Kit Extra
          </Button>
          <Button
            className="w-[117px] text-[#C80000] hover:text-[#fff] font-bold"
            variant="light"
            color="danger"
          >
            Solicitud
          </Button>
        </div>
        <div className="w-1/3">
          <img src={spikelo} alt="Prepa6Logotipo" className="w-[100px]" />
        </div>
        <Button
          className="w-[117px] text-[#fff] bg-[#C80000] font-bold"
          variant="shadow"
          color="danger"
        >
          SALIR <Icon icon="line-md:login" className="pt-1" width={25} />
        </Button>
      </div>
    </>
  )
}

export default NavbarLego
