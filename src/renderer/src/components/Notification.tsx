import { Icon } from '@iconify/react'
import noti from '../store/notification'
import { Button } from '@nextui-org/react'

const Notification = () => {
  const { text, toggleVisiblenoti } = noti()

  return (
    <>
      <div className="fixed z-20 w-[400px] min-h-[65px] rounded-[10px] bg-[#343434] top-[100px] right-5 text-[#ffffff] flex items-center p-3 space-x-2 break-words animate-fade-left animate-once animate-ease-out">
        <Button
          isIconOnly
          color="danger"
          aria-label="Like"
          onClick={() => {
            toggleVisiblenoti()
          }}
        >
          <Icon icon="line-md:close-circle-twotone" className="w-[30px] h-[30px]" />
        </Button>
        <p>{text}</p>
      </div>
    </>
  )
}

export default Notification
