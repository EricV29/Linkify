import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Notification from './components/Notification'
import noti from './store/notification'
import Messageqdos from './components/Messageqdos'
import msgquestion from './store/messageqdos'

function Menu(): JSX.Element {
  const { visiblenoti } = noti()
  const { visiblemsgq } = msgquestion()

  return (
    <>
      {visiblenoti && <Notification />}
      {visiblemsgq && <Messageqdos />}
      <div className="w-screen h-screen flex flex-col m-0 p-0 justify-center overflow-hidden">
        <div className="w-full h-[100px] z-10">
          <Navbar />
        </div>
        <div className="w-full h-full z-9 flex justify-start items-center space-x-5 p-5 overflow-auto">
          <Sidebar />
          <div className="w-full h-full bg-[#ffffff] rounded-[10px] overflow-auto drop-shadow-xl border-1 border-[#34343430]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
