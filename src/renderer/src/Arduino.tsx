import { Outlet } from 'react-router-dom'
import NavbarArd from './components/NavbarArd'
import legoSpikebg from './images/arduino.jpg'
import KitArd from './KitArd'

function LegoSpike(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden">
        <div className="w-full h-[100px] z-10">
          <NavbarArd />
        </div>
        <div className="w-full h-full z-9 flex justify- p-0 m-0 items-center space-x-5 bg-[#fff] object-fill overflow-hidden">
          <img src={legoSpikebg} alt="fondo" className="opacity-25" />
          <div className="absolute bg-[#00989E] w-[180vh] h-[85vh] opacity-55 rounded-[10px]">
            <KitArd />
          </div>
        </div>
      </div>
    </>
  )
}

export default LegoSpike
