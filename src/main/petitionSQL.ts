import { getConnection } from './database'

export async function insertData(arg) {
  let numbox = arg[0]
  let students = arg[1]
  let namepath = arg[2]
  let fechreg = arg[3]
  let namedoc = namepath.split('\\').pop()
  const connection = await getConnection()

  let petitionQuery =
    'INSERT INTO petition (numbox, namedoc, namepath, fechreg, state) VALUES (?, ?, ?, ?, 1)'
  connection.query(
    petitionQuery,
    [numbox, namedoc, namepath, fechreg],
    (error, results, fields) => {
      if (error) throw error
      let idPetition = results.insertId

      students.forEach((student) => {
        let petitionUsersQuery =
          'INSERT INTO petition_users (idPetition, numaccount, nameAlumn) VALUES (?, ?, ?)'
        connection.query(
          petitionUsersQuery,
          [idPetition, student.numaccount, student.namestudent],
          (error, results, fields) => {
            if (error) throw error
          }
        )
      })
    }
  )
}
