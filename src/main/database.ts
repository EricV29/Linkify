import * as mysql from 'promise-mysql'

let connection

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'jared100',
      database: 'linkifydb'
    })
  }
  return connection
}
