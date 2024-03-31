import create from 'zustand'

const yesorNo = create((set) => ({
  status: false,
  toggleStatus: () => set((state) => ({ visible: !state.status }))
}))

export default yesorNo
