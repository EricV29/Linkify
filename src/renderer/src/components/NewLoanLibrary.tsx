import { useState, useCallback, useEffect } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Button,
  Input
} from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { Icon } from '@iconify/react'
import noti from '../store/notification'
import { v4 as uuidv4 } from 'uuid'
import usercred from '../store/usercred'
import { useLocalStorage } from '../functions/useLocalStorage'
const { ipcRenderer } = require('electron')

type Book = {
  id: string
  autor: string
  existencia: number
  folio: string
  title: string
  statusbook: string
}

function NewLoansLibrary(): JSX.Element {
  const [formData, setFormData] = useLocalStorage('formData', {
    firstname: '',
    secondname: '',
    firstlastname: '',
    secondlastname: '',
    degree: '',
    numaccount: '',
    email: '',
    fechdev: ''
  })

  const [folio, setFolio] = useState('')
  const [bookData, setBookData] = useState<Book[]>([])
  const { setText, toggleVisiblenoti } = noti()
  const { idul } = usercred()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleFolioChange = (e) => {
    setFolio(e.target.value)
  }

  const newLoan = () => {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    const formattedTime = currentDate.toTimeString().split(' ')[0]
    const fechaloan = `${formattedDate} ${formattedTime}`
    const AllData = { ...formData, fechaloan, books: bookData, idUser: idul }

    if (
      formData.firstname === '' ||
      formData.firstlastname === '' ||
      formData.secondlastname === '' ||
      formData.degree === '' ||
      formData.numaccount === '' ||
      formData.email === '' ||
      formData.fechdev === '' ||
      bookData.length === 0 ||
      !/^[a-zA-Z]{2}\d{6}@uaeh\.edu\.mx$/.test(formData.email)
    ) {
      setText('Hay campos vacios o incorrectos.')
      toggleVisiblenoti()
    } else {
      //console.log(AllData)
      ipcRenderer.send('newLoan', AllData)
      const handleNewLoanReply = (_event, arg) => {
        if (arg[1] === true) {
          setText('Prestamo realizado correctamente.')
          toggleVisiblenoti()
          setTimeout(function () {
            location.reload()
          }, 2000)
          localStorage.removeItem('formData')
          setFormData({
            firstname: '',
            secondname: '',
            firstlastname: '',
            secondlastname: '',
            degree: '',
            numaccount: '',
            email: '',
            fechdev: ''
          })
          setFolio('')
          setBookData([])
        } else {
          setText('Error al realizar el prestamo, intentalo de nuevo.')
          toggleVisiblenoti()
        }
      }

      ipcRenderer.once('newLoan-reply', handleNewLoanReply)
      //console.log(AllData)
    }
  }

  const searchFolio = () => {
    if (folio === '') {
      setText('Campo "Foliov" vacío.')
      toggleVisiblenoti()
    } else {
      ipcRenderer.send('selectBook', folio)
      const handleSelectBookReply = (_event, arg: Book[]) => {
        if (arg && arg.length > 0) {
          const updatedBooks = arg.map((book) => ({ ...book, id: uuidv4() }))
          const bookExists = bookData.find((book) => book.folio === arg[0].folio)

          if (arg[0].existencia <= 0 || arg[0].statusbook === 'préstamo') {
            setText('El libro no esta disponible para prestamo.')
            toggleVisiblenoti()
          } else if (bookExists) {
            const countExistingBooks = bookData.filter((book) => book.folio === arg[0].folio).length
            if (countExistingBooks < arg[0].existencia) {
              setBookData((prevBookData) => [...prevBookData, ...updatedBooks])
            } else {
              setText('Ya no se pueden agregar más libros como este.')
              toggleVisiblenoti()
            }
          } else {
            setBookData((prevBookData) => [...prevBookData, ...updatedBooks])
          }
        } else {
          setText('No se encontraron libros con el folio proporcionado.')
          toggleVisiblenoti()
        }
      }

      ipcRenderer.once('selectBook-reply', handleSelectBookReply)

      return () => {
        ipcRenderer.removeListener('selectBook-reply', handleSelectBookReply)
      }
    }

    return null
  }

  const handleDeleteBook = (id: string) => {
    setBookData((prevBookData) => prevBookData.filter((book) => book.id !== id))
  }

  const renderCellbookloan = useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return <User name={cellValue}></User>
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Eliminar ejemplar">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDeleteBook(user.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const columnsbookloan = [
    { name: 'FOLIO', uid: 'folio' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'EXISTENCIA', uid: 'existencia' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  return (
    <>
      <div className="w-full ">
        <div className="flex items-center space-x-2">
          <Icon icon="mdi:read-more" className="w-[30px] h-[30px]" color="#00a539" />
          <h1 className="text-[27px]">Generar préstamo</h1>
        </div>
        <hr className="w-full h-[2px] bg-[#343434]" />
        <div className="flex justify-between text-[15px]">
          <div className="p-3 space-y-2 ">
            <h2 className="text-[#00a539] ml-[-10px]">Datos personales</h2>
            <p>
              Primer Nombre <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="text"
              placeholder="Primer Nombre"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="firstname"
              value={formData.firstname}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[a-zA-Z]*$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
            />

            <p>Segundo Nombre</p>
            <Input
              isRequired
              type="text"
              placeholder="Segundo Nombre"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="secondname"
              value={formData.secondname}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[a-zA-Z]*$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
            />
            <p>
              Apellido Paterno <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="text"
              placeholder="Apellido Paterno"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="firstlastname"
              value={formData.firstlastname}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[a-zA-Z]*$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
            />
            <p>
              Apellido Materno <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="text"
              placeholder="Apellido Materno"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="secondlastname"
              value={formData.secondlastname}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[a-zA-Z]*$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
            />
            <p>
              Semestre en curso <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="number"
              placeholder="000"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="degree"
              value={formData.degree}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[0-9]{0,3}$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
              onKeyPress={(event) => {
                if (event.key === '-') {
                  event.preventDefault()
                }
              }}
            />
            <p>
              Número de cuenta <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="text"
              placeholder="XXXXXX"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="numaccount"
              value={formData.numaccount}
              onChange={(event) => {
                const { value } = event.target
                const regMatch = /^[0-9]{0,6}$/.test(value)
                if (regMatch) {
                  handleInputChange(event)
                }
              }}
              onKeyPress={(event) => {
                if (event.key === '-') {
                  event.preventDefault()
                }
              }}
            />
            <p>
              Correo electrónico <span className="text-[#ff2929]">*</span>
            </p>
            <Input
              isRequired
              type="email"
              placeholder="aaXXXXXX@uaeh.edu.mx"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="p-3 space-y-2 w-[600px]">
            <h2 className="text-[#00a539] ml-[-10px]">Prestamo</h2>
            <h2 className="text-[#000000] ml-[-10px]">Fecha de devolución</h2>
            <Input
              isRequired
              type="date"
              labelPlacement="outside"
              className="w-[400px]"
              variant="bordered"
              name="fechdev"
              value={formData.fechdev}
              min={new Date().toISOString().split('T')[0]}
              onChange={handleInputChange}
            />

            <h2 className="text-[#00a539] ml-[-10px]">Libros</h2>
            <p>
              Ingresa el folio del libro <span className="text-[#ff2929]">*</span>
            </p>
            <div className="flex space-x-3">
              <Input
                isRequired
                type="text"
                placeholder="FOLIO"
                labelPlacement="outside"
                className="w-[200px]"
                variant="bordered"
                name="folio"
                value={folio}
                onChange={handleFolioChange}
              />
              <Button
                isIconOnly
                color="default"
                aria-label="Like"
                className="bg-[#343434]"
                onClick={searchFolio}
              >
                <Icon icon="mdi:book-plus-multiple" color="white" className="w-[25px] h-[25px]" />
              </Button>
            </div>
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columnsbookloan}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={bookData}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCellbookloan(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Button
              color="default"
              className="w-[200px] h-[35px] text-[#ffffff] font-bold text-[15px] bg-[#00a539]"
              onClick={newLoan}
            >
              Realizar Préstamo
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewLoansLibrary
