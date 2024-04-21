import { Link } from 'react-router-dom'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'

function Sidebar(): JSX.Element {
  const [activeButton, setActiveButton] = useState('Tools')

  return (
    <>
      <div className="h-full w-1/6 bg-[#343434] rounded-[10px] flex justify-center items-start pt-5 drop-shadow-xl ">
        <Button
          //className="text-[#ffffff] hover:bg-white hover:text-black"
          className={`font-bold ${activeButton === 'Tools' ? 'text-[#fff] bg-[#00a539]' : 'text-[#ffffff] hover:text-[#00a539]'}`}
          variant="ghost"
          onClick={() => setActiveButton('Tools')}
        >
          <Link to="/menu/herramientas" className="w-full h-full flex items-center">
            <Icon icon="jam:tools-f" />
            Kits Tecnológicos
          </Link>
        </Button>
      </div>
    </>
  )
}

export default Sidebar
