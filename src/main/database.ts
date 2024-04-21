require('dotenv').config()
import * as mysql from 'promise-mysql'

let connection

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORDDB,
      database: process.env.DB
    })
  }
  return connection
}
