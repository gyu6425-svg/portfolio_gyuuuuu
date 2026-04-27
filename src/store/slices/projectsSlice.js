import { createSlice } from '@reduxjs/toolkit'

const CATEGORIES = ['web', 'mobile', 'design']

const generateProjects = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Project ${i + 1}`,
    category: CATEGORIES[i % CATEGORIES.length],
    year: 2022 + (i % 3),
    description: 'Short project description goes here.',
    tags: ['React', 'TypeScript', 'Figma'].slice(0, (i % 3) + 1),
  }))

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    items: generateProjects(60),
    visibleCount: 12,
    isLoading: false,
  },
  reducers: {
    loadMore: (state) => {
      state.visibleCount = Math.min(state.visibleCount + 12, state.items.length)
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

export const { loadMore, setLoading } = projectsSlice.actions
export default projectsSlice.reducer
