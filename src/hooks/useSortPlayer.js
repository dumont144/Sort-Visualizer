import { useEffect, useRef, useState, useCallback } from 'react'

export function useSortPlayer({ initialArray, algorithmFn, speed }) {
  const [array, setArray] = useState(initialArray)
  const [highlights, setHighlights] = useState({}) // index -> style
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, writes: 0, elapsed: 0 })
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const generatorRef = useRef(null)
  const rafRef = useRef(null)
  const startTimeRef = useRef(0)
  const accumulatedRef = useRef(0)
  const lastTickRef = useRef(0)
  const speedRef = useRef(speed)

  useEffect(() => { speedRef.current = speed }, [speed])

  const reset = useCallback((newArr) => {
    cancelAnimationFrame(rafRef.current)
    generatorRef.current = null
    setArray(newArr)
    setHighlights({})
    setStats({ comparisons: 0, swaps: 0, writes: 0, elapsed: 0 })
    setIsRunning(false)
    setIsDone(false)
    accumulatedRef.current = 0
  }, [])

  const applyStep = useCallback((step) => {
    setHighlights((h) => {
      const next = { ...h }
      // remove highlights de compare/swap antigos
      Object.keys(next).forEach((k) => {
        if (next[k] === 'compare' || next[k] === 'swap') delete next[k]
      })
      switch (step.type) {
        case 'compare':
          step.indices.forEach((i) => { if (!next[i]) next[i] = 'compare' })
          setStats((s) => ({ ...s, comparisons: s.comparisons + 1 }))
          break
        case 'swap':
          step.indices.forEach((i) => { if (next[i] !== 'sorted') next[i] = 'swap' })
          setArray(step.array)
          setStats((s) => ({ ...s, swaps: s.swaps + 1, writes: s.writes + 2 }))
          break
        case 'overwrite':
          if (next[step.index] !== 'sorted') next[step.index] = 'swap'
          setArray(step.array)
          setStats((s) => ({ ...s, writes: s.writes + 1 }))
          break
        case 'mark':
          step.indices.forEach((i) => { next[i] = step.style })
          break
        case 'unmark':
          step.indices.forEach((i) => { delete next[i] })
          break
        case 'done':
          setArray(step.array)
          setIsDone(true)
          setIsRunning(false)
          break
        default:
          break
      }
      return next
    })
  }, [])

  const tick = useCallback((timestamp) => {
    if (!generatorRef.current) return
    if (!lastTickRef.current) lastTickRef.current = timestamp
    const delta = timestamp - lastTickRef.current
    lastTickRef.current = timestamp
    accumulatedRef.current += delta

    // intervalo entre passos = inversamente proporcional à velocidade
    // speed: 1 (lento) ... 100 (rápido) -> interval: 200ms ... 1ms
    const interval = Math.max(1, 200 - speedRef.current * 2)
    let steps = Math.floor(accumulatedRef.current / interval)
    accumulatedRef.current -= steps * interval

    while (steps-- > 0) {
      const { value, done } = generatorRef.current.next()
      if (done) {
        setIsRunning(false)
        setIsDone(true)
        setStats((s) => ({ ...s, elapsed: performance.now() - startTimeRef.current }))
        return
      }
      applyStep(value)
      if (value?.type === 'done') {
        setStats((s) => ({ ...s, elapsed: performance.now() - startTimeRef.current }))
        return
      }
    }
    setStats((s) => ({ ...s, elapsed: performance.now() - startTimeRef.current }))
    rafRef.current = requestAnimationFrame(tick)
  }, [applyStep])

  const start = useCallback(() => {
    if (isDone) return
    if (!generatorRef.current) {
      generatorRef.current = algorithmFn(array)
    }
    setIsRunning(true)
    startTimeRef.current = performance.now() - stats.elapsed
    lastTickRef.current = 0
    accumulatedRef.current = 0
    rafRef.current = requestAnimationFrame(tick)
  }, [algorithmFn, array, isDone, stats.elapsed, tick])

  const pause = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    setIsRunning(false)
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return { array, highlights, stats, isRunning, isDone, start, pause, reset }
}
