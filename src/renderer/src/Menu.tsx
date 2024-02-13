import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

function Menu(): JSX.Element {
  return (
    <>
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden">
        <div className="w-full h-[100px] z-10">
          <Navbar />
        </div>
        <div className="w-full h-full z-9 flex justify-start items-center space-x-5 p-5 overflow-auto">
          <Sidebar />
          <div className="w-full h-full bg-[#ffffff] rounded-[10px] overflow-auto drop-shadow-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
