import React, { useEffect, useState } from 'react'
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
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { Icon } from '@iconify/react'
const { ipcRenderer } = require('electron')

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  préstamo: 'warning'
}

interface AllDataBooks {
  id: number
  folio: string
  title: string
  autor: string
  existencia: number
  status: string
}

function BooksLibrary(): JSX.Element {
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
      case 'statusbook':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.statusbook]}
            size="sm"
            variant="flat"
          >
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
  const [allbooks, setAllBooks] = useState<AllDataBooks[]>([])

  useEffect(() => {
    ipcRenderer.send('allBooks')
    ipcRenderer.on('allBooks-reply', (_event, arg) => {
      console.log(arg)
      setAllBooks(arg)
    })

    return () => {
      ipcRenderer.removeAllListeners('allBooks-reply')
    }
  }, [])

  const columns = [
    { name: 'FOLIO', uid: 'folio' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'EXISTENCIA', uid: 'existencia' },
    { name: 'ESTADO', uid: 'statusbook' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  const users = [
    {
      folio: 'ff',
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      statusbook: 'disponible'
    },
    {
      folio: 'sdd',
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      statusbook: 'inexistente'
    },
    {
      folio: 'd',
      title: 'TITULO',
      autor: 'AUTOR',
      existencia: '1',
      statusbook: 'préstamo'
    }
  ]

  const categori = [
    { key: 'folio', label: 'Folio' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'stock', label: 'Existencia' },
    { key: 'state', label: 'Estado' }
  ]

  return (
    <>
      <div className="space-y-3">
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
              <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={allbooks}>
            {(item) => (
              <TableRow key={item.folio}>
                {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default BooksLibrary
