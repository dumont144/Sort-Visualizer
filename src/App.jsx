import { useEffect, useMemo, useState, useCallback } from 'react'
import { ALGORITHMS } from './algorithms'
import { useSortPlayer } from './hooks/useSortPlayer'
import { Bars } from './components/Bars'
import { Stats } from './components/Stats'
import { Controls } from './components/Controls'

const MAX_VALUE = 100

function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * MAX_VALUE) + 5)
}

export default function App() {
  const [algorithmKey, setAlgorithmKey] = useState('quick')
  const [size, setSize] = useState(60)
  const [speed, setSpeed] = useState(60)
  const [seedArray, setSeedArray] = useState(() => generateArray(60))

  const algorithm = ALGORITHMS[algorithmKey]

  const { array, highlights, stats, isRunning, isDone, start, pause, reset } =
    useSortPlayer({
      initialArray: seedArray,
      algorithmFn: algorithm.fn,
      speed,
    })

  // Quando muda tamanho ou algoritmo, gera novo array e reseta
  useEffect(() => {
    const newArr = generateArray(size)
    setSeedArray(newArr)
    reset(newArr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, algorithmKey])

  const handleShuffle = useCallback(() => {
    const newArr = generateArray(size)
    setSeedArray(newArr)
    reset(newArr)
  }, [size, reset])

  const handleReset = useCallback(() => {
    reset(seedArray)
  }, [reset, seedArray])

  const maxValue = useMemo(() => Math.max(...array, MAX_VALUE), [array])

  return (
    <div className="grain min-h-screen relative">
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 md:py-12">
        {/* Header */}
        <header className="mb-10 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-5xl md:text-7xl text-paper leading-none">
              sort<span className="italic text-accent">.</span>visualizer
            </h1>
            <p className="font-mono text-paper/50 text-xs md:text-sm mt-3 tracking-wider uppercase">
              Seis algoritmos · Um array · Tempo real
            </p>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-paper/40 hover:text-paper transition-colors border border-paper/10 px-3 py-2 hover:border-paper/30"
          >
            view source ↗
          </a>
        </header>

        {/* Layout */}
        <div className="grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-10">
          {/* Coluna esquerda: visualização + stats */}
          <div className="space-y-6">
            <div className="bg-ink border border-paper/10 h-[400px] md:h-[500px] relative overflow-hidden">
              <Bars array={array} highlights={highlights} maxValue={maxValue} />
              {isDone && (
                <div className="absolute top-4 right-4 font-mono text-xs text-sage uppercase tracking-wider animate-pulse">
                  ● ordenado
                </div>
              )}
              <div className="absolute bottom-4 left-4 font-mono text-[10px] text-paper/30 uppercase tracking-wider">
                {algorithm.name} · n={array.length}
              </div>
            </div>

            {/* Legenda */}
            <div className="flex gap-5 flex-wrap font-mono text-[10px] uppercase tracking-wider text-paper/50">
              <LegendItem color="bg-paper/80" label="Padrão" />
              <LegendItem color="bg-gold" label="Comparando" />
              <LegendItem color="bg-accent" label="Trocando / Pivô" />
              <LegendItem color="bg-sage" label="Ordenado" />
            </div>

            <div className="bg-ink border border-paper/10 p-6">
              <Stats stats={stats} algorithm={algorithm} />
            </div>
          </div>

          {/* Coluna direita: controles */}
          <aside className="bg-ink border border-paper/10 p-6 h-fit lg:sticky lg:top-8">
            <Controls
              algorithmKey={algorithmKey}
              setAlgorithmKey={setAlgorithmKey}
              size={size}
              setSize={setSize}
              speed={speed}
              setSpeed={setSpeed}
              isRunning={isRunning}
              isDone={isDone}
              onPlay={start}
              onPause={pause}
              onShuffle={handleShuffle}
              onReset={handleReset}
            />
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-paper/10 font-mono text-[10px] text-paper/30 uppercase tracking-wider flex justify-between">
          <span>built with react + vite</span>
          <span>MIT license</span>
        </footer>
      </div>
    </div>
  )
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 ${color}`} />
      <span>{label}</span>
    </div>
  )
}
