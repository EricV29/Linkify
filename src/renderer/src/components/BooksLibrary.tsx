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
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { Icon } from '@iconify/react'

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  préstamo: 'warning'
}

function BooksLibrary(): JSX.Element {
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
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
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
