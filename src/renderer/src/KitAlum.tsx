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
import { DeleteIcon } from './icons/DeleteIcon'
import { useState, useEffect } from 'react'
import Message from './components/Message'
import msgLego from './store/message'
const { ipcRenderer } = require('electron')

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
}

type User = {
  id: number
  namestudent: string
  numaccount: string
}

const columns = [
  { name: 'NOMBRE', uid: 'namestudent' },
  { name: 'NÚMERO DE CUENTA', uid: 'numaccount' },
  { name: 'ACCIONES', uid: 'actions' }
]

function Kittec(): JSX.Element {
  const [userss, setUsers] = useState<User[]>([])
  const [namestudent, setNombre] = useState('')
  const [numaccount, setNumcu] = useState('')
  const [numbox, setNumbox] = useState('')
  const [userId, setUserId] = useState(0)
  const { visible, toggleVisible } = msgLego()
  const [textMsg, setTextMsg] = useState('')

  useEffect(() => {
    console.log(userss)
  }, [userss])

  const addUser = () => {
    if (namestudent === '' || numaccount === '') {
      ipcRenderer.send('msgOption', 'Campos incompletos para agregar un usuario')
    } else {
      const newUser: User = {
        id: userId,
        namestudent: namestudent,
        numaccount: numaccount
      }

      setUsers([...userss, newUser])
      setNombre('')
      setNumcu('')
      setUserId(userId + 1)
    }
  }

  const deleteUser = (id) => {
    console.log(id)
    setUsers((userss) => userss.filter((user) => user.id !== id))
  }

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
            <Tooltip color="danger" content="Eliminar usuario">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteUser(user.id)}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  const sendReq = () => {
    if (userss.length === 0 || numbox === '') {
      ipcRenderer.send('msgOption', 'Faltan campos por llenar')
    } else {
      setTextMsg('¿Estás seguro de que quieres enviar la petición?')
      toggleVisible()
    }
  }

  const handleYes = () => {
    console.log('El usuario hizo clic en Sí')
    ipcRenderer.send('petitionA', [numbox, userss])
    ipcRenderer.send('msgOption', 'Petició enviada')
    setNumbox('')
    setNumcu('')
    setNombre('')
    setUsers([])
  }

  const handleNo = () => {
    ipcRenderer.send('msgOption', 'Petició no enviada')
  }

  return (
    <>
      {visible && <Message textMsg={textMsg} onYes={handleYes} onNo={handleNo} />}
      <div className="w-full h-full flex flex-col m-0 p-5 justify-start items-center overflow-y-scroll">
        <p className="text-[#C80000] font-bold text-[40px]">Kit Lego para Alumno</p>
        <div className="flex flex-col justify-start p-5 w-full">
          <h2 className="text-black font-bold text-[25px]">Lego</h2>
          <div className="flex space-x-5 items-center pl-7 text-[20px]">
            <Icon icon="solar:box-bold" color="#FED700" width={40} />
            <p>Escribe el Número de Caja:</p>
            <input
              type="number"
              id="numbox"
              className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
              value={numbox}
              onChange={(e) => setNumbox(e.target.value)}
            />
          </div>
          <h2 className="text-black font-bold text-[25px]">Alumno</h2>
          <div className="flex space-x-5 items-center pl-7 mb-3 text-[20px]">
            <Icon icon="teenyicons:id-solid" color="#FED700" width={40} />
            <p>Número de Cuenta:</p>
            <input
              type="number"
              id="numaccount"
              className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
              value={namestudent}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="flex space-x-5 items-center pl-7 text-[20px] mb-5">
            <Icon icon="mdi:user" color="#FED700" width={40} />
            <p>Nombre Completo:</p>
            <input
              type="text"
              id="namestudent"
              className="w-[700px] rounded-[8px] h-[40px] font-bold p-2 drop-shadow-lg"
              value={numaccount}
              onChange={(e) => setNumcu(e.target.value)}
            />
            <Button
              className="w-[160px] bg-[#a2191a] text-[#fff] font-bold"
              variant="shadow"
              color="danger"
              onClick={addUser}
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
            <TableBody items={userss}>
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
              onClick={sendReq}
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
