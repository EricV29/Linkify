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
import { Icon } from '@iconify/react'
import noti from '../store/notification'
import msgquestion from '../store/messageqdos'
const { ipcRenderer } = require('electron')

const statusColorMap = {
  activo: 'success',
  finalizado: 'danger'
}

type Loans = {
  iduserc_book: number
  idLoan: number
  numaccount: number
  completename: string
  title: string
  autor: string
  fechloan: string
  fechdev: string
  statusloan: string
}

function LoansLibrary(): JSX.Element {
  const renderCellloan = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case 'name':
        return <User name={cellValue}></User>
      case 'statusloan':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.statusloan] || 'default'}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2 justify-center">
            {user.statusloan === 'activo' ? (
              <Tooltip content="Terminar Prestamo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => finishLoan(user.idLoan)}
                >
                  <Icon
                    icon="mdi:book-play-outline"
                    className="w-[30px] h-[30px]"
                    color="#00a539"
                  />
                </span>
              </Tooltip>
            ) : user.statusloan === 'finalizado' ? (
              <Tooltip content="Terminar Prestamo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => finishLoan(user.idLoan)}
                >
                  <Icon
                    icon="mdi:book-play-outline"
                    className="w-[30px] h-[30px] hidden"
                    color="#00a539"
                  />
                </span>
              </Tooltip>
            ) : null}
          </div>
        )
      default:
        return cellValue
    }
  }, [])
  const [loans, setLoans] = useState<Loans[]>([])
  const { setText, toggleVisiblenoti } = noti()
  const { toggleVisiblemsgq, setTextmsgq, setToolmsgq, toggleYesmsgq, toggleNomsgq } = msgquestion()

  const [searchValue, setSearchValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [filteredLoans, setFilteredLoans] = useState<Loans[]>([])

  useEffect(() => {
    ipcRenderer.send('allLoans')
    const handleAllLoansReply = (_event, arg) => {
      const sortedLoans = arg.sort((a, b) => {
        if (a.statusloan === 'activo' && b.statusloan !== 'activo') {
          return -1
        }
        if (a.statusloan !== 'activo' && b.statusloan === 'activo') {
          return 1
        }
        return 0
      })
      setLoans(sortedLoans)
    }
    ipcRenderer.once('allLoans-reply', handleAllLoansReply)
  }, [])

  useEffect(() => {
    if (searchValue && selectedCategory) {
      const filtered = loans.filter((loan) =>
        loan[selectedCategory].toString().toLowerCase().includes(searchValue.toLowerCase())
      )
      setFilteredLoans(filtered)
    } else {
      setFilteredLoans(loans)
    }
  }, [searchValue, selectedCategory, loans])

  const columnsloan = [
    { name: 'NÚMERO DE CUENTA', uid: 'numaccount' },
    { name: 'NOMBRE', uid: 'completename' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'FECHA DE PRESTAMO', uid: 'fechloan' },
    { name: 'FECHA DE DEVOLUCIÓN', uid: 'fechdevloan' },
    { name: 'ESTADO', uid: 'statusloan' },
    { name: 'FINALIZAR PRESTAMO', uid: 'actions' }
  ]

  const categoriloan = [
    { key: 'numaccount', label: 'Número de cuenta' },
    { key: 'completename', label: 'Nombre' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'fechloan', label: 'Fecha de prestamo' },
    { key: 'fechdevloan', label: 'Fecha de devolución' },
    { key: 'statusloan', label: 'Estado' }
  ]

  const finishLoan = async (iduserc_book) => {
    setTextmsgq('¿Estás seguro de eliminar este libro?')
    setToolmsgq('Library')
    toggleVisiblemsgq()

    const userConfirmed = await new Promise((resolve) => {
      const unsubscribe = msgquestion.subscribe((state) => {
        if (state.yesmsgq) {
          resolve(true)
          toggleYesmsgq(false)
        } else if (state.nomsgq) {
          resolve(false)
          toggleNomsgq(false)
        }
        unsubscribe()
      })
    })

    if (userConfirmed) {
      console.log(iduserc_book)
      ipcRenderer.send('finishLoan', iduserc_book)
      const handleFinishLoanReply = (_event, arg) => {
        if (arg[1] === true) {
          setText('Prestamo finalizado correctamente.')
          toggleVisiblenoti()
          setTimeout(function () {
            location.reload()
          }, 2000)
        } else if (arg[1] === null) {
          setText('El id del prestamo no fue encontrado.')
          toggleVisiblenoti()
        } else {
          setText('Error al finalizar el prestamo, intentalo de nuevo.')
          toggleVisiblenoti()
        }
      }
      ipcRenderer.once('finishLoan-reply', handleFinishLoanReply)
    } else {
      setText('Prestamo no finalizado.')
      toggleVisiblenoti()
    }
  }

  return (
    <>
      <div className="space-y-3">
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
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Select
            label="Elige una categoría para buscar"
            placeholder="Categoría"
            className="max-w-xs"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoriloan.map((loan) => (
              <SelectItem key={loan.key} value={loan.key}>
                {loan.label}
              </SelectItem>
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
          <TableBody items={filteredLoans}>
            {(item) => (
              <TableRow key={item.iduserc_book}>
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
