import { getConnection } from './database'

export async function insertData(arg: any) {
  const numbox = arg[0]
  const students = arg[1]
  const namepath = arg[2]
  const fechreg = arg[3]
  const folio = arg[4]
  const fechfinish = arg[5]
  const tool = arg[6]
  const locker = arg[7]
  const namedoc = namepath.split('\\').pop()

  const connection = await getConnection()

  try {
    // Insertar registro en petition
    const petitionQuery = `
      INSERT INTO petition
      (numbox, numlocker, namedoc, namepath, folio, fechreg, fechfinish, state, tool)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    `
    const [petitionResult]: any = await connection.query(petitionQuery, [
      numbox,
      locker,
      namedoc,
      namepath,
      folio,
      fechreg,
      fechfinish,
      tool
    ])

    const idPetition = petitionResult.insertId

    // Insertar estudiantes y sus emails
    for (const student of students) {
      const petitionUsersQuery = `
        INSERT INTO petition_users (idPetition, numaccount, nameAlumn)
        VALUES (?, ?, ?)
      `
      await connection.query(petitionUsersQuery, [
        idPetition,
        student.numaccount,
        student.namestudent
      ])

      const userEmailQuery = `
        INSERT INTO user_email (numaccount, email)
        VALUES (?, ?)
      `
      await connection.query(userEmailQuery, [student.numaccount, student.email])
    }
  } catch (error: any) {
    console.error('Error en insertData:', error)
    throw new Error('Error al insertar datos: ' + error.message)
  }
}
