import * as mysql from 'promise-mysql'

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
      host: import.meta.env.VITE_HOST,
      port: 3306,
      user: import.meta.env.VITE_USER,
      password: import.meta.env.VITE_PASSWORDDB,
      database: import.meta.env.VITE_DB
    })
  }
  return connection
}
