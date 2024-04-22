import Module from './components/Module'
import arduinobg from './images/arudinof.webp'
import arduinolo from './images/arduinolo.webp'
import legolo from './images/legolo.webp'
import legobg from './images/legobg.webp'
import raspbg from './images/raspbg.webp'
import rasplo from './images/rasplo.webp'
const { ipcRenderer } = require('electron')

function Herramientas(): JSX.Element {
  function windowSpike() {
    console.log('Ventana Lego')
    ipcRenderer.send('windowSpike', 'Lego')
  }

  function windowRasp() {
    console.log('Ventana Raspberry Pi')
    ipcRenderer.send('windowRasp', 'RaspBerry')
  }

  function windowArd() {
    console.log('Ventana Arduino')
    ipcRenderer.send('windowArd', 'Arduino')
  }

  return (
    <>
      <div className="w-full h-full p-5 flex flex-wrap gap-4 justify-start overflow-y-auto animate-fade animate-once animate-ease-in">
        <button onClick={windowSpike} className="p-0 m-0 w-[35vw] h-[35vh]">
          <Module imgbg={legobg} imglog={legolo} />
        </button>
        <button onClick={windowRasp} className="p-0 m-0 w-[35vw] h-[35vh]">
          <Module imgbg={raspbg} imglog={rasplo} />
        </button>
        <button onClick={windowArd} className="p-0 m-0 w-[35vw] h-[35vh]">
          <Module imgbg={arduinobg} imglog={arduinolo} />
        </button>
      </div>
    </>
  )
}

export default Herramientas
