import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'

function Sidebar(): JSX.Element {
  return (
    <>
      <div className="h-full w-1/6 bg-[#C80000] rounded-[10px] flex justify-center items-start pt-5 drop-shadow-xl ">
        <Button
          color="default"
          variant="ghost"
          className="text-[#ffffff] hover:bg-white hover:text-black"
        >
          <Link to="/menu/herramientas" className="w-full h-full flex items-center">
            <Icon icon="solar:box-bold" />
            Kits Tecnológicos
          </Link>
        </Button>
      </div>
    </>
  )
}

export default Sidebar
