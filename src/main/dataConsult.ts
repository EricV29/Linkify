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

    const [results] = await connection.query(petitionQuery, [arg[1]])

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

    const [results] = await connection.query(petitionQuery, [arg[1]])

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

    const [results] = await connection.query(petitionQuery, [arg[1]])

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
