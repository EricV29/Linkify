import { useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import noti from '../store/notification'
import { useLocalStorage } from '../functions/useLocalStorage'
const { ipcRenderer } = require('electron')

function NewBookLibrary(): JSX.Element {
  const [folio, setFolio] = useLocalStorage('folio', '')
  const [title, setTitle] = useLocalStorage('title', '')
  const [autor, setAutor] = useLocalStorage('autor', '')
  const [existencia, setExistencia] = useLocalStorage('existencia', '')
  const { setText, toggleVisiblenoti } = noti()
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  const handleFolioChange = (event) => {
    setFolio(event.target.value.toUpperCase())
  }

  const handleFolioBlur = () => {
    checkStockBook(folio)
  }

  const checkStockBook = async (folio) => {
    ipcRenderer.send('checkStockBook', folio)
    const handleCheckStockBookReply = (_event, arg) => {
      if (arg[1] === true) {
        setText('El folio ingresado no esta disponible.')
        toggleVisiblenoti()
        setIsButtonDisabled(true)
      } else {
        setIsButtonDisabled(false)
      }
    }
    ipcRenderer.once('checkStockBook-reply', handleCheckStockBookReply)
  }

  const addNewBook = () => {
    const existenciaNumber = parseInt(existencia)

    if (folio === '' || title === '' || autor === '' || existencia === '') {
      setText('Todos los campos son obligatorios.')
      toggleVisiblenoti()
    } else {
      if (existenciaNumber <= 0) {
        setText('La existencia del libro debe ser mayor a 0.')
        toggleVisiblenoti()
      } else {
        ipcRenderer.send('addNewBook', [folio, title, autor, existencia])
        const handleaddNewBookReply = (_event, arg) => {
          if (arg[1] === true) {
            setText('El libro fue agregado correctamente.')
            toggleVisiblenoti()
            setTimeout(function () {
              location.reload()
            }, 2000)
            clearLocalStorage()
            setFolio('')
            setTitle('')
            setAutor('')
            setExistencia('')
          } else {
            setText('Ocurrio un error al agregar el libro.')
            toggleVisiblenoti()
          }
        }
        ipcRenderer.once('addNewBook-reply', handleaddNewBookReply)
      }
    }
  }

  const clearLocalStorage = () => {
    localStorage.removeItem('folio')
    localStorage.removeItem('title')
    localStorage.removeItem('autor')
    localStorage.removeItem('existencia')
  }

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
              value={folio}
              onInput={handleFolioChange}
              onBlur={handleFolioBlur}
            />
            <p>Título</p>
            <Input
              type="text"
              placeholder="Título de libro"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
            />
            <p>Ejemplares en existencia</p>
            <Input
              isRequired
              type="number"
              placeholder="0"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              min={1}
              value={existencia}
              onChange={(e) => setExistencia(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-start items-center pl-5">
          <Button
            isDisabled={isButtonDisabled}
            color="default"
            className="w-[220px] h-[45px] text-[#ffffff] font-bold text-[22px] bg-[#00a539]"
            onClick={addNewBook}
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
