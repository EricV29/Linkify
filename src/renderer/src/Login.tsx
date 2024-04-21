import prep6l from './images/prep6l.png'
import linkilogo from './images/linkilogo.png'
import fondolo from './images/fondolo.png'
import { Button, Input } from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { MailIcon } from './icons/Maillcon'
import { Password } from './icons/Password'
import { useState } from 'react'
import { Formik } from 'formik'
const { ipcRenderer } = require('electron')

interface FormValues {
  user: string
  password: string
}

interface Errors {
  user?: string
  password?: string
}

function App(): JSX.Element {
  const [datl] = useState<FormValues[]>([])
  const [isLoading] = useState(false)

  const [touchedFields, setTouchedFields] = useState({
    user: false,
    password: false
  })

  const mutate = async (data: FormValues) => {
    //console.log(data)
    ipcRenderer.send('login', data)
    /*ipcRenderer.once('login-reply', (event, success, name) => {
      if (success) {
        console.log(name)
      } else {
        console.log('Tu usuario o contraseña son incorrectos')
      }
    })*/
    //ipcRenderer.send('ff', 'hola')
  }

  return (
    <>
      <div className="w-screen h-screen flex m-0 p-0 justify-center items-center space">
        <div className=" h-full w-3/6 flex justify-between items-start flex-col">
          <img src={fondolo} alt="" className="w-full h-full object-cover" />
          <div className="absolute w-1/2 h-full flex justify-center items-center">
            <p className="text-white text-center text-[15px] w-[400px] top-[160px] absolute animate-fade animate-once animate-duration-1000 animate-ease-in">
              “Construye tu camino hacia el conocimiento con bloques de creatividad, desafíos
              electrónicos y exploración ¡El Futuro está en tus manos!”
            </p>
          </div>
        </div>
        <div className="bg-[#ffffff] h-full w-3/6 flex flex-col justify-center items-center animate-fade-down animate-once animate-duration-[800ms] animate-ease-in">
          <img src={linkilogo} alt="LinkiLogotipo" className="w-[300px] mb-3 " />
          <Formik
            initialValues={{
              user: '',
              password: ''
            }}
            validate={(values: FormValues) => {
              const errors: Errors = {}

              //User validation
              if (!values.user) {
                errors.user = 'Requerido'
              } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(values.user)) {
                errors.user = 'Usuario inválido'
              }

              const validatePassword = (password: string) => {
                const hasUpperCase = /[A-Z]/.test(password)
                const hasLowerCase = /[a-z]/.test(password)
                const hasNumber = /\d/.test(password)
                const hasEightCharacters = password.length >= 6
                return hasUpperCase && hasLowerCase && hasNumber && hasEightCharacters
              }

              //Password validation
              if (!values.password) {
                errors.password = 'Requerido'
              } else if (!validatePassword(values.password)) {
                errors.password =
                  'La contraseña debe tener minimo 6 caracteres, al menos una mayúscula, minúscula y número.'
              }

              return errors
            }}
            onSubmit={(values) => {
              mutate(values)
            }}
          >
            {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
              <form
                className="flex flex-col justify-center items-center w-[350px] space-y-10 p-1 font-bold"
                onSubmit={handleSubmit}
              >
                <Input
                  isRequired
                  type="user"
                  name="user"
                  placeholder="Nombre de usuario"
                  label="Usuario"
                  labelPlacement="outside"
                  className="w-[340px] text-[#B2B2B2]"
                  startContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={values.user}
                  onChange={handleChange}
                  onBlur={() => setTouchedFields({ ...touchedFields, user: true })}
                  errorMessage={touchedFields.user || isSubmitting ? errors.user : ''}
                  validationState={
                    (touchedFields.user || isSubmitting) && errors.user ? 'invalid' : 'valid'
                  }
                  variant="flat"
                />

                <Input
                  isRequired
                  color="default"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  label="Contraseña"
                  labelPlacement="outside"
                  className="w-[340px] text-[#B2B2B2]"
                  startContent={
                    <Password className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  value={values.password}
                  onChange={handleChange}
                  onBlur={() =>
                    setTouchedFields({
                      ...touchedFields,
                      password: true
                    })
                  }
                  errorMessage={touchedFields.password || isSubmitting ? errors.password : ''}
                  validationState={
                    (touchedFields.password || isSubmitting) && errors.password
                      ? 'invalid'
                      : 'valid'
                  }
                  variant="flat"
                />

                <Button
                  className="w-[250px] flex justify-center items-center bg-[#00a539] text-[#fff]"
                  type="submit"
                >
                  {isLoading === true ? (
                    <Icon width={25} icon="mdi:loading" className="animate-spin" />
                  ) : (
                    <>
                      <span className="text-lg font-semibold">ACCEDER</span>
                      <Icon icon="line-md:login" className="pt-1" width={25} />
                    </>
                  )}
                </Button>

                {typeof datl === 'string' && <p className="text-red-500 text-sm">{datl}</p>}
              </form>
            )}
          </Formik>
          <img src={prep6l} alt="Prepa6Logotipo" className="w-[150px] bottom-10 absolute" />
        </div>
      </div>
    </>
  )
}

export default App
