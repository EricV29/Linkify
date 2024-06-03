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
  Button,
  Input
} from '@nextui-org/react'
import { DeleteIcon } from '../icons/DeleteIcon'
import { Icon } from '@iconify/react'

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  préstamo: 'warning'
}

function NewLoansLibrary(): JSX.Element {
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
              <TableBody items={usersbookloan}>
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
