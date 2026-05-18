// Cada generator faz yield de "passos" que o player consome para animar.
// Tipos de passo:
//   { type: 'compare', indices: [i, j] }
//   { type: 'swap',    indices: [i, j], array: [...] }
//   { type: 'overwrite', index: i, value: v, array: [...] }
//   { type: 'mark',    indices: [...], style: 'pivot' | 'sorted' | 'range' }
//   { type: 'unmark',  indices: [...] }
//   { type: 'done',    array: [...] }

export function* bubbleSort(arr) {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      yield { type: 'compare', indices: [j, j + 1] }
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        yield { type: 'swap', indices: [j, j + 1], array: [...a] }
      }
    }
    yield { type: 'mark', indices: [n - i - 1], style: 'sorted' }
  }
  yield { type: 'mark', indices: [0], style: 'sorted' }
  yield { type: 'done', array: [...a] }
}

export function* insertionSort(arr) {
  const a = [...arr]
  const n = a.length
  yield { type: 'mark', indices: [0], style: 'sorted' }
  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0) {
      yield { type: 'compare', indices: [j - 1, j] }
      if (a[j - 1] > a[j]) {
        ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
        yield { type: 'swap', indices: [j - 1, j], array: [...a] }
        j--
      } else {
        break
      }
    }
    yield { type: 'mark', indices: [i], style: 'sorted' }
  }
  yield { type: 'done', array: [...a] }
}

export function* selectionSort(arr) {
  const a = [...arr]
  const n = a.length
  for (let i = 0; i < n - 1; i++) {
    let min = i
    yield { type: 'mark', indices: [min], style: 'pivot' }
    for (let j = i + 1; j < n; j++) {
      yield { type: 'compare', indices: [min, j] }
      if (a[j] < a[min]) {
        yield { type: 'unmark', indices: [min] }
        min = j
        yield { type: 'mark', indices: [min], style: 'pivot' }
      }
    }
    if (min !== i) {
      ;[a[i], a[min]] = [a[min], a[i]]
      yield { type: 'swap', indices: [i, min], array: [...a] }
    }
    yield { type: 'unmark', indices: [min] }
    yield { type: 'mark', indices: [i], style: 'sorted' }
  }
  yield { type: 'mark', indices: [n - 1], style: 'sorted' }
  yield { type: 'done', array: [...a] }
}

export function* mergeSort(arr) {
  const a = [...arr]
  yield* mergeSortHelper(a, 0, a.length - 1)
  for (let i = 0; i < a.length; i++) {
    yield { type: 'mark', indices: [i], style: 'sorted' }
  }
  yield { type: 'done', array: [...a] }
}

function* mergeSortHelper(a, lo, hi) {
  if (lo >= hi) return
  const mid = Math.floor((lo + hi) / 2)
  yield* mergeSortHelper(a, lo, mid)
  yield* mergeSortHelper(a, mid + 1, hi)
  yield* merge(a, lo, mid, hi)
}

function* merge(a, lo, mid, hi) {
  const left = a.slice(lo, mid + 1)
  const right = a.slice(mid + 1, hi + 1)
  let i = 0, j = 0, k = lo
  while (i < left.length && j < right.length) {
    yield { type: 'compare', indices: [lo + i, mid + 1 + j] }
    if (left[i] <= right[j]) {
      a[k] = left[i++]
    } else {
      a[k] = right[j++]
    }
    yield { type: 'overwrite', index: k, value: a[k], array: [...a] }
    k++
  }
  while (i < left.length) {
    a[k] = left[i++]
    yield { type: 'overwrite', index: k, value: a[k], array: [...a] }
    k++
  }
  while (j < right.length) {
    a[k] = right[j++]
    yield { type: 'overwrite', index: k, value: a[k], array: [...a] }
    k++
  }
}

export function* quickSort(arr) {
  const a = [...arr]
  yield* quickSortHelper(a, 0, a.length - 1)
  for (let i = 0; i < a.length; i++) {
    yield { type: 'mark', indices: [i], style: 'sorted' }
  }
  yield { type: 'done', array: [...a] }
}

function* quickSortHelper(a, lo, hi) {
  if (lo >= hi) {
    if (lo === hi) yield { type: 'mark', indices: [lo], style: 'sorted' }
    return
  }
  const pivot = a[hi]
  yield { type: 'mark', indices: [hi], style: 'pivot' }
  let i = lo - 1
  for (let j = lo; j < hi; j++) {
    yield { type: 'compare', indices: [j, hi] }
    if (a[j] <= pivot) {
      i++
      if (i !== j) {
        ;[a[i], a[j]] = [a[j], a[i]]
        yield { type: 'swap', indices: [i, j], array: [...a] }
      }
    }
  }
  ;[a[i + 1], a[hi]] = [a[hi], a[i + 1]]
  yield { type: 'swap', indices: [i + 1, hi], array: [...a] }
  yield { type: 'unmark', indices: [hi] }
  yield { type: 'mark', indices: [i + 1], style: 'sorted' }
  yield* quickSortHelper(a, lo, i)
  yield* quickSortHelper(a, i + 2, hi)
}

export function* heapSort(arr) {
  const a = [...arr]
  const n = a.length
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    yield* heapify(a, n, i)
  }
  for (let i = n - 1; i > 0; i--) {
    ;[a[0], a[i]] = [a[i], a[0]]
    yield { type: 'swap', indices: [0, i], array: [...a] }
    yield { type: 'mark', indices: [i], style: 'sorted' }
    yield* heapify(a, i, 0)
  }
  yield { type: 'mark', indices: [0], style: 'sorted' }
  yield { type: 'done', array: [...a] }
}

function* heapify(a, n, i) {
  let largest = i
  const l = 2 * i + 1
  const r = 2 * i + 2
  if (l < n) {
    yield { type: 'compare', indices: [l, largest] }
    if (a[l] > a[largest]) largest = l
  }
  if (r < n) {
    yield { type: 'compare', indices: [r, largest] }
    if (a[r] > a[largest]) largest = r
  }
  if (largest !== i) {
    ;[a[i], a[largest]] = [a[largest], a[i]]
    yield { type: 'swap', indices: [i, largest], array: [...a] }
    yield* heapify(a, n, largest)
  }
}

export const ALGORITHMS = {
  bubble:    { name: 'Bubble Sort',    fn: bubbleSort,    avg: 'O(n²)',     worst: 'O(n²)',     space: 'O(1)' },
  insertion: { name: 'Insertion Sort', fn: insertionSort, avg: 'O(n²)',     worst: 'O(n²)',     space: 'O(1)' },
  selection: { name: 'Selection Sort', fn: selectionSort, avg: 'O(n²)',     worst: 'O(n²)',     space: 'O(1)' },
  merge:     { name: 'Merge Sort',     fn: mergeSort,     avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(n)' },
  quick:     { name: 'Quick Sort',     fn: quickSort,     avg: 'O(n log n)', worst: 'O(n²)',     space: 'O(log n)' },
  heap:      { name: 'Heap Sort',      fn: heapSort,      avg: 'O(n log n)', worst: 'O(n log n)', space: 'O(1)' },
}
