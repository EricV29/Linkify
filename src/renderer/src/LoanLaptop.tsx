import React, { useState } from 'react'
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import noti from './store/notification'

const LoanLaptop = () => {
  const { setText, toggleVisiblenoti } = noti()
  const [dataloan, setDataloan] = useState({
    numemp: '',
    nipemp: '',
    numequip: ''
  })

  const categori = [
    { key: '1', label: '1' },
    { key: '2', label: '2' }
  ]

  const statusColorMap = {
    activo: 'success',
    finalizado: 'danger'
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <User description={user.numemp} name={cellValue}>
            {user.numemp}
          </User>
        )
      case 'status':
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center">
            {user.status === 'activo' ? (
              <Tooltip content="Finalizar prestamo">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Icon icon="ph:seal-check-bold" color="#00a539" className="w-[30px] h-[30px]" />
                </span>
              </Tooltip>
            ) : user.status === 'finalizado' ? (
              <Tooltip content="Prestamo finalizado">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <Icon icon="ph:seal-check-fill" color="#00a539" className="w-[30px] h-[30px]" />
                </span>
              </Tooltip>
            ) : null}
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const columns = [
    { name: 'NOMBRE', uid: 'name' },
    { name: 'PRESTAMO', uid: 'datetloan' },
    { name: 'DEVOLUCIÓN', uid: 'datetdloan' },
    { name: 'ESTADO', uid: 'status' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  const users = [
    {
      id: 1,
      name: 'Eric',
      numemp: '440248',
      datetloan: '2022-10-10 10:00:00 am',
      datetdloan: '2022-10-10 11:00:00 am',
      status: 'activo'
    },
    {
      id: 2,
      name: 'Jared',
      numemp: '34827',
      datetloan: '2022-10-10 10:00:00 am',
      datetdloan: '2022-10-10 11:00:00 am',
      status: 'finalizado'
    },
    {
      id: 3,
      name: 'Jared',
      numemp: '34827',
      datetloan: '2022-10-10 10:00:00 am',
      datetdloan: '2022-10-10 11:00:00 am',
      status: 'finalizado'
    }
  ]

  const loanLap = () => {
    if (dataloan.numemp === '' || dataloan.nipemp === '' || dataloan.numequip === '') {
      setText('Todos los campos necesitan estar llenos.')
      toggleVisiblenoti()
      return
    } else {
      setText('Prestamo realizado correctamente.')
      toggleVisiblenoti()
    }
  }

  return (
    <>
      <div className="w-full h-full p-4 flex justify-center items-start overflow-y-auto animate-fade animate-once animate-ease-in">
        <div className="w-1/3 p-3 space-y-4">
          <Button
            isIconOnly
            color="default"
            variant="shadow"
            aria-label="Take a photo"
            className="w-full h-[294px] flex flex-col space-y-8 bg-[#00a539]"
            onClick={loanLap}
          >
            <Icon icon="twemoji:laptop" className="w-[200px] h-[200px]" />
            <h1 className="text-[40px] text-[#ffffff]">Prestar</h1>
          </Button>
          <div className="w-full flex flex-col justify-center items-center space-y-2">
            <p>Número de Empleado</p>
            <Input
              isRequired
              type="number"
              placeholder="000000"
              labelPlacement="outside"
              className="w-full"
              variant="bordered"
              aria-label="Número de empleado"
              value={dataloan.numemp}
              onChange={(e) => setDataloan({ ...dataloan, numemp: e.target.value })}
            />
            <p>NIP de Empleado</p>
            <Input
              isRequired
              type="password"
              placeholder="******"
              labelPlacement="outside"
              className="w-full"
              variant="bordered"
              aria-label="Nip de empleado"
              value={dataloan.nipemp}
              onChange={(e) => setDataloan({ ...dataloan, nipemp: e.target.value })}
            />
            <p>Número de Laptop</p>
            <Select
              placeholder="Selecciona"
              className="w-full"
              color="success"
              aria-label="Número de laptop"
              onChange={(e) => setDataloan({ ...dataloan, numequip: e.target.value })}
            >
              {categori.map((categori) => (
                <SelectItem key={categori.key} value={categori.label}>
                  {categori.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="w-2/3 h-full p-3 overflow-y-auto space-y-3">
          <h2 className="text-[#00a539] text-[20px]">Prestamos realizados</h2>
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
      </div>
    </>
  )
}

export default LoanLaptop
