import { Outlet } from 'react-router-dom'
import NavbarRasp from './components/NavbarRasp'
import raspbg from './images/raspberrypi.webp'
import Loading from './components/Loading'
import loading from './store/load'

function LegoSpike(): JSX.Element {
  const { load } = loading()

  return (
    <>
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden animate-fade animate-once animate-duration-500 animate-ease-in">
        {load && <Loading />}
        <div className="w-full h-[100px] z-10">
          <NavbarRasp />
        </div>
        <div className="w-full h-full z-9 flex justify- p-0 m-0 items-center space-x-5 bg-[#fff] object-fill overflow-hidden">
          <img src={raspbg} alt="fondo" className="opacity-25 " />
          <div className="absolute bg-[#DC094155] w-[176vh] h-[85vh] rounded-[10px]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default LegoSpike
