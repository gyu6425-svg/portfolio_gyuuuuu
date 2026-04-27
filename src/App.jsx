import { lazy, Suspense, memo, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Header } from './components/layout/Header'
import { setHeaderVisible, setHeaderDark } from './store/slices/uiSlice'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

const PageLoader = memo(function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-[var(--text)] border-t-transparent rounded-full animate-spin" />
    </div>
  )
})

const App = memo(function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const headerVisible = useSelector((state) => state.ui.headerVisible)
  const headerDark = useSelector((state) => state.ui.headerDark)
  const isHomePage = location.pathname === '/home'
  const isProjectsPage = location.pathname === '/projects'

  // 라우트 변경 시 헤더 상태 리셋
  useEffect(() => {
    dispatch(setHeaderDark(isProjectsPage))
    if (isHomePage) {
      dispatch(setHeaderVisible(false))
    }
  }, [location.pathname, dispatch, isHomePage, isProjectsPage])

  const showHeader = isHomePage ? headerVisible : true

  return (
    <>
      {/* 고정 헤더 */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          showHeader
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        } ${headerDark ? 'bg-transparent' : 'bg-white'}`}
      >
        <div className="max-w-[1700px] mx-auto px-10 py-5">
          <Header />
        </div>
      </div>

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
    </>
  )
})

export default App
