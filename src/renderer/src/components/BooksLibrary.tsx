import React, { useState, useEffect } from 'react'
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
  SelectItem,
  Spinner
} from '@nextui-org/react'
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll'
import { DeleteIcon } from '../icons/DeleteIcon'
import { EditIcon } from '../icons/EditIcon'
import { Icon } from '@iconify/react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from '@nextui-org/react'
import noti from '../store/notification'
import msgquestion from '../store/messageqdos'
const { ipcRenderer } = require('electron')

const statusColorMap = {
  disponible: 'success',
  inexistente: 'danger',
  préstamo: 'warning'
}

interface AllDataBooks {
  id: number
  folio: string
  title: string
  autor: string
  existencia: number
  statusbook: string
}

function BooksLibrary(): JSX.Element {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]
    switch (columnKey) {
      case 'name':
        return <User name={cellValue} />
      case 'role':
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
          </div>
        )
      case 'statusbook':
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.statusbook]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Editar ejemplar">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => selectEditBook(user.folio)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar ejemplar">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => deleteBook(user.folio)}
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

  const [allbooks, setAllBooks] = useState<AllDataBooks[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const limit = 10
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [_folioBook, setfolioBook] = useState<string | undefined>(undefined)
  const [selectedBook, setSelectedBook] = useState<AllDataBooks | null>(null)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { setText, toggleVisiblenoti } = noti()
  const { toggleVisiblemsgq, setTextmsgq, setToolmsgq, toggleYesmsgq, toggleNomsgq } = msgquestion()

  const selectEditBook = (folio) => {
    setfolioBook(folio)
    ipcRenderer.send('selectBook', folio)
    const handleSelectBookReply = (_event, arg) => {
      setSelectedBook(arg.length > 0 ? arg[0] : null)
    }
    ipcRenderer.once('selectBook-reply', handleSelectBookReply)
    onOpen()

    return () => {
      ipcRenderer.removeListener('selectBook-reply', handleSelectBookReply)
    }
  }

  const deleteBook = async (folio) => {
    setfolioBook(folio)
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
      ipcRenderer.send('deleteBook', folio)
      const handleDeleteBookReply = (_event, arg) => {
        if (arg[1] === true) {
          setText('Libro eliminado correctamente.')
          toggleVisiblenoti()
          setTimeout(function () {
            location.reload()
          }, 2000)
        } else if (arg[1] === null) {
          setText('El folio del libro no fue encontrado.')
          toggleVisiblenoti()
        } else {
          setText('Error al eliminar el libro, intentalo de nuevo.')
          toggleVisiblenoti()
        }
      }
      ipcRenderer.once('deleteBook-reply', handleDeleteBookReply)
    } else {
      setText('Libro no eliminado.')
      toggleVisiblenoti()
    }
  }

  const editBook = () => {
    const existencia = selectedBook?.existencia ?? 0

    if (existencia < 0) {
      console.log('La existencia no puede ser menor a 0')
      return
    } else {
      ipcRenderer.send('editBook', [
        selectedBook?.folio,
        selectedBook?.title,
        selectedBook?.autor,
        existencia
      ])
      const handleEditBookReply = (_event, arg) => {
        if (arg[1] === true) {
          setText('Libro editado correctamente.')
          toggleVisiblenoti()
          onOpenChange()
          setTimeout(function () {
            location.reload()
          }, 2000)
        } else if (arg[1] === null) {
          setText('El folio del libro no fue encontrado.')
          toggleVisiblenoti()
        } else {
          setText('Error al editar el libro, intentalo de nuevo.')
          toggleVisiblenoti()
        }
      }
      ipcRenderer.once('editBook-reply', handleEditBookReply)
    }
  }

  const loadMoreBooks = () => {
    ipcRenderer.send('allBooks', { limit, offset: page * limit })
    const handleAllBooksReply = (_event, arg) => {
      if (arg.error) {
        console.error('Error fetching books:', arg.error)
        setHasMore(false)
      } else {
        if (arg.length < limit) {
          setHasMore(false)
        }
        setAllBooks((prevBooks) => [...prevBooks, ...arg])
        setPage((prevPage) => prevPage + 1)
      }
    }
    ipcRenderer.once('allBooks-reply', handleAllBooksReply)

    return () => {
      ipcRenderer.removeListener('allBooks-reply', handleAllBooksReply)
    }
  }

  useEffect(() => {
    if (page === 0 && allbooks.length === 0) {
      loadMoreBooks()
    }

    return () => {
      ipcRenderer.removeAllListeners('allBooks-reply')
    }
  }, [])

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: loadMoreBooks
  })

  const columns = [
    { name: 'FOLIO', uid: 'folio' },
    { name: 'TÍTULO', uid: 'title' },
    { name: 'AUTOR', uid: 'autor' },
    { name: 'EXISTENCIA', uid: 'existencia' },
    { name: 'ESTADO', uid: 'statusbook' },
    { name: 'ACCIONES', uid: 'actions' }
  ]

  const categori = [
    { key: 'folio', label: 'Folio' },
    { key: 'title', label: 'Título' },
    { key: 'autor', label: 'Autor' },
    { key: 'stock', label: 'Existencia' },
    { key: 'state', label: 'Estado' }
  ]

  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    ipcRenderer.send('searchBooks', query, selectedCategory)
  }

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category || undefined)
  }

  useEffect(() => {
    const handleSearchBooksReply = (_event, results) => {
      setAllBooks(results)
    }
    ipcRenderer.on('searchBooks-reply', handleSearchBooksReply)

    return () => {
      ipcRenderer.removeListener('searchBooks-reply', handleSearchBooksReply)
    }
  }, [])

  const filteredBooks = allbooks.filter((book) => {
    if (selectedCategory && searchQuery) {
      switch (selectedCategory) {
        case 'folio':
          return book.folio.includes(searchQuery)
        case 'title':
          return book.title.includes(searchQuery)
        case 'autor':
          return book.autor.includes(searchQuery)
        case 'stock':
          return book.existencia.toString().includes(searchQuery)
        case 'state':
          return book.statusbook.includes(searchQuery)
        default:
          return true
      }
    } else {
      return true
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSelectedBook((prevBook) => (prevBook ? { ...prevBook, [name]: value } : null))
  }

  return (
    <>
      <div className="space-y-3">
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
          <ModalContent>
            {(_onClose) => (
              <>
                <ModalHeader className="flex items-center gap-1 font-bold">
                  <Icon icon="mdi:book-edit" className="w-[30px] h-[30px]" color="00a539" /> Editar
                  Libro
                </ModalHeader>
                <ModalBody>
                  <p>Estos son los datos del libro seleccionado, puedes editarlos y guardar.</p>
                  <p className="text-[#00a539]">Folio</p>
                  <Input
                    isRequired
                    readOnly
                    type="text"
                    placeholder="Folio"
                    labelPlacement="outside"
                    className="w-[400px]"
                    variant="bordered"
                    name="folio"
                    value={selectedBook?.folio ?? ''}
                    onChange={handleInputChange}
                  />
                  <p className="text-[#00a539]">Título</p>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Título del libro"
                    labelPlacement="outside"
                    className="w-[400px]"
                    variant="bordered"
                    name="title"
                    value={selectedBook?.title ?? ''}
                    onChange={handleInputChange}
                  />
                  <p className="text-[#00a539]">Autor</p>
                  <Input
                    isRequired
                    type="text"
                    placeholder="Autor del libro"
                    labelPlacement="outside"
                    className="w-[400px]"
                    variant="bordered"
                    name="autor"
                    value={selectedBook?.autor ?? ''}
                    onChange={handleInputChange}
                  />
                  <p className="text-[#00a539]">Existencia</p>
                  <Input
                    isRequired
                    type="number"
                    placeholder="Número de ejemplares"
                    labelPlacement="outside"
                    className="w-[400px]"
                    variant="bordered"
                    name="existencia"
                    value={selectedBook?.existencia?.toString() ?? ''}
                    onChange={handleInputChange}
                    min={0}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="success" className="text-white font-bold" onPress={editBook}>
                    Editar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
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
            value={searchQuery}
            onChange={(event) => handleSearch(event.target.value)}
          />
          <Select
            label="Elige una categoría para buscar"
            placeholder="Categoría"
            className="max-w-xs"
            value={selectedCategory}
            onChange={(event) => handleCategoryChange(event.target.value)}
          >
            {categori.map((categori) => (
              <SelectItem key={categori.key}>{categori.label}</SelectItem>
            ))}
          </Select>
        </div>
        <Table
          isHeaderSticky
          aria-label="Libros de la biblioteca"
          baseRef={scrollerRef}
          bottomContent={
            hasMore ? (
              <div className="flex w-full justify-center">
                <Spinner ref={loaderRef} color="success" />
              </div>
            ) : null
          }
          classNames={{
            base: 'max-h-[310px] overflow-scroll',
            table: 'min-h-[400px]'
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredBooks}>
            {(item) => (
              <TableRow key={item.folio}>
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
