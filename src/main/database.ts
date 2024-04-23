import * as mysql from 'promise-mysql'

let connection

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'jared100',
      database: 'linkifydb'
    })
  }
  return connection
}
