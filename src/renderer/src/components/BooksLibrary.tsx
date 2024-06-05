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

  const [allbooks, setAllBooks] = useState<AllDataBooks[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const limit = 10
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)

  const loadMoreBooks = () => {
    ipcRenderer.send('allBooks', { limit, offset: page * limit })
    ipcRenderer.once('allBooks-reply', (_event, arg) => {
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
    })
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
    ipcRenderer.on('searchBooks-reply', (_event, results) => {
      setAllBooks(results)
    })
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

  return (
    <>
      <div className="space-y-3">
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
