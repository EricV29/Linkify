import { getConnection } from './database'

//VIABLE BOXES
export async function viableBoxes(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT numbox FROM petition WHERE state = 1 and tool = ?`
  //let formattedArg = '%' + arg[0] + '%'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [/*formattedArg,*/ arg[1]], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//VIABLE LOCKERS
export async function viableLockers(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT numlocker FROM petition WHERE fechreg LIKE ? AND state = 1 and tool = ? GROUP BY numlocker HAVING COUNT(numlocker) > 1`
  let formattedArg = '%' + arg[0] + '%'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [formattedArg, arg[1]], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//ACTIVE REQUESTS
export async function activeRequests(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, numlocker, fechreg, fechfinish, state FROM petition where state = 1 and tool = ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, arg, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//COMPLETE REQUESTS
export async function completedRequests(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0 and tool = ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, arg, (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//ALUMNS FOR REQUEST
export async function alumnsforRequest(arg) {
  const connection = await getConnection()

  let petitionQuery =
    'SELECT numaccount, nameAlumn FROM petition_users as ptu inner join petition as pet on ptu.idPetition = pet.idPetition where ptu.idPetition = ?'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [arg], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//FINISH REQUEST
export async function finishidRequest(arg) {
  const connection = await getConnection()

  let petitionQuery = 'UPDATE petition SET state = 0 WHERE idPetition = ?'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [arg[1]], (error, results) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

//ALL DATA FOR LIBRARY
export async function allData() {
  const connection = await getConnection()

  let petitionQuery = `
  SELECT 
    COUNT(CASE WHEN statusbook IN ('disponible', 'prestamo') THEN 1 END) AS Existentes,
    SUM(CASE WHEN existencia THEN existencia ELSE 0 END) AS Disponibles,
    COUNT(CASE WHEN statusbook = 'prestamo' THEN existencia END) AS Prestamos,
    COUNT(CASE WHEN statusbook = 'inexistente' THEN existencia END) AS Inexistentes
  FROM book
`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results) => {
      if (error) {
        reject(error)
      } else {
        // Transforma los resultados en formato JSON
        const jsonData = {
          Existentes: results[0].Existentes,
          Disponibles: results[0].Disponibles,
          Prestamos: results[0].Prestamos,
          Inexistentes: results[0].Inexistentes
        }
        resolve(jsonData)
      }
    })
  })
}

//ALL BOOKS
export async function allBooks(limit, offset) {
  const connection = await getConnection()

  let petitionQuery = `SELECT folio, title, autor, existencia, statusbook FROM book LIMIT ? OFFSET ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [limit, offset], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

// SEARCH BOOKS
export async function searchBooks(query: string, category: string | null) {
  const connection = await getConnection()

  let petitionQuery = `SELECT folio, title, autor, existencia, statusbook FROM book`

  if (category) {
    switch (category) {
      case 'folio':
        petitionQuery += ` WHERE folio LIKE '%${query}%'`
        break
      case 'title':
        petitionQuery += ` WHERE title LIKE '%${query}%'`
        break
      case 'autor':
        petitionQuery += ` WHERE autor LIKE '%${query}%'`
        break
      case 'stock':
        petitionQuery += ` WHERE existencia LIKE '%${query}%'`
        break
      case 'state':
        petitionQuery += ` WHERE statusbook LIKE '%${query}%'`
        break
      default:
        petitionQuery += ` WHERE (folio LIKE '%${query}%' OR title LIKE '%${query}%' OR autor LIKE '%${query}%' OR existencia LIKE '%${query}%' OR statusbook LIKE '%${query}%')`
    }
  } else {
    petitionQuery += ` WHERE (folio LIKE '%${query}%' OR title LIKE '%${query}%' OR autor LIKE '%${query}%' OR existencia LIKE '%${query}%' OR statusbook LIKE '%${query}%')`
  }

  petitionQuery += ` LIMIT ? OFFSET ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [10, 0], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//SELECT BOOK
export async function selectBook(folio) {
  const connection = await getConnection()

  let petitionQuery = `SELECT folio, title, autor, existencia, statusbook FROM book WHERE folio = ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, folio, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//EDIT BOOK
export async function editBook(data) {
  const connection = await getConnection()
  let status = ''
  if (data[3] === '0') {
    status = 'inexistente'
  } else {
    status = 'disponible'
  }

  let petitionQuery = `UPDATE book SET title = ?, autor = ?, existencia = ?, statusbook = ? WHERE folio = ?`

  return new Promise((resolve, reject) => {
    connection.query(
      petitionQuery,
      [data[1], data[2], data[3], status, data[0]],
      (error, results) => {
        if (error) {
          reject('Error al actualizar el libro: ' + error.message)
        } else {
          if (results.affectedRows > 0) {
            resolve(['Libro actualizado con éxito', true])
          } else {
            resolve(['No se encontró ningún libro con el folio proporcionado', null])
          }
        }
      }
    )
  })
}

//DELETE BOOK
export async function deleteBook(folio) {
  const connection = await getConnection()

  let petitionQuery = `DELETE FROM book WHERE folio = ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, folio, (error, results) => {
      if (error) {
        reject('Error al eliminar el libro: ' + error.message)
      } else {
        if (results.affectedRows > 0) {
          resolve(['Libro eliminado con éxito', true])
        } else {
          resolve(['No se encontró ningún libro con el folio proporcionado', null])
        }
      }
    })
  })
}

