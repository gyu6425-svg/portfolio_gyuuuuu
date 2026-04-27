import { memo, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PAGE_ORDER } from '../../constants/pages'

export const Pagination = memo(function Pagination() {
  const navigate = useNavigate()
  const location = useLocation()

  const currentIndex = PAGE_ORDER.findIndex((p) => p.path === location.pathname)

  const goToPrev = useCallback(() => {
    const idx = currentIndex <= 0 ? PAGE_ORDER.length - 1 : currentIndex - 1
    navigate(PAGE_ORDER[idx].path)
  }, [currentIndex, navigate])

  const goToNext = useCallback(() => {
    const idx = currentIndex >= PAGE_ORDER.length - 1 ? 0 : currentIndex + 1
    navigate(PAGE_ORDER[idx].path)
  }, [currentIndex, navigate])

  return (
    <nav className="pagination" aria-label="Portfolio pages">
      <button type="button" className="pagination-arrow" onClick={goToPrev}>
        Prev
      </button>

      <div className="pagination-list">
        {PAGE_ORDER.map((page, index) => {
          const isActive = index === currentIndex
          return (
            <button
              key={page.id}
              type="button"
              className={`pagination-item${isActive ? ' is-active' : ''}`}
              onClick={() => navigate(page.path)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="pagination-number">{page.number}</span>
              <span className="pagination-label">{page.label}</span>
            </button>
          )
        })}
      </div>

      <button type="button" className="pagination-arrow" onClick={goToNext}>
        Next
      </button>
    </nav>
  )
})
