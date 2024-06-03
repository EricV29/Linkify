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

function LoansLibrary(): JSX.Element {
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

  const categoriloan = [
    { key: 'numaccount', label: 'Número de cuenta' },
    { key: 'name', label: 'Nombre' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'fechdev', label: 'Fecha de devolución' }
  ]

  return (
    <>
      <div className="space-y-3">
        {' '}
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
      </div>
    </>
  )
}

export default LoansLibrary
