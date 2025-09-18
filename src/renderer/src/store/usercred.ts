import create from 'zustand'

interface State {
  name: string
  idul: string
  setTextn: (newText: string) => void
  setTexti: (newText: string) => void
}

const usercred = create<State>((set) => ({
  name: '',
  idul: '',
  setTextn: (newText: string) => set(() => ({ name: newText })),
  setTexti: (newText: string) => set(() => ({ idul: newText }))
}))

export default usercred
