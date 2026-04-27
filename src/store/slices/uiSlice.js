import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    projectFilter: 'all',
    isNavOpen: false,
    headerVisible: false,
    headerDark: false,
  },
  reducers: {
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload
    },
    toggleNav: (state) => {
      state.isNavOpen = !state.isNavOpen
    },
    closeNav: (state) => {
      state.isNavOpen = false
    },
    setHeaderVisible: (state, action) => {
      state.headerVisible = action.payload
    },
    setHeaderDark: (state, action) => {
      state.headerDark = action.payload
    },
  },
})

export const { setProjectFilter, toggleNav, closeNav, setHeaderVisible, setHeaderDark } =
  uiSlice.actions
export default uiSlice.reducer
