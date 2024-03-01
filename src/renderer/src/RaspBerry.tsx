import { Outlet } from 'react-router-dom'
import NavbarRasp from './components/NavbarRasp'
import raspbg from './images/raspberrypi.jpg'
import KitRasp from './KitRasp'

function LegoSpike(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden">
        <div className="w-full h-[100px] z-10">
          <NavbarRasp />
        </div>
        <div className="w-full h-full z-9 flex justify- p-0 m-0 items-center space-x-5 bg-[#fff] object-fill overflow-hidden">
          <img src={raspbg} alt="fondo" className="opacity-25" />
          <div className="absolute bg-[#DC0941] w-[180vh] h-[85vh] opacity-55 rounded-[10px]">
            <KitRasp />
          </div>
        </div>
      </div>
    </>
  )
}

export default LegoSpike
