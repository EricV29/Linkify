import create from 'zustand'

interface State {
  load: boolean
  toggleLoad: () => void
}

const loading = create<State>((set) => ({
  load: false,
  toggleLoad: () => set((state) => ({ load: !state.load }))
}))

export default loading
