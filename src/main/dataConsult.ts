import { getConnection } from './database'

//!LEGOSPIKE QUERY

export async function viableBoxesLego(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT numbox FROM petition WHERE fechreg LIKE ? AND state = 1 and tool = 'lego'`
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

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 1 and tool = 'lego'`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function completedRequests() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0 and tool = 'lego'`

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

//!GENERAL QUERY

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

//!RASPBERRY QUERY

export async function viableBoxesRasp(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT numbox FROM petition WHERE fechreg LIKE ? AND state = 1 and tool = 'raspberry'`
  let formattedArg = '%' + arg + '%'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [formattedArg], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function activeRequestsRasp() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 1 and tool = 'raspberry'`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function completedRequestsRasp() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0 and tool = 'raspberry'`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function alumnsforRequestRasp(arg) {
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

//!ARDUINO QUERY

export async function viableBoxesArd(arg) {
  const connection = await getConnection()

  let petitionQuery = `SELECT numbox FROM petition WHERE fechreg LIKE ? AND state = 1 and tool = 'arduino'`
  let formattedArg = '%' + arg + '%'

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [formattedArg], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function activeRequestsArd() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 1 and tool = 'arduino'`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function completedRequestsArd() {
  const connection = await getConnection()

  let petitionQuery = `SELECT idPetition, numbox, namedoc, folio, fechreg, fechfinish, state FROM petition where state = 0 and tool = 'arduino'`

  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}

export async function alumnsforRequestArd(arg) {
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
