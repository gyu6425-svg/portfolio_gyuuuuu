import { memo, useCallback } from 'react'
import { List, AutoSizer, InfiniteLoader } from 'react-virtualized'
import 'react-virtualized/styles.css'

const VirtualList = memo(function VirtualList({
  items,
  totalCount,
  rowHeight = 80,
  onLoadMore,
  renderRow,
  threshold = 8,
}) {
  const isRowLoaded = useCallback(
    ({ index }) => index < items.length,
    [items.length]
  )

  const loadMoreRows = useCallback(
    ({ startIndex, stopIndex }) => {
      if (onLoadMore) return onLoadMore({ startIndex, stopIndex })
      return Promise.resolve()
    },
    [onLoadMore]
  )

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={totalCount}
      threshold={threshold}
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List
              ref={registerChild}
              width={width}
              height={height}
              rowCount={items.length}
              rowHeight={rowHeight}
              onRowsRendered={onRowsRendered}
              rowRenderer={({ index, key, style }) =>
                renderRow({ item: items[index], index, key, style })
              }
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  )
})

export default VirtualList
