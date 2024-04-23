import { getConnection } from './database'

export async function insertData(arg) {
  let numbox = arg[0]
  let students = arg[1]
  let namepath = arg[2]
  let fechreg = arg[3]
  let folio = arg[4]
  let fechfinish = arg[5]
  let tool = arg[6]
  let locker = arg[7]
  let namedoc = namepath.split('\\').pop()
  const connection = await getConnection()

  let petitionQuery =
    'INSERT INTO petition (numbox, numlocker, namedoc, namepath, folio, fechreg, fechfinish, state, tool) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)'
  connection.query(
    petitionQuery,
    [numbox, locker, namedoc, namepath, folio, fechreg, fechfinish, tool],
    (error, results) => {
      if (error) throw error
      let idPetition = results.insertId

      students.forEach((student) => {
        let petitionUsersQuery =
          'INSERT INTO petition_users (idPetition, numaccount, nameAlumn) VALUES (?, ?, ?)'
        connection.query(
          petitionUsersQuery,
          [idPetition, student.numaccount, student.namestudent],
          (error) => {
            if (error) throw error
            //console.log('Registro exitoso')
          }
        )

        let userEmailQuery = 'INSERT INTO user_email (numaccount, email) VALUES (?, ?)'
        connection.query(userEmailQuery, [student.numaccount, student.email], (error) => {
          if (error) throw error
        })
      })
    }
  )
}
