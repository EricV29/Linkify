import { Icon } from '@iconify/react'
import msgLego from '../store/message'

interface Props {
  textMsg: string
  onYes: () => void
}

const Messageok = ({ textMsg, onYes }: Props) => {
  const { toggleVisible } = msgLego()

  return (
    <>
      <div className="bg-[#0000005d] w-full h-full absolute flex justify-center items-center z-10 rounded-[10px] animate-fade animate-once animate-duration-1000 animate-ease-out">
        <div className="w-[400px] min-h-[150px] rounded-[15px] border-3 bg-[#343434]">
          <div className="p-3 min-h-24 flex justify-center items-center text-[20px] text-center">
            <p className="break-words text-[#ffffff]">{textMsg}</p>
          </div>
          <div className="flex">
            <button
              className="bg-[#00a539] text-[#ffffff] w-full h-[60px] rounded-b-[10px] font-bold flex items-center justify-center space-x-1"
              onClick={() => {
                toggleVisible()
                onYes()
              }}
            >
              <Icon icon="ic:round-check-box" className="w-[25px] h-[25px]" />
              <p>ENTENDIDO</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Messageok
