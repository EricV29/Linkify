import { getConnection } from './database'

//VIABLE BOXES
export async function viableBoxes(arg: any) {
  try {
    const connection = await getConnection()

    const petitionQuery = `SELECT numbox FROM petition WHERE state = 1 AND tool = ?`

    // Ejecutamos la query usando await
    const [results] = await connection.query(petitionQuery, [arg[1]])

    return results // devuelve directamente los resultados
  } catch (error) {
    console.error('Error en viableBoxes:', error)
    throw error // propaga el error para que quien llame lo pueda manejar
  }
}

//VIABLE LOCKERS
export async function viableLockers(arg: any) {
  try {
    const connection = await getConnection()

    const petitionQuery = `
      SELECT numlocker 
      FROM petition 
      WHERE fechreg LIKE ? 
        AND state = 1 
        AND tool = ? 
      GROUP BY numlocker 
      HAVING COUNT(numlocker) > 1
    `

    const formattedArg = `%${arg[0]}%`

    // Ejecutamos la query usando await
    const [results] = await connection.query(petitionQuery, [formattedArg, arg[1]])

    return results
  } catch (error) {
    console.error('Error en viableLockers:', error)
    throw error // propaga el error
  }
}

//ACTIVE REQUESTS
export async function activeRequests(arg: any) {
  try {
    const connection = await getConnection()

    const petitionQuery = `SELECT idPetition, numbox, namedoc, folio, numlocker, fechreg, fechfinish, state FROM petition where state = 1 and tool = ?`

    const [results] = await connection.query(petitionQuery, arg)

    return results
  } catch (error) {
    console.error('Error en activeRequests:', error)
    throw error
  }
}

