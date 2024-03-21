import { Outlet } from 'react-router-dom'
import NavbarLego from './components/NavbarLego'
import legoSpikebg from './images/legospikebg.png'

function LegoSpike(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden">
        <div className="w-full h-[100px] z-10">
          <NavbarLego />
        </div>
        <div className="w-full h-full z-9 flex justify- p-0 m-0 items-center space-x-5 bg-[#fff] object-fill overflow-hidden">
          <img src={legoSpikebg} alt="fondo" className="opacity-25" />
          <div className="absolute bg-[#c8000055] w-[180vh] h-[85vh] rounded-[10px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default LegoSpike
