import mysql from 'mysql2/promise'

let connection: mysql.Connection | null = null

declare global {
  interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_USER: string
    readonly VITE_PASSWORDDB: string
    readonly VITE_DB: string
  }
}

export const getConnection = async () => {
  if (!connection) {
    try {
      connection = await mysql.createConnection({
        host: import.meta.env.VITE_HOST,
        port: 3306,
        user: import.meta.env.VITE_USER,
        password: import.meta.env.VITE_PASSWORDDB,
        database: import.meta.env.VITE_DB
      })
      console.log('Conexión a la base de datos establecida')
    } catch (err) {
      console.error('Error conectando a la base de datos:', err)
      throw err
    }
  }
  return connection
}
