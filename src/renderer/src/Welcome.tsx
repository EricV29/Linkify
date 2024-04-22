import linki from './images/linki.png'

function Welcome(): JSX.Element {
  return (
    <>
      <div className="w-full h-full p-5 flex flex-col flex-wrap gap-4 justify-start items-center overflow-y-auto animate-fade-down animate-once animate-duration-1000 animate-ease-out">
        <img
          src={linki}
          alt="LinkiLogotipo"
          className="w-[300px] animate-shake animate-infinite animate-duration-[4000ms] animate-ease-in"
        />
        <p className="text-[#00a539] text-[50px] font-semibold">Bienvenido a Linkify 1.0</p>
        <p className="text-[#000] text-[20px]">
          Un sistema para la solicitud de préstamos de kits educativos como LegoSpike, Arduino y
          Raspberry Pi.
        </p>
      </div>
    </>
  )
}

export default Welcome
