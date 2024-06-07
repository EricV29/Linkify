import create from 'zustand'

interface State {
  visiblenoti: boolean
  text: string
  toggleVisiblenoti: () => void
  setText: (newText: string) => void
}

const noti = create<State>((set) => ({
  visiblenoti: false,
  text: '',
  toggleVisiblenoti: () => set((state) => ({ visiblenoti: !state.visiblenoti })),
  setText: (newText: string) => set(() => ({ text: newText }))
}))

export default noti
