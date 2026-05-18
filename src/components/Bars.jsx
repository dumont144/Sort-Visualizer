import { memo } from 'react'

const STYLE_MAP = {
  compare: 'bg-gold',
  swap: 'bg-accent',
  pivot: 'bg-accent shadow-[0_0_20px_rgba(255,87,51,0.6)]',
  sorted: 'bg-sage',
  range: 'bg-gold/40',
}

function BarsImpl({ array, highlights, maxValue }) {
  const n = array.length
  return (
    <div
      className="flex items-end gap-[2px] w-full h-full px-2"
      role="img"
      aria-label={`Array de ${n} elementos sendo ordenado`}
    >
      {array.map((value, i) => {
        const heightPct = (value / maxValue) * 100
        const style = highlights[i]
        const bg = STYLE_MAP[style] || 'bg-paper/80'
        return (
          <div
            key={i}
            className={`flex-1 rounded-t-sm transition-colors duration-75 ${bg}`}
            style={{ height: `${heightPct}%` }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

export const Bars = memo(BarsImpl)
