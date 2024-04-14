import { getConnection } from './database'

export async function viableBoxesLego(arg) {
  const connection = await getConnection()

  let petitionQuery = 'SELECT numbox FROM petition WHERE fechreg LIKE ? AND state = 1'
  let formattedArg = '%' + arg + '%'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [formattedArg], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function activeRequests() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 1`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function completedRequests() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function alumnsforRequest(arg) {
  const connection = await getConnection()

  let petitionQuery =
    'SELECT numaccount, nameAlumn FROM petition_users as ptu inner join petition as pet on ptu.idPetition = pet.idPetition where ptu.idPetition = ?'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [arg], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function finishidRequest(arg) {
  const connection = await getConnection()

  let petitionQuery = 'UPDATE petition SET state = 0 WHERE idPetition = ?'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [arg[1]], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}