//COMPLETE REQUESTS
export async function completedRequests(arg: any) {
  try {
    const connection = await getConnection()

    const petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0 and tool = ?`

    const [results] = await connection.query(petitionQuery, arg)

    return results
  } catch (error) {
    console.error('Error en completedRequests:', error)
    throw error
  }
}

//ALUMNS FOR REQUEST
export async function alumnsforRequest(arg: any) {
  try {
    const connection = await getConnection()

    let petitionQuery =
      'SELECT numaccount, nameAlumn FROM petition_users as ptu inner join petition as pet on ptu.idPetition = pet.idPetition where ptu.idPetition = ?'

    const [results] = await connection.query(petitionQuery, arg)

    return results
  } catch (error) {
    console.error('Error en alumnsforRequest:', error)
    throw error
  }
}

//FINISH REQUEST
export async function finishidRequest(arg: any) {
  try {
    const connection = await getConnection()

    const petitionQuery = 'UPDATE petition SET state = 0 WHERE idPetition = ?'

    const [results] = await connection.query(petitionQuery, [arg[1]])

    return results
  } catch (error) {
    console.error('Error en alumnsforRequest:', error)
    throw error
  }
}

//ALL DATA FOR LIBRARY
export async function allData() {
  const connection = await getConnection()

  const petitionQuery = `
    SELECT 
      COUNT(CASE WHEN statusbook IN ('disponible', 'prestamo') THEN 1 END) AS Existentes,
      SUM(CASE WHEN existencia THEN existencia ELSE 0 END) AS Disponibles,
      COUNT(CASE WHEN statusbook = 'prestamo' THEN existencia END) AS Prestamos,
      COUNT(CASE WHEN statusbook = 'inexistente' THEN existencia END) AS Inexistentes
    FROM book
  `

  try {
    const [results]: any = await connection.query(petitionQuery)

    // Transforma los resultados en formato JSON
    return {
      Existentes: results[0].Existentes,
      Disponibles: results[0].Disponibles,
      Prestamos: results[0].Prestamos,
      Inexistentes: results[0].Inexistentes
    }
  } catch (error) {
    throw error
  }
}

//ALL BOOKS
export async function allBooks(limit: number, offset: number) {
  try {
    const connection = await getConnection()

    const petitionQuery = `
      SELECT folio, title, autor, existencia, statusbook
      FROM book
      LIMIT ? OFFSET ?
    `

    // Ejecutamos la query usando await
    const [results] = await connection.query(petitionQuery, [limit, offset])

    return results // devuelve directamente las filas
  } catch (error) {
    console.error('Error en allBooks:', error)
    throw error // propaga el error
  }
}

// SEARCH BOOKS
export async function searchBooks(query: string, category: string | null, limit = 10, offset = 0) {
  try {
    const connection = await getConnection()

    let petitionQuery = `SELECT folio, title, autor, existencia, statusbook FROM book`
    const params: any[] = []

    if (category) {
      switch (category) {
        case 'folio':
          petitionQuery += ` WHERE folio LIKE ?`
          params.push(`%${query}%`)
          break
        case 'title':
          petitionQuery += ` WHERE title LIKE ?`
          params.push(`%${query}%`)
          break
        case 'autor':
          petitionQuery += ` WHERE autor LIKE ?`
          params.push(`%${query}%`)
          break
        case 'stock':
          petitionQuery += ` WHERE existencia LIKE ?`
          params.push(`%${query}%`)
          break
        case 'state':
          petitionQuery += ` WHERE statusbook LIKE ?`
          params.push(`%${query}%`)
          break
        default:
          petitionQuery += ` WHERE (folio LIKE ? OR title LIKE ? OR autor LIKE ? OR existencia LIKE ? OR statusbook LIKE ?)`
          params.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
      }
    } else {
      petitionQuery += ` WHERE (folio LIKE ? OR title LIKE ? OR autor LIKE ? OR existencia LIKE ? OR statusbook LIKE ?)`
      params.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`)
    }

    petitionQuery += ` LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const [results] = await connection.query(petitionQuery, params)
    return results
  } catch (error) {
    console.error('Error en searchBooks:', error)
    throw error
  }
}

//SELECT BOOK
export async function selectBook(folio: string) {
  try {
    const connection = await getConnection()

    const petitionQuery = `
      SELECT folio, title, autor, existencia, statusbook
      FROM book
      WHERE folio = ?
    `

    // Ejecutamos la query usando await y pasando folio como parámetro seguro
    const [results] = await connection.query(petitionQuery, [folio])

    return results // devuelve directamente las filas
  } catch (error) {
    console.error('Error en selectBook:', error)
    throw error // propaga el error
  }
}

//EDIT BOOK
export async function editBook(data: [string, string, string, number]) {
  const connection = await getConnection()
  const status = data[3] === 0 ? 'inexistente' : 'disponible'

  const petitionQuery = `
    UPDATE book
    SET title = ?, autor = ?, existencia = ?, statusbook = ?
    WHERE folio = ?
  `

  try {
    const [results]: any = await connection.query(petitionQuery, [
      data[1],
      data[2],
      data[3],
      status,
      data[0]
    ])

    if (results.affectedRows > 0) {
      return ['Libro actualizado con éxito', true]
    } else {
      return ['No se encontró ningún libro con el folio proporcionado', null]
    }
  } catch (error: any) {
    console.error('Error en editBook:', error)
    throw new Error('Error al actualizar el libro: ' + error.message)
  }
}

//DELETE BOOK
export async function deleteBook(folio: string) {
  try {
    const connection = await getConnection()

    const petitionQuery = `DELETE FROM book WHERE folio = ?`

    // Ejecutamos la query usando await y parámetro seguro
    const [results]: any = await connection.query(petitionQuery, [folio])

    if (results.affectedRows > 0) {
      return ['Libro eliminado con éxito', true]
    } else {
      return ['No se encontró ningún libro con el folio proporcionado', null]
    }
  } catch (error: any) {
    console.error('Error en deleteBook:', error)
    throw new Error('Error al eliminar el libro: ' + error.message)
  }
}

//CHECK STOCK BOOK
export async function checkStockBook(folio: string) {
  try {
    const connection = await getConnection()

    const petitionQuery = `SELECT folio FROM book WHERE folio = ?`

    // Ejecutamos la query usando await y parámetro seguro
    const [results]: any = await connection.query(petitionQuery, [folio])

    if (results.length > 0) {
      return ['El libro ya existe', true]
    } else {
      return ['Libro no existe', false]
    }
  } catch (error: any) {
    console.error('Error en checkStockBook:', error)
    throw new Error('Error al verificar el stock del libro: ' + error.message)
  }
}

//NEW BOOK
export async function addNewBook(data: [string, string, string, number]) {
  try {
    const connection = await getConnection()

    const petitionQuery = `
      INSERT INTO book (folio, title, autor, existencia, statusbook)
      VALUES (?, ?, ?, ?, 'disponible');
    `

    const [results]: any = await connection.query(petitionQuery, [
      data[0],
      data[1],
      data[2],
      data[3]
    ])

    if (results.affectedRows > 0) {
      return ['Libro agregado con éxito', true]
    } else {
      return ['No se pudo agregar el libro', false]
    }
  } catch (error: any) {
    console.error('Error en addNewBook:', error)
    throw new Error('Error al agregar un nuevo libro: ' + error.message)
  }
}

// NEW LOAN
export async function newLoan(data: any) {
  const connection = await getConnection()

  try {
    await connection.beginTransaction()

    // Verificar si el usuario ya existe
    const [resultex]: any = await connection.query(
      `SELECT * FROM user_client WHERE numaccount = ?`,
      [data.numaccount]
    )

    if (resultex.length === 0) {
      const [insertResult]: any = await connection.query(
        `INSERT INTO user_client 
          (numaccount, nameuserc, secondnamec, apepuserc, apemuserc, degreec, emailuserc, fechreguserc) 
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

      if (insertResult.affectedRows !== 1) {
        throw new Error('No se pudo agregar el usuario')
      }
    }

    // Registrar el préstamo
    const [loanResult]: any = await connection.query(
      `INSERT INTO loan (numaccount, fechloan, fechdevloan, statusloan, idUser) 
       VALUES (?, ?, ?, ?, ?)`,
      [data.numaccount, data.fechaloan, data.fechdev, 'activo', data.idUser]
    )

    const loanId = loanResult.insertId

    // Asociar libros al préstamo
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
  } catch (error: any) {
    await connection.rollback()
    console.error('Error en newLoan:', error)
    throw new Error('Error al registrar el préstamo: ' + error.message)
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

  const petitionQuery = `
    SELECT 
      ub.iduserc_book,
      l.idLoan,
      uc.numaccount,
      CONCAT(uc.nameuserc, ' ', uc.secondnamec, ' ', uc.apepuserc, ' ', uc.apemuserc) AS completename,
      b.title,
      b.autor,
      b.folio,
      l.fechloan,
      l.fechdevloan,
      l.statusloan
    FROM user_client uc
    JOIN loan l ON uc.numaccount = l.numaccount
    JOIN userc_book ub ON l.idLoan = ub.idLoan
    JOIN book b ON ub.folio = b.folio;
  `

  try {
    const [results] = await connection.query(petitionQuery)
    return results
  } catch (error) {
    throw error
  }
}

