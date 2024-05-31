import React from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
  Button,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'
import { Icon } from '@iconify/react'
import { useState } from 'react'
const { ipcRenderer } = require('electron')

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  préstamo: 'warning'
}

function Library(): JSX.Element {
  const [view, setView] = useState('books')

  //Table Books
  const renderCell = React.useCallback((user, columnKey) => {
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
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar ejemplar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar ejemplar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const columns = [
    { name: 'FOLIO', uid: 'id' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'EXISTENCIA', uid: 'existencia' },
    { name: 'ESTADO', uid: 'status' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  const users = [
    {
      id: 1,
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      status: 'disponible'
    },
    {
      id: 2,
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      status: 'inexistente'
    },
    {
      id: 3,
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      status: 'préstamo'
    }
  ]

  //Table Loans
  const renderCellloan = React.useCallback((user, columnKey) => {
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
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar ejemplar">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar ejemplar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const columnsloan = [
    { name: 'NÚMERO DE CUENTA', uid: 'id' },
    { name: 'NOMBRE', uid: 'name' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'FECHA DE DEVOLUCIÓN', uid: 'fechdev' }
  ]

  const usersloan = [
    {
      id: 1,
      name: 'NOMBRE COMPLETO',
      title: 'TITULO DEL LIBRO',
      autor: 'AUTOR DEL LIBRO',
      fechdev: '20 de Junio de 2024'
    },
    {
      id: 2,
      name: 'NOMBRE COMPLETO',
      title: 'TITULO DEL LIBRO',
      autor: 'AUTOR DEL LIBRO',
      fechdev: '20 de Junio de 2024'
    },
    {
      id: 3,
      name: 'NOMBRE COMPLETO',
      title: 'TITULO DEL LIBRO',
      autor: 'AUTOR DEL LIBRO',
      fechdev: '20 de Junio de 2024'
    }
  ]

  //Table Books Loan
  const renderCellbookloan = React.useCallback((user, columnKey) => {
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
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Eliminar ejemplar">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
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
    { name: 'FOLIO', uid: 'id' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'EXISTENCIA', uid: 'existencia' },
    { name: 'ESTADO', uid: 'status' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  const usersbookloan = [
    {
      id: 1,
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      status: 'disponible'
    }
  ]

  function handleView(value) {
    return () => {
      setView(value)
    }
  }

  const categori = [
    { key: 'folio', label: 'Folio' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'stock', label: 'Existencia' },
    { key: 'state', label: 'Estado' }
  ]

  const categoriloan = [
    { key: 'numaccount', label: 'Número de cuenta' },
    { key: 'name', label: 'Nombre' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'fechdev', label: 'Fecha de devolución' }
  ]

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
          <>
            <div className="w-full flex justify-between space-x-5">
              <Input
                type="text"
                label="Buscar libro"
                placeholder="Quimica organica IV"
                labelPlacement="inside"
                startContent={
                  <Icon icon="mdi:book-search" color="#00a539" className="w-[20px] h-[20px]" />
                }
                variant="bordered"
              />
              <Select
                label="Elige una categoría para buscar"
                placeholder="Categoría"
                className="max-w-xs"
              >
                {categori.map((categori) => (
                  <SelectItem key={categori.key}>{categori.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={users}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
        {view === 'loans' && (
          <>
            <div className="w-full flex justify-between space-x-5">
              <Input
                type="text"
                label="Buscar préstamo"
                placeholder="Kevin Serrano Bautista"
                labelPlacement="inside"
                startContent={
                  <Icon icon="fa-solid:book-reader" color="#00a539" className="w-[20px] h-[20px]" />
                }
                variant="bordered"
              />
              <Select
                label="Elige una categoría para buscar"
                placeholder="Categoría"
                className="max-w-xs"
              >
                {categoriloan.map((loan) => (
                  <SelectItem key={loan.key}>{loan.label}</SelectItem>
                ))}
              </Select>
            </div>
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columnsloan}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === 'actions' ? 'center' : 'start'}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={usersloan}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => <TableCell>{renderCellloan(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </>
        )}
        {view === 'newloan' && (
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
                  Nombre Completo <span className="text-[#ff2929]">*</span>
                </p>
                <Input
                  isRequired
                  type="text"
                  placeholder="Nombre Apellidos"
                  labelPlacement="outside"
                  className="w-[400px]"
                  variant="bordered"
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
                />
              </div>
              <div className="p-3 space-y-2 w-[600px]">
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
                  />
                  <Button isIconOnly color="default" aria-label="Like" className="bg-[#343434]">
                    <Icon
                      icon="mdi:book-plus-multiple"
                      color="white"
                      className="w-[25px] h-[25px]"
                    />
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
                  <TableBody items={usersbookloan}>
                    {(item) => (
                      <TableRow key={item.id}>
                        {(columnKey) => (
                          <TableCell>{renderCellbookloan(item, columnKey)}</TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                <Button
                  color="default"
                  className="w-[200px] h-[35px] text-[#ffffff] font-bold text-[15px] bg-[#00a539]"
                >
                  Realizar Préstamo
                </Button>
              </div>
            </div>
          </div>
        )}
        {view === 'newbook' && (
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
        )}
      </div>
    </>
  )
}

export default Library
