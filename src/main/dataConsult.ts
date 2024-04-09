import { getConnection } from './database'

export async function viableBoxes(arg) {
  const connection = await getConnection()

  let petitionQuery = 'SELECT numbox FROM petition where fechreg = ? or state = 1'
  return new Promise((resolve, reject) => {
    connection.query(petitionQuery, [arg], (error, results, fields) => {
      if (error) reject(error)
      resolve(results)
    })
  })
}
