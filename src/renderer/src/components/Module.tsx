import React, { useState } from 'react'

interface Props {
  imgbg: string
  imglog: string
}

const Module: React.VFC<Props> = ({ imgbg, imglog }) => {
  const [isHovered, setIsHovered] = useState(true)

  return (
    <>
      <div
        className="w-[35vw] h-[35vh] border-3 border-[#00a539] rounded-[15px] overflow-hidden justify-center items-end flex relative"
        onMouseEnter={() => setIsHovered(false)}
        onMouseLeave={() => setIsHovered(true)}
      >
        <img
          src={imglog}
          alt="logo"
          className={`absolute w-[7vw] h-auto z-10 mb-3 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <img
          src={imgbg}
          alt="fondo"
          className="w-full h-full object-cover rounded-[10px] transition duration-300 ease-in-out hover:scale-125"
        />
      </div>
    </>
  )
}

export default Module
