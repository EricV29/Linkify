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
  Button
} from '@nextui-org/react'
import { DeleteIcon } from './icons/DeleteIcon'
import { EditIcon } from './icons/EditIcon'
import { Icon } from '@iconify/react'
const { ipcRenderer } = require('electron')
import { useState } from 'react'
import { Switch } from '@nextui-org/react'

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  prestamo: 'warning'
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
      status: 'prestamo'
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

  function handleView(value) {
    return () => {
      setView(value)
    }
  }

  return (
    <>
      <div className="w-full h-full p-5 flex flex-col justify-start items-center space-y-3 overflow-y-auto animate-fade animate-once animate-ease-in">
        <h1 className="text-[30px] text-[#343434]">Biblioteca</h1>
        <div className="flex w-full h-[110px] bg-[#ffffff] border-[1px] border-[#343434] rounded-t-xl pl-5 pr-5 pt-2 pb-2 justify-between">
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
              <p className="text-[#838383]">Prestamos</p>
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
            Prestamos
          </Button>
          <Button
            color="default"
            className={`w-[250px] h-[50px] text-[#ffffff] font-bold text-[25px] bg-[#343434] ${
              view === 'newloan' ? 'border-b-5 border-[#00a539]' : ''
            }`}
            onClick={handleView('newloan')}
          >
            Nuevo prestamo
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
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
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
        )}
        {view === 'loans' && (
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columnsloan}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
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
        )}
        {view === 'newloan' && (
          <div className="w-full ">
            <h1 className="text-[27px]">Nuevo prestamo</h1>
            <p>Nombre</p>
            <p>Número de cuenta</p>
            <p>Correo electrónico</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Library
