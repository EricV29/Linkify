import * as mysql from 'promise-mysql'
import config from './config'

declare global {
  interface ImportMetaEnv {
    VITE_HOST: string
    VITE_USER: string
    VITE_PASSWORDDB: string
    VITE_DB: string
  }
}

let connection

export const getConnection = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: import.meta.env.VITE_HOST || config.vithost,
      port: 3306,
      user: import.meta.env.VITE_USER || config.vituser,
      password: import.meta.env.VITE_PASSWORDDB || config.vitpassworddb,
      database: import.meta.env.VITE_DB || config.vitdb
    })
  }
  return connection
}
