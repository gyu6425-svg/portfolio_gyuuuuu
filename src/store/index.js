import { configureStore } from '@reduxjs/toolkit'
import uiReducer from './slices/uiSlice'
import projectsReducer from './slices/projectsSlice'

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    projects: projectsReducer,
  },
})
