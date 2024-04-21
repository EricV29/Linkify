import 'ldrs/ring'
import { squircle } from 'ldrs'
import loading from '../store/load'

function Loading(): JSX.Element {
  const { kitTool } = loading()
  squircle.register()

  const colors = {
    LegoSpike: '#FED700',
    RaspBerry: '#DC0941',
    Arduino: '#00989E'
  }

  return (
    <>
      <div className="bg-[#0000007d] w-full h-full absolute flex justify-center items-center z-20 animate-fade animate-once animate-duration-1000 animate-ease-out">
        <l-squircle
          size="37"
          stroke="5"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="0.9"
          color={colors[kitTool]}
        ></l-squircle>
      </div>
    </>
  )
}

export default Loading
