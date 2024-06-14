require('dotenv').config()

const config = {
  vithost: process.env.VITE_HOST,
  vituser: process.env.VITE_USER,
  vitpassworddb: process.env.VITE_PASSWORDDB,
  vitdb: process.env.VITE_DB,
  vitportemail: process.env.VITE_PORTEMAIL,
  vituseremail: process.env.VITE_USEREMAIL,
  vittokenemail: process.env.VITE_TOKENEMAIL,
  vitaddressemail: process.env.VITE_ADDRESSEMAIL,
  vitaddressemaillibrary: process.env.VITE_ADDRESSEMAILLIBRARY
}

export default config
