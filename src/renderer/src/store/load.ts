import create from 'zustand'

interface State {
  load: boolean
  toggleLoad: () => void
  kitTool: string
  setkitTool: (value: string) => void
}

const loading = create<State>((set) => ({
  load: false,
  toggleLoad: () => set((state) => ({ load: !state.load })),
  kitTool: '',
  setkitTool: (value: string) => set(() => ({ kitTool: value }))
}))

export default loading
