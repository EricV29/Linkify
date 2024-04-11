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
