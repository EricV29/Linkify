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

  let petitionQuery = `SELECT COUNT(CASE WHEN statusbook = 'disponible' THEN existencia END) AS Disponibles, COUNT(CASE WHEN statusbook = 'prestamo' THEN existencia END) AS Prestamos, COUNT(CASE WHEN statusbook = 'inexistentes' THEN existencia END) AS Inexistentes FROM book;`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results) => {
      if (error) {
        reject(error)
      } else {
        // Transforma los resultados en formato JSON
        const jsonData = {
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
