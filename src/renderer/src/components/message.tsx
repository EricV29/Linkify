import { Icon } from '@iconify/react'
import msgLego from '../store/message'

interface Props {
  textMsg: string
  onYes: () => void
  onNo: () => void
  tool: string
}

const Message = ({ textMsg, onYes, onNo, tool }: Props) => {
  const { toggleVisible } = msgLego()

  const sty = {
    LegoSpike: {
      backgroundColor: '#FED700',
      borderColor: '#FED700'
    },
    Arduino: {
      backgroundColor: '#ccfafc',
      borderColor: '#ccfafc'
    },
    RaspBerry: {
      backgroundColor: '#E1E1E1',
      borderColor: '#E1E1E1'
    }
  }

  return (
    <>
      <div className="bg-[#0000005d] w-full h-full absolute flex justify-center items-center z-10 rounded-[10px] animate-fade animate-once animate-duration-1000 animate-ease-out">
        <div className="w-[400px] min-h-[150px] rounded-[15px] border-3" style={sty[tool]}>
          <div className="p-3 min-h-24 flex justify-center items-center font-bold text-[20px] text-center">
            <p className="break-words font-primary">{textMsg}</p>
          </div>
          <div className="flex">
            <button
              className="bg-[#FF0000] text-[#ffffff] w-1/2 h-[60px] rounded-bl-[10px] font-bold flex items-center justify-center space-x-1 "
              onClick={() => {
                toggleVisible()
                onNo()
              }}
            >
              <Icon icon="icon-park-solid:close-one" className="w-[25px] h-[25px]" />
              <p>NO</p>
            </button>
            <button
              className="bg-[#55AB01] text-[#ffffff] w-1/2 h-[60px] rounded-br-[10px] font-bold flex items-center justify-center space-x-1"
              onClick={() => {
                toggleVisible()
                onYes()
              }}
            >
              <Icon icon="ic:round-check-box" className="w-[25px] h-[25px]" />
              <p>SI</p>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Message
