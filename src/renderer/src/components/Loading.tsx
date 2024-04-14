import 'ldrs/ring'
import { squircle } from 'ldrs'

function Loading(): JSX.Element {
  squircle.register()

  return (
    <>
      <div className="bg-[#0000007d] w-full h-full absolute flex justify-center items-center z-20">
        <l-squircle
          size="37"
          stroke="5"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="0.9"
          color="#FED700"
        ></l-squircle>
      </div>
    </>
  )
}

export default Loading
