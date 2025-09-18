import React, { useState, useEffect } from 'react'
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import noti from './store/notification'
import usercred from './store/usercred'
const { ipcRenderer } = require('electron')

const LoanLaptop = () => {
  const { setText, toggleVisiblenoti } = noti()
  const [dataloan, setDataloan] = useState({
    numemp: '',
    nipemp: '',
    numequip: '',
    fechloanequip: ''
  })
  //const [numequip, setEquip] = useState('')
  const [filteredEquip, setFilteredEquip] = React.useState<string[]>([])
  let equips = ['1', '2', '3', '4', '1L', '2L']
  const [loans, setLoans] = useState([])
  const { idul } = usercred()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [nip, setNip] = useState('')
  const [idLoanequip, setIdLoanequip] = useState('')
  const [numProf, setNumProf] = useState('')
  const [numequip, setNumE] = useState('')

  useEffect(() => {
    ipcRenderer.send('viableEquip', 1)
    ipcRenderer.on('viableEquip-reply', (_event, arg) => {
      //onsole.log(arg)
      let argNums = arg.map((row) => row.numequip)
      let newFilteredEquip = equips.filter((equip) => !argNums.includes(equip))
      setFilteredEquip(newFilteredEquip)
    })

    ipcRenderer.send('loansEquip', 1)
    ipcRenderer.on('loansEquip-reply', (_event, arg) => {
      const formattedArg = arg.map((loan) => ({
        ...loan,
        fechloanequip: formattedDate(new Date(loan.fechloanequip)),
        fechdevloanequip:
          loan.fechdevloanequip === null ? ' ' : formattedDate(new Date(loan.fechdevloanequip))
      }))
      setLoans(formattedArg)
    })
  }, [])

  const formattedDate = (date) => {
    const options = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Mexico_City'
    }

    return date ? date.toLocaleString('es-ES', options) : ' '
  }

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
      case 'statusloanequip':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.statusloanequip]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center">
            {user.statusloanequip === 'activo' ? (
              <Tooltip content="Finalizar prestamo">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => {
                    onOpen()
                    setIdLoanequip(user.idLoanequip)
                    setNumProf(user.numempprof)
                    setNumE(user.numequip)
                  }}
                >
                  <Icon icon="ph:seal-check-bold" color="#00a539" className="w-[30px] h-[30px]" />
                </span>
              </Tooltip>
            ) : user.statusloanequip === 'finalizado' ? (
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
    { name: 'NOMBRE', uid: 'nameprof' },
    { name: 'NUM. EQUIPO', uid: 'numequip' },
    { name: 'PRESTAMO', uid: 'fechloanequip' },
    { name: 'DEVOLUCIÓN', uid: 'fechdevloanequip' },
    { name: 'ESTADO', uid: 'statusloanequip' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  function formatDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}`
  }

  const loanLap = () => {
    if (dataloan.numemp === '' || dataloan.nipemp === '' || dataloan.numequip === '') {
      setText('Todos los campos necesitan estar llenos.')
      toggleVisiblenoti()
      return
    } else {
      //console.log(dataloan.numemp)
      dataloan.fechloanequip = formatDate()
      ipcRenderer.send('verifyEmployee', [
        dataloan.numemp,
        dataloan.nipemp,
        dataloan.numequip,
        dataloan.fechloanequip,
        idul
      ])
      ipcRenderer.once('verifyEmployee-reply', (_event, arg) => {
        if (arg === false) {
          setText('Datos incorrectos.')
          toggleVisiblenoti()
        } else if (arg === true) {
          //console.log(arg)
          setTimeout(function () {
            location.reload()
          }, 2000)
          setText('Prestamo realizado.')
          toggleVisiblenoti()
        }
      })
    }
  }

  const finishLoanEquip = () => {
    if (nip === '' || idLoanequip === '') {
      setText('Ingresa el NIP.')
      toggleVisiblenoti()
      return
    } else {
      const fechdev = new Date()
      ipcRenderer.send('finishLoanEquip', [fechdev, idLoanequip, numProf, nip, numequip])
      ipcRenderer.once('finishLoanEquip-reply', (_event, arg) => {
        if (arg === false) {
          setText('El NIP no es correcto.')
          toggleVisiblenoti()
          setNip('')
        } else if (arg === true) {
          setTimeout(function () {
            location.reload()
          }, 2000)
          setNip('')
          setText('Prestamo finalizado.')
          toggleVisiblenoti()
        }
      })
    }
  }

  return (
    <>
      <div className="w-full h-full p-4 flex justify-center items-start overflow-y-auto animate-fade animate-once animate-ease-in">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={'blur'}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Finalizar prestamo</ModalHeader>
                <ModalBody>
                  <p>Para poder finalizar tu préstamo, ingresa el NIP.</p>
                  <Input
                    isRequired
                    type="password"
                    placeholder="****"
                    labelPlacement="outside"
                    className="w-full"
                    variant="bordered"
                    aria-label="NIP"
                    value={nip}
                    onChange={(e) => {
                      const sanitizedValue = e.target.value.replace(/[^0-9]/g, '')
                      if (/^\d{0,4}$/.test(sanitizedValue)) {
                        setNip(sanitizedValue)
                      }
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="success"
                    className="text-white"
                    onPress={onClose}
                    onClick={finishLoanEquip}
                  >
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
              type="text"
              placeholder="000000"
              labelPlacement="outside"
              className="w-full"
              variant="bordered"
              aria-label="Número de empleado"
              value={dataloan.numemp}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/-/g, '')
                if (/^\d{0,6}$/.test(sanitizedValue)) {
                  setDataloan({ ...dataloan, numemp: sanitizedValue })
                }
              }}
            />
            <p>NIP de Empleado</p>
            <Input
              isRequired
              type="password"
              placeholder="****"
              labelPlacement="outside"
              className="w-full"
              variant="bordered"
              aria-label="Nip de empleado"
              value={dataloan.nipemp}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/[^0-9]/g, '')
                if (/^\d{0,4}$/.test(sanitizedValue)) {
                  setDataloan({ ...dataloan, nipemp: sanitizedValue })
                }
              }}
            />
            <p>Número de Laptop</p>
            <Select
              placeholder="Selecciona"
              className="w-full"
              color="success"
              aria-label="Número de laptop"
              onChange={(e) => setDataloan({ ...dataloan, numequip: e.target.value })}
            >
              {filteredEquip.map((equip) => (
                <SelectItem key={equip} value={equip}>
                  {equip}
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
            <TableBody items={loans}>
              {(item: any) => (
                <TableRow key={item.idLoanequip}>
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
