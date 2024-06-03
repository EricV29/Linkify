import React from 'react'
import { Button } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import BooksLibrary from './components/BooksLibrary'
import LoansLibrary from './components/LoansLibrary'
import NewLoanLibrary from './components/NewLoanLibrary'
import NewBookLibrary from './components/NewBookLibrary'

function Library(): JSX.Element {
  const [view, setView] = useState('books')

  function handleView(value) {
    return () => {
      setView(value)
    }
  }

  return (
    <>
      <div className="w-full h-full p-4 flex flex-col justify-start items-center space-y-3 overflow-y-auto animate-fade animate-once animate-ease-in">
        <h1 className="text-[30px] text-[#343434] mt-[-15px]">Biblioteca</h1>
        <div className="flex w-full bg-[#ffffff] border-[1px] border-[#343434] rounded-t-xl pl-5 pr-5 pt-2 pb-2 justify-between">
          <div className="h-full w-[200px] flex justify-center items-center space-x-2">
            <div className="rounded-full w-[65px] h-[65px] bg-[#00a539] flex justify-center items-center">
              <Icon icon="lets-icons:book-check-fill" color="white" className="w-[30px] h-[30px]" />
            </div>
            <div>
              <p className="text-[#838383]">Disponibles</p>
              <p className="font-bold">140</p>
            </div>
          </div>
          <div className="h-full w-[200px] flex justify-center items-center space-x-2">
            <div className="rounded-full w-[65px] h-[65px] bg-[#00a539] flex justify-center items-center">
              <Icon icon="mdi:books-minus" color="white" className="w-[30px] h-[30px]" />
            </div>
            <div>
              <p className="text-[#838383]">Préstamos</p>
              <p className="font-bold">30</p>
            </div>
          </div>
          <div className="h-full w-[200px] flex justify-center items-center space-x-2">
            <div className="rounded-full w-[65px] h-[65px] bg-[#00a539] flex justify-center items-center">
              <Icon icon="ion:library-sharp" color="white" className="w-[30px] h-[30px]" />
            </div>
            <div>
              <p className="text-[#838383]">Existentes</p>
              <p className="font-bold">140</p>
            </div>
          </div>
          <div className="h-full w-[200px] flex justify-center items-center space-x-2">
            <div className="rounded-full w-[65px] h-[65px] bg-[#00a539] flex justify-center items-center">
              <Icon icon="mdi:books-remove" color="white" className="w-[30px] h-[30px]" />
            </div>
            <div>
              <p className="text-[#838383]">Inexistentes</p>
              <p className="font-bold">0</p>
            </div>
          </div>
        </div>
        <div className="flex w-full bg-[#ffffff] justify-between items-center">
          <Button
            color="default"
            className={`w-[250px] h-[50px] text-[#ffffff] font-bold text-[25px] bg-[#343434] ${
              view === 'books' ? 'border-b-5 border-[#00a539]' : ''
            }`}
            onClick={handleView('books')}
          >
            Libros
          </Button>
          <Button
            color="default"
            className={`w-[250px] h-[50px] text-[#ffffff] font-bold text-[25px] bg-[#343434] ${
              view === 'loans' ? 'border-b-5 border-[#00a539]' : ''
            }`}
            onClick={handleView('loans')}
          >
            Préstamos
          </Button>
          <Button
            color="default"
            className={`w-[250px] h-[50px] text-[#ffffff] font-bold text-[25px] bg-[#343434] ${
              view === 'newloan' ? 'border-b-5 border-[#00a539]' : ''
            }`}
            onClick={handleView('newloan')}
          >
            Nuevo préstamo
          </Button>
          <Button
            color="default"
            className={`w-[250px] h-[50px] text-[#ffffff] font-bold text-[25px] bg-[#343434] ${
              view === 'newbook' ? 'border-b-5 border-[#00a539]' : ''
            }`}
            onClick={handleView('newbook')}
          >
            Nuevo libro
          </Button>
        </div>

        {view === 'books' && (
          <div className="h-full w-full">
            <BooksLibrary />
          </div>
        )}
        {view === 'loans' && (
          <div className="h-full w-full">
            <LoansLibrary />
          </div>
        )}
        {view === 'newloan' && <NewLoanLibrary />}
        {view === 'newbook' && <NewBookLibrary />}
      </div>
    </>
  )
}

export default Library
