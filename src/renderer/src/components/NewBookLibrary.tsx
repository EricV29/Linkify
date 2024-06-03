import React from 'react'
import { Button, Input } from '@nextui-org/react'
import { Icon } from '@iconify/react'

function NewBookLibrary(): JSX.Element {
  return (
    <>
      <div className="w-full ">
        <div className="flex items-center space-x-2">
          <Icon icon="oi:book" className="w-[30px] h-[30px]" color="#00a539" />
          <h1 className="text-[27px]">Agregar nuevo Libro</h1>
        </div>
        <hr className="w-full h-[2px] bg-[#343434]" />
        <div className=" w-full p-5 flex">
          <div className=" w-1/2 space-y-2">
            <p>Folio</p>
            <Input
              type="text"
              placeholder="FOLIO"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
            />
            <p>Título</p>
            <Input
              type="text"
              placeholder="Título de libro"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
            />
          </div>
          <div className=" w-1/2 h-[20px] space-y-2">
            <p>Autor</p>
            <Input
              isRequired
              type="text"
              placeholder="Autor del libro"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
            />
            <p>Ejemplares en existencia</p>
            <Input
              isRequired
              type="number"
              placeholder="0"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
            />
          </div>
        </div>
        <div className="w-full flex justify-start items-center pl-5">
          <Button
            color="default"
            className="w-[220px] h-[45px] text-[#ffffff] font-bold text-[22px] bg-[#00a539]"
          >
            <Icon icon="mdi:book-plus" className="w-[30px] h-[30px]" />
            Agregar
          </Button>
        </div>
      </div>
    </>
  )
}

export default NewBookLibrary
