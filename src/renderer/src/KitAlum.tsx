import { Icon } from '@iconify/react'
import { Button } from '@nextui-org/react'
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
  Tooltip
} from '@nextui-org/react'
import { EditIcon } from './icons/EditIcon'
import { DeleteIcon } from './icons/DeleteIcon'
import { columns, users } from './data/data'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
}

function Kittec(): JSX.Element {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return <User name={cellValue}></User>
      case 'numcu':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar usuario">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar usuario">
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

  return (
    <>
      <div className="w-full h-full flex flex-col m-0 p-5 justify-start items-center overflow-y-scroll">
        <p className="text-[#C80000] font-bold text-[40px]">Kit Lego para Alumno</p>
        <div className="flex flex-col justify-start p-5 w-full">
          <h2 className="text-black font-bold text-[25px]">Lego</h2>
          <div className="flex space-x-5 items-center pl-7 text-[20px]">
            <Icon icon="solar:box-bold" color="#FED700" width={40} />
            <p>Escribe el Número de Caja:</p>
            <input
              type="number"
              className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
            />
          </div>
          <h2 className="text-black font-bold text-[25px]">Alumno</h2>
          <div className="flex space-x-5 items-center pl-7 mb-3 text-[20px]">
            <Icon icon="teenyicons:id-solid" color="#FED700" width={40} />
            <p>Número de Cuenta:</p>
            <input
              type="number"
              className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
            />
          </div>
          <div className="flex space-x-5 items-center pl-7 text-[20px] mb-5">
            <Icon icon="mdi:user" color="#FED700" width={40} />
            <p>Nombre Completo:</p>
            <input
              type="text"
              className="w-[700px] rounded-[8px] h-[40px] font-bold p-2 drop-shadow-lg"
            />
            <Button
              className="w-[160px] bg-[#a2191a] text-[#fff] font-bold"
              variant="shadow"
              color="danger"
            >
              AGREGAR <Icon icon="solar:user-plus-bold" className="pt-1" width={30} />
            </Button>
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
          <div className="flex w-full justify-center mt-5">
            <Button
              className="w-[200px] bg-[#55AB01] text-[#fff] font-bold"
              variant="shadow"
              color="success"
            >
              ENVIAR <Icon icon="mingcute:mail-send-fill" className="pt-1" width={50} />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Kittec
