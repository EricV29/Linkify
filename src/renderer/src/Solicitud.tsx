import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from '@nextui-org/react'
import { Icon } from '@iconify/react'
const { ipcRenderer } = require('electron')

type Request = {
  idPetition: number
  numbox: string
  namedoc: string
  folio: string
  fechreg: string
  fechfinish: string
  state: number
}

interface Alumn {
  key: string
  nameAlumn: string
  numaccount: string
}

function Soli(): JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [activeR, setActiveR] = useState<Request[]>([])
  const [completeR, setCompleteR] = useState<Request[]>([])
  const [alumns, setAlumns] = useState<Alumn[]>([])
  const [folio, setFolio] = useState(null)
  const [numbox, setNumbox] = useState(null)
  const [pin, setPin] = useState('')
  const [id, setID] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ipcRenderer.send('AllRequests', 'Solicitudes')
    ipcRenderer.on('AllRequests-reply', (event, arg) => {
      setActiveR(arg[0])
      setCompleteR(arg[1])
    })
  }, [])

  const descPetition = ([arg, folio, numbox]) => {
    //console.log(arg)
    ipcRenderer.send('AlumnsRequest', arg)
    setID(arg)
    ipcRenderer.once('AlumnsRequest-reply', (event, arg) => {
      //console.log(arg)
      setFolio(folio)
      setNumbox(numbox)
      setAlumns(arg)
    })

    onOpen()
  }

  const requestFinish = () => {
    //console.log(pin)
    //console.log(id)
    if (pin === '') {
      ipcRenderer.send('msgOption', 'Falta un PIN')
    } else if (/^\d+$/.test(pin)) {
      ipcRenderer.send('FinishRequest', [pin, id])
    } else {
      ipcRenderer.send('msgOption', 'Error de PIN')
    }
    ipcRenderer.once('FinishRequest-reply', (event, arg) => {
      if (arg === 1) {
        navigate('/legospike/kittec')
        console.log(location.pathname)
        window.location.reload()
      }
    })
  }

  const rows = alumns.map((alumn, index) => ({
    key: index.toString(),
    name: alumn.nameAlumn,
    role: alumn.numaccount.toString()
  }))

  const columns = [
    {
      key: 'name',
      label: 'NOMBRE'
    },
    {
      key: 'role',
      label: 'NÚMERO DE CUENTA'
    }
  ]

  return (
    <>
      <div className="w-full h-full flex flex-col m-0 justify-start items-start overflow-y-scroll p-5">
        <Tabs aria-label="Options" color="danger" variant="solid">
          <Tab
            key="enable"
            className="w-full"
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="fa6-solid:box-open" />
                <span>Activas</span>
              </div>
            }
          >
            <Card className="bg-[#00000000]">
              <CardBody className="space-y-3">
                {activeR.map((request, index) => (
                  <Button
                    key={request.idPetition}
                    onPress={() =>
                      descPetition([request.idPetition, request.folio, request.numbox])
                    }
                    className="w-full h-[90px] bg-white"
                    variant="solid"
                    color="default"
                  >
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex items-center font-semibold">
                        <Icon
                          icon="ph:lego-bold"
                          className="w-[50px] h-[50px] mr-5"
                          color="#FED700"
                        />
                        <div className="w-[100px] h-[60px] rounded-lg text-white bg-[#FED700] space-y-1">
                          <p className="text-black">Caja</p>
                          <p className="font-bold text-[30px]">{request.numbox}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-semibold w-[390px] h-[60px] rounded-lg bg-[#FED700] items-center justify-center">
                        <p>Nombre del documento</p>
                        <p className="text-white text-[20px]">{request.namedoc}</p>
                      </div>
                      <div className="flex flex-col font-semibold w-[130px] h-[60px] rounded-lg bg-[#FED700] items-center justify-center">
                        <p>Folio</p>
                        <p className="text-white text-[20px]">{request.folio}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 bg-[#FED700] rounded-lg w-[250px] h-[60px]">
                        <Icon
                          icon="fluent-mdl2:date-time"
                          className="w-[40px] h-[40px]"
                          color="white"
                        />
                        <div className="flex flex-col font-semibold space-y-1 text-start">
                          <p className="bg-[#02ae4d] rounded-md w-full h-[20px] text-white">
                            Inicio de prestamo: {request.fechreg}
                          </p>
                          <p className="bg-[#dd1a21] rounded-md w-full h-[20px] text-white">
                            Limite de prestamo: {request.fechfinish}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalBody className="flex items-center">
                          <ModalHeader className="flex gap-1">
                            <Icon
                              icon="ph:lego-bold"
                              className="w-[50px] h-[50px] mr-5"
                              color="#FED700"
                            />
                            <p>
                              Solcitud de caja {numbox} con folio: {folio}
                            </p>
                          </ModalHeader>
                          <p className="text-center">
                            Los alumnos responsables del equipo Lego Spike son:{' '}
                          </p>
                          <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={columns}>
                              {(column) => (
                                <TableColumn key={column.key}>{column.label}</TableColumn>
                              )}
                            </TableHeader>
                            <TableBody items={rows}>
                              {(item) => (
                                <TableRow key={item.key}>
                                  {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                          <p className="text-center">
                            Ingresa el PIN para poder finalizar el prestamo:
                          </p>
                          <input
                            type="password"
                            id="numaccount"
                            className="w-[170px] rounded-[8px] h-[40px] font-bold p-2 text-center drop-shadow-lg"
                            value={pin}
                            onChange={(e) => {
                              if (e.target.value.length <= 4) {
                                setPin(e.target.value)
                              }
                            }}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                            className="font-semibold"
                          >
                            Cerrar
                          </Button>
                          <Button
                            color="success"
                            onPress={requestFinish}
                            className="text-white font-semibold"
                          >
                            Finalizar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="disable"
            className="w-full"
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="bi:box-seam-fill" />
                <span>Finalizadas</span>
              </div>
            }
          >
            <Card className="bg-[#00000000]">
              <CardBody className="space-y-3">
                {completeR.map((request, index) => (
                  <Button
                    key={request.idPetition}
                    onPress={() =>
                      descPetition([request.idPetition, request.folio, request.numbox])
                    }
                    className="w-full h-[90px] bg-white"
                    variant="solid"
                    color="default"
                  >
                    <div className="flex justify-between items-center w-full ">
                      <div className="flex items-center font-semibold">
                        <Icon
                          icon="ph:lego-bold"
                          className="w-[50px] h-[50px] mr-5"
                          color="#FED700"
                        />
                        <div className="w-[100px] h-[60px] rounded-lg text-white bg-[#FED700] space-y-1">
                          <p className="text-black">Caja</p>
                          <p className="font-bold text-[30px]">{request.numbox}</p>
                        </div>
                      </div>
                      <div className="flex flex-col font-semibold w-[390px] h-[60px] rounded-lg bg-[#FED700] items-center justify-center">
                        <p>Nombre del documento</p>
                        <p className="text-white text-[20px]">{request.namedoc}</p>
                      </div>
                      <div className="flex flex-col font-semibold w-[130px] h-[60px] rounded-lg bg-[#FED700] items-center justify-center">
                        <p>Folio</p>
                        <p className="text-white text-[20px]">{request.folio}</p>
                      </div>
                      <div className="flex items-center justify-center space-x-2 bg-[#FED700] rounded-lg w-[250px] h-[60px]">
                        <Icon
                          icon="fluent-mdl2:date-time"
                          className="w-[40px] h-[40px]"
                          color="white"
                        />
                        <div className="flex flex-col font-semibold space-y-1 text-start">
                          <p className="bg-[#02ae4d] rounded-md w-full h-[20px] text-white">
                            Inicio de prestamo: {request.fechreg}
                          </p>
                          <p className="bg-[#dd1a21] rounded-md w-full h-[20px] text-white">
                            Limite de prestamo: {request.fechfinish}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Button>
                ))}
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalBody>
                          <ModalHeader className="flex gap-1">
                            <Icon
                              icon="ph:lego-bold"
                              className="w-[50px] h-[50px] mr-5"
                              color="#FED700"
                            />
                            <p>
                              Solcitud de caja {numbox} con folio: {folio}
                            </p>
                          </ModalHeader>
                          <p className="text-center">
                            Los alumnos responsables del equipo Lego Spike son:{' '}
                          </p>
                          <Table aria-label="Example table with dynamic content">
                            <TableHeader columns={columns}>
                              {(column) => (
                                <TableColumn key={column.key}>{column.label}</TableColumn>
                              )}
                            </TableHeader>
                            <TableBody items={rows}>
                              {(item) => (
                                <TableRow key={item.key}>
                                  {(columnKey) => <TableCell>{item[columnKey]}</TableCell>}
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                            className="font-semibold"
                          >
                            Cerrar
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}

export default Soli
