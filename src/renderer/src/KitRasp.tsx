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
import { useState } from 'react'
import Message from './components/Message'
import msgLego from './store/message'
import AlumnGenerate from './functions/AlumnGenerate'
const { ipcRenderer } = require('electron')
import loading from './store/load'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
}

type User = {
  id: number
  namestudent: string
  numaccount: string
  email: string
}

const columns = [
  { name: 'NOMBRE', uid: 'namestudent' },
  { name: 'NÚMERO DE CUENTA', uid: 'numaccount' },
  { name: 'EMAIL', uid: 'email' },
  { name: 'ACCIONES', uid: 'actions' }
]

function KitRasp(): JSX.Element {
  const [userss, setUsers] = useState<User[]>([])
  const [dateFinish, setFinishdate] = useState('')
  const [namestudent, setNombre] = useState('')
  const [numaccount, setNumcu] = useState('')
  const [numbox, setNumbox] = useState('')
  const [email, setEmail] = useState('')
  const [userId, setUserId] = useState(0)
  const { visible, toggleVisible } = msgLego()
  const [textMsg, setTextMsg] = useState('')
  const [tool, setTool] = useState('')
  const { toggleLoad, setkitTool } = loading()
  let fechToday = new Date()
  let fechTodayF = fechToday.toISOString().slice(0, 19).replace('T', ' ')
  let fecha = fechTodayF.split(' ')[0]
  let boxes = [
    '61',
    '62',
    '63',
    '64',
    '65',
    '66',
    '67',
    '68',
    '69',
    '70',
    '71',
    '72',
    '73',
    '74',
    '75',
    '76',
    '77',
    '78',
    '79',
    '80'
  ]
  const [filteredBoxes, setFilteredBoxes] = React.useState<string[]>([])
  let dd = String(fechToday.getDate()).padStart(2, '0')
  let mm = String(fechToday.getMonth() + 1).padStart(2, '0')
  let yyyy = fechToday.getFullYear()
  let currentDate = yyyy + '-' + mm + '-' + dd

  React.useEffect(() => {
    ipcRenderer.send('viableBoxes', [fecha, 'RaspBerry'])
    ipcRenderer.on('viableBoxes-reply', (event, arg) => {
      //console.log(arg)
      let argNums = arg.map((row) => row.numbox.toString())
      let newFilteredBoxes = boxes.filter((box) => !argNums.includes(box))
      setFilteredBoxes(newFilteredBoxes)
    })
  }, [])

  const addUser = () => {
    if (namestudent === '' || numaccount === '') {
      ipcRenderer.send('msgOption', 'Campos incompletos para agregar un usuario.')
    } else if (!/^[a-zA-Z]{2}\d{6}@uaeh\.edu\.mx$/.test(email)) {
      ipcRenderer.send('msgOption', 'Correo electrónico incorrecto.')
    } else if (userss.length < 1) {
      const newUser: User = {
        id: userId,
        namestudent: namestudent,
        numaccount: numaccount,
        email: email
      }

      setUsers([...userss, newUser])
      setNombre('')
      setNumcu('')
      setEmail('')
      setUserId(userId + 1)
    } else {
      ipcRenderer.send('msgOption', 'No esta permitido agregar mas de un alumno.')
    }
  }

  const deleteUser = (id) => {
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

  //Send request
  const sendReq = () => {
    if (userss.length === 0 || numbox === '' || dateFinish === '') {
      ipcRenderer.send('msgOption', 'Faltan campos por llenar.')
    } else {
      if (boxes.includes(numbox)) {
        setTextMsg('¿Estás seguro de que quieres enviar la petición?')
        setTool('RaspBerry')
        toggleVisible()
      } else {
        ipcRenderer.send('msgOption', 'El numero de caja seleccionado no existe.')
      }
    }
  }

  //Confirm request submission
  const handleYes = () => {
    //console.log('El usuario hizo clic en Sí')
    setkitTool(tool)
    toggleLoad()
    //Generate document
    AlumnGenerate([numbox, userss, dateFinish, 'RaspBerryCajaAlumnos']).then(
      ([outputPath, folio]) => {
        //Save record to DB and send emails
        ipcRenderer.send('saveDBsendEM', [
          numbox,
          userss,
          outputPath,
          fechTodayF,
          folio,
          dateFinish,
          'RaspBerry'
        ])
        ipcRenderer.on('saveDBsendEM-reply', (event, arg) => {
          if (arg === 1) {
            location.reload()
            toggleLoad()
          } else {
            ipcRenderer.send('msgOption', 'Error al enviar la petición, intenta de nuevo.')
            toggleLoad()
          }
        })
      }
    )
  }

  //Cancel request
  const handleNo = () => {
    ipcRenderer.send('msgOption', 'Petición no enviada.')
  }

  //Only letters input name
  function soloLetras(e) {
    var key = e.keyCode || e.which
    var tecla = String.fromCharCode(key).toLowerCase()
    var letras = ' áéíóúabcdefghijklmnñopqrstuvwxyz'
    var especiales = [8, 37, 39, 46]

    var tecla_especial = false
    for (var i in especiales) {
      if (key === especiales[i]) {
        tecla_especial = true
        break
      }
    }

    if (letras.indexOf(tecla) === -1 && !tecla_especial) {
      e.preventDefault()
    }
  }

  return (
    <>
      {visible && <Message textMsg={textMsg} onYes={handleYes} onNo={handleNo} tool={tool} />}
      <div className="w-full h-full flex flex-col m-0 p-5 justify-start items-center overflow-y-scroll">
        <p className="text-[#DC0941] font-bold text-[40px]">Kit RaspBerry para Alumno</p>
        <div className="flex flex-col justify-start p-5 w-full">
          <h2 className="text-[#DC0941] font-bold text-[25px]">RaspBerry</h2>
          <div className="flex space-x-5 items-center pl-7 text-[20px]">
            <Icon icon="solar:box-bold" color="#E1E1E1" width={40} />
            <p className="text-white">Selecciona el número de caja:</p>
            <select
              id="numbox"
              className="w-[200px] rounded-[8px] h-[50px] font-bold p-2 text-center drop-shadow-lg"
              value={numbox}
              onChange={(e) => {
                if (e.target.value.length <= 3) {
                  setNumbox(e.target.value)
                }
              }}
            >
              <option value="" disabled>
                Caja
              </option>
              {filteredBoxes.map((box) => (
                <option key={box} value={box}>
                  {box}
                </option>
              ))}
            </select>
            <Icon icon="fluent-mdl2:date-time" color="#E1E1E1" width={40} />
            <p className="text-white">Selecciona la fecha de entrega:</p>
            <input
              type="date"
              className="w-[200px] rounded-[8px] h-[50px] font-bold p-2 text-center drop-shadow-lg"
              min={currentDate}
              value={dateFinish}
              onChange={(e) => setFinishdate(e.target.value)}
            />
          </div>
          <h2 className="text-[#DC0941] font-bold text-[25px]">Alumno</h2>
          <div className="flex space-x-5 items-center pl-7 mb-3 text-[20px]">
            <Icon icon="teenyicons:id-solid" color="#E1E1E1" width={40} />
            <p className="text-white">Número de cuenta:</p>
            <input
              type="number"
              id="numaccount"
              placeholder="000000"
              className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
              value={numaccount}
              min={0}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setNumcu(e.target.value)
                }
              }}
            />
          </div>
          <div className="flex space-x-5 items-center pl-7 text-[20px] mb-5">
            <Icon icon="fa-solid:robot" color="#E1E1E1" width={40} />
            <p className="text-white">Nombre completo:</p>
            <input
              type="text"
              id="namestudent"
              placeholder="Nombres Apellidos"
              className="w-[700px] rounded-[8px] h-[40px] font-bold p-2 drop-shadow-lg"
              value={namestudent}
              onChange={(e) => setNombre(e.target.value)}
              onKeyPress={soloLetras}
            />
          </div>
          <div className="flex space-x-5 items-center pl-7 text-[20px] mb-5">
            <Icon icon="mi:email" color="#E1E1E1" width={40} />
            <p className="text-white">Correo electrónico institucional:</p>
            <input
              type="text"
              id="email"
              placeholder="xx000000@uaeh.edu.mx"
              className="w-[585px] rounded-[8px] h-[40px] font-bold p-2 drop-shadow-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="w-[160px] bg-[#DC0941] text-[#fff] font-bold"
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

export default KitRasp
