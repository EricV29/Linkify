import create from 'zustand'

interface State {
  visiblemsgq: boolean
  textmsgq: string
  toolmsgq: string
  yesmsgq: boolean
  nomsgq: boolean
  toggleVisiblemsgq: () => void
  setTextmsgq: (text: string) => void
  setToolmsgq: (text: string) => void
  toggleYesmsgq: (value: boolean) => void
  toggleNomsgq: (value: boolean) => void
}

const msgquestion = create<State>((set) => ({
  visiblemsgq: false,
  textmsgq: '',
  toolmsgq: '',
  yesmsgq: false,
  nomsgq: false,
  toggleVisiblemsgq: () => set((state) => ({ visiblemsgq: !state.visiblemsgq })),
  setTextmsgq: (text) => set(() => ({ textmsgq: text })),
  setToolmsgq: (text) => set(() => ({ toolmsgq: text })),
  toggleYesmsgq: (value) => set(() => ({ yesmsgq: value })),
  toggleNomsgq: (value) => set(() => ({ nomsgq: value }))
}))

export default msgquestion