//FINISH LOAN
export async function finishLoan(arg: number) {
  const connection = await getConnection()

  const updateQuery = 'UPDATE loan SET statusloan = "finalizado" WHERE idLoan = ?'

  try {
    const [results]: any = await connection.query(updateQuery, [arg[1]])

    let updateResult: [string, boolean | null]

    if (results.affectedRows > 0) {
      updateResult = ['Préstamo finalizado con éxito', true]
    } else {
      updateResult = ['No se encontró ningún préstamo con el ID proporcionado', null]
    }

    // Después de finalizar el préstamo, actualizar los libros
    await addBooksFinishLoan(arg)

    return updateResult
  } catch (error: any) {
    console.error('Error en finishLoan:', error)
    throw new Error('Error al finalizar préstamo: ' + error.message)
  }
}

//ADD BOOKS FINISH LOAN
export async function addBooksFinishLoan(arg: number) {
  const connection = await getConnection()

  const selectQuery = `SELECT folio FROM userc_book WHERE idLoan = ?`

  try {
    const [results]: any = await connection.query(selectQuery, [arg[1]])

    // Contar cuántas veces aparece cada folio
    const folioCounts: Record<string, number> = results.reduce(
      (acc: Record<string, number>, row: any) => {
        const folio = row.folio
        acc[folio] = acc[folio] ? acc[folio] + 1 : 1
        return acc
      },
      {}
    )

    // Actualizar existencia en `book`
    const updatePromises = Object.entries(folioCounts).map(([folio, increaseAmount]) => {
      const updateQuery = `UPDATE book SET existencia = existencia + ? WHERE folio = ?`
      return connection.query(updateQuery, [increaseAmount, folio])
    })

    // Actualizar estado a "disponible"
    const folios = Object.keys(folioCounts)
    if (folios.length > 0) {
      const updateStatusQuery = `UPDATE book SET statusbook = 'disponible' WHERE folio IN (?)`
      updatePromises.push(connection.query(updateStatusQuery, [folios]))
    }

    // Ejecutar todas las actualizaciones en paralelo
    await Promise.all(updatePromises)
  } catch (error: any) {
    console.error('Error en addBooksFinishLoan:', error)
    throw new Error('Error al actualizar libros en finishLoan: ' + error.message)
  }
}

//VIABLE EQUIPS
export async function viableEquip(arg: number) {
  const connection = await getConnection()

  const petitionQuery = `
    SELECT numequip 
    FROM loanequipment AS lo
    INNER JOIN equipment AS eq ON lo.idEquip = eq.idEquip
    WHERE statusloanequip = 'activo' 
      AND idCategory = ?;
  `

  try {
    const [results]: any = await connection.query(petitionQuery, [arg[1]])
    return results
  } catch (error: any) {
    console.error('Error en viableEquip:', error)
    throw new Error('Error al consultar equipos viables: ' + error.message)
  }
}