//CHECK STOCK BOOK
export async function checkStockBook(folio) {
  const connection = await getConnection()

  let petitionQuery = `SELECT folio FROM book WHERE folio = ?`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, folio, (error, results) => {
      if (error) {
        reject('Error al verificar el stock del libro: ' + error.message)
      } else {
        if (results.length > 0) {
          resolve(['El libro ya existe', true])
        } else {
          resolve(['Libro no existe', false])
        }
      }
    })
  })
}

//NEW BOOK
export async function addNewBook(data) {
  const connection = await getConnection()

  let petitionQuery = `INSERT INTO book (folio, title, autor, existencia, statusbook) VALUES (?, ?, ?, ?, 'disponible');`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [data[0], data[1], data[2], data[3]], (error, results) => {
      if (error) {
        reject('Error al agregar un nuevo libro: ' + error.message)
      } else {
        if (results.affectedRows > 0) {
          resolve(['Libro agregado con éxito', true])
        }
      }
    })
  })
}

// NEW LOAN
export async function newLoan(data) {
  const connection = await getConnection()

  try {
    await connection.beginTransaction()

    const resultex = await connection.query(`SELECT * FROM user_client WHERE numaccount = ?`, [
      data.numaccount
    ])

    if (resultex.length === 0) {
      const insertResult = await connection.query(
        `INSERT INTO user_client (numaccount, nameuserc, secondnamec, apepuserc, apemuserc, degreec, emailuserc, fechreguserc) 
          VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          data.numaccount,
          data.firstname,
          data.secondname,
          data.firstlastname,
          data.secondlastname,
          data.degree,
          data.email
        ]
      )

      if (insertResult.affectedRows === 1) {
        // console.log('El usuario se agregó correctamente')
      } else {
        // console.log('No se pudo agregar el usuario')
      }
    }

    const loanResult = await connection.query(
      `INSERT INTO loan (numaccount, fechloan, fechdevloan, statusloan, idUser) 
      VALUES (?, ?, ?, ?, ?)`,
      [data.numaccount, data.fechaloan, data.fechdev, 'activo', data.idUser]
    )
    const loanId = loanResult.insertId

    for (const book of data.books) {
      const bookFol = book.folio.toString()
      await connection.query(`INSERT INTO userc_book (idLoan, folio, numcopies) VALUES (?, ?, ?)`, [
        loanId,
        bookFol,
        1
      ])

      await connection.query(`UPDATE book SET existencia = existencia - 1 WHERE folio = ?`, [
        bookFol
      ])

      await changeLoan(bookFol, connection)
    }

    await connection.commit()

    return ['Préstamo registrado exitosamente', true]
  } catch (error) {
    await connection.rollback()
    throw new Error('Error al registrar el préstamo: ' + error)
  }
}

// CHANGE LOAN
export async function changeLoan(folio, connection) {
  const petitionQuery = `SELECT existencia FROM book WHERE folio = ?`

  const results = await connection.query(petitionQuery, [folio])

  if (results[0].existencia === 0) {
    const petitionQuery2 = `UPDATE book SET statusbook = 'préstamo' WHERE folio = ?`
    await connection.query(petitionQuery2, [folio])
  }
}

//ALL LOANS
export async function allLoans() {
  const connection = await getConnection()

  let petitionQuery = `SELECT ub.iduserc_book, l.idLoan, uc.numaccount, CONCAT(uc.nameuserc, ' ', uc.secondnamec, ' ', uc.apepuserc, ' ', uc.apemuserc) AS 'completename', b.title, b.autor, b.folio, l.fechloan, l.fechdevloan, l.statusloan  FROM  user_client uc JOIN loan l ON uc.numaccount = l.numaccount JOIN userc_book ub ON l.idLoan = ub.idLoan JOIN book b ON ub.folio = b.folio;`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })
}

//FINISH LOAN
export async function finishLoan(arg) {
  const connection = await getConnection()

  let updateQuery = 'UPDATE loan SET statusloan = "finalizado" WHERE idLoan = ?'

  try {
    const updateResult = await new Promise((resolve, reject) => {
      connection.query(updateQuery, arg, (error, results) => {
        if (error) {
          reject('Error al finalizar préstamo: ' + error.message)
        } else {
          if (results.affectedRows > 0) {
            resolve(['Préstamo finalizado con éxito', true])
          } else {
            resolve(['No se encontró ningún préstamo con el ID proporcionado', null])
          }
        }
      })
    })

    // Después de finalizar el préstamo, actualizar los libros
    await addBooksFinishLoan(arg)

    return updateResult
  } catch (error) {
    throw new Error('Error al finalizar préstamo: ' + error)
  }
}

//ADD BOOKS FINISH LOAN
export async function addBooksFinishLoan(arg: any) {
  const connection = await getConnection() // Obtener conexión desde tu función de conexión

  let selectQuery = `SELECT folio FROM userc_book WHERE idLoan = ?`

  return new Promise<void>((resolve, reject) => {
    connection.query(selectQuery, arg, async (error, results) => {
      if (error) {
        reject('Error al verificar el stock del libro: ' + error.message)
      } else {
        try {
          // Obtener un objeto que contenga la cantidad de repeticiones de cada folio
          let folioCounts: Record<string, number> = results.reduce(
            (acc: Record<string, number>, result: any) => {
              let folio = result.folio
              acc[folio] = acc[folio] ? acc[folio] + 1 : 1
              return acc
            },
            {}
          )

          // Array de promesas para las actualizaciones
          let updatePromises: Promise<any>[] = []

          // Actualizar la existencia en la tabla `book`
          Object.keys(folioCounts).forEach((folio) => {
            let updateQuery = `UPDATE book SET existencia = existencia + ? WHERE folio = ?`
            let increaseAmount = folioCounts[folio]
            let promise = new Promise((innerResolve, innerReject) => {
              connection.query(
                updateQuery,
                [increaseAmount, folio],
                (updateError, updateResults) => {
                  if (updateError) {
                    innerReject(
                      'Error al actualizar la existencia del libro: ' + updateError.message
                    )
                  } else {
                    innerResolve(updateResults)
                  }
                }
              )
            })
            updatePromises.push(promise)
          })

          // Actualizar el estado del libro a "disponible" en la tabla `statusbook`
          let updateStatusQuery = `UPDATE book SET statusbook = 'disponible' WHERE folio IN (?)`
          let folios = Object.keys(folioCounts)

          // Ejecutar la consulta de actualización de estado
          let statusPromise = new Promise((innerResolve, innerReject) => {
            connection.query(updateStatusQuery, [folios], (statusError, statusResults) => {
              if (statusError) {
                innerReject('Error al actualizar el estado del libro: ' + statusError.message)
              } else {
                innerResolve(statusResults)
              }
            })
          })

          updatePromises.push(statusPromise)

          // Ejecutar todas las actualizaciones en paralelo
          await Promise.all(updatePromises)
          resolve() // Resolver la promesa sin datos adicionales
        } catch (updateError) {
          reject(updateError) // Rechazar la promesa en caso de error
        }
      }
    })
  })
}
