import create from 'zustand'

interface State {
  visible: boolean
  toggleVisible: () => void
}

const msgLego = create<State>((set) => ({
  visible: true,
  toggleVisible: () => set((state) => ({ visible: !state.visible }))
}))

export default msgLego