//ALL LOANS EQUIP
export async function loansEquip(arg: number) {
  const connection = await getConnection()

  const petitionQuery = `
    SELECT 
      lo.idLoanequip,
      CONCAT(p.nameprof, ' ', p.apepuserprof) AS nameprof, 
      p.numempprof, 
      e.numequip,
      lo.fechloanequip, 
      lo.fechdevloanequip, 
      lo.statusloanequip 
    FROM loanequipment AS lo
    JOIN professor AS p ON lo.numempprof = p.numempprof
    JOIN equipment AS e ON lo.idEquip = e.idEquip
    WHERE e.idCategory = ?;
  `

  try {
    const [results]: any = await connection.query(petitionQuery, arg)
    return results
  } catch (error: any) {
    console.error('Error en loansEquip:', error)
    throw new Error('Error al consultar préstamos de equipo: ' + error.message)
  }
}

// COMPARE NUMBER AND PASSWORD WITH EXISTENCE CHECK
export async function verifyEmployee(arg: any[]) {
  const connection = await getConnection()

  const checkExistenceQuery = `SELECT * FROM professor WHERE numempprof = ?;`
  const verifyCredentialsQuery = `SELECT * FROM professor WHERE numempprof = ? AND nipprof = ?;`
  const getidEquipQuery = `SELECT idEquip FROM equipment WHERE numequip = ?;`
  const newLoanEquipmentQuery = `
    INSERT INTO loanequipment (numempprof, idEquip, fechloanequip, fechdevloanequip, statusloanequip, idUser) 
    VALUES (?, ?, ?, NULL, 'activo', ?);
  `
  const changeStatusEquipQuery = `UPDATE equipment SET statusequip = 'préstamo' WHERE idEquip = ?;`

  try {
    // Verificar si el empleado existe
    const [existenceResults]: any = await connection.query(checkExistenceQuery, [arg[0]])
    if (existenceResults.length === 0) {
      return false // Empleado no encontrado
    }

    // Verificar credenciales
    const [credentialsResults]: any = await connection.query(verifyCredentialsQuery, [
      arg[0],
      arg[1]
    ])
    if (credentialsResults.length === 0) {
      return false // Credenciales incorrectas
    }

    // Obtener ID del equipo
    const [equipResults]: any = await connection.query(getidEquipQuery, [arg[2]])
    if (equipResults.length === 0) {
      return false // Equipo no encontrado
    }
    const idEquip = equipResults[0].idEquip

    // Insertar nuevo préstamo de equipo
    await connection.query(newLoanEquipmentQuery, [arg[0], idEquip, arg[3], arg[4]])

    // Cambiar estado del equipo a 'préstamo'
    const [changeStatusResults]: any = await connection.query(changeStatusEquipQuery, [idEquip])

    return changeStatusResults.affectedRows > 0
  } catch (error) {
    console.error('Error en verifyEmployee:', error)
    throw error
  }
}

// FINISH LOAN EQUIPMENT
export async function finishLoanEquip(arg: any[]) {
  const connection = await getConnection()

  const verifyCredentialsQuery = `
    SELECT * FROM professor WHERE numempprof = ? AND nipprof = ?;
  `
  const updateLoanEquipment = `
    UPDATE loanequipment 
    SET statusloanequip = 'finalizado', fechdevloanequip = ? 
    WHERE idLoanequip = ?;
  `
  const updateEquipStatus = `
    UPDATE equipment SET statusequip = 'activo' WHERE numequip = ?;
  `

  try {
    // Verificar credenciales
    const [credentialsResults]: any = await connection.query(verifyCredentialsQuery, [
      arg[2],
      arg[3]
    ])
    if (credentialsResults.length === 0) {
      return false // Credenciales inválidas
    }

    // Actualizar estado y fecha de devolución del préstamo
    const [upLEResults]: any = await connection.query(updateLoanEquipment, [arg[0], arg[1]])
    if (upLEResults.affectedRows === 0) {
      return false // No se actualizó el préstamo
    }

    // Actualizar estado del equipo
    const [upESResults]: any = await connection.query(updateEquipStatus, [arg[4]])
    if (upESResults.affectedRows === 0) {
      return false // No se actualizó el equipo
    }

    return true
  } catch (error) {
    console.error('Error en finishLoanEquip:', error)
    throw error
  }
}
