export function Stats({ stats, algorithm }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-sm">
      <Stat label="Comparações" value={stats.comparisons.toLocaleString('pt-BR')} />
      <Stat label="Trocas" value={stats.swaps.toLocaleString('pt-BR')} />
      <Stat label="Escritas" value={stats.writes.toLocaleString('pt-BR')} />
      <Stat label="Tempo" value={`${(stats.elapsed / 1000).toFixed(2)}s`} />
      <div className="col-span-2 md:col-span-4 border-t border-paper/10 pt-3 mt-1">
        <div className="grid grid-cols-3 gap-4 text-xs text-paper/60">
          <div>
            <span className="block text-paper/40 uppercase tracking-wider mb-1">Média</span>
            <span className="text-paper">{algorithm.avg}</span>
          </div>
          <div>
            <span className="block text-paper/40 uppercase tracking-wider mb-1">Pior caso</span>
            <span className="text-paper">{algorithm.worst}</span>
          </div>
          <div>
            <span className="block text-paper/40 uppercase tracking-wider mb-1">Espaço</span>
            <span className="text-paper">{algorithm.space}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-paper/40 uppercase tracking-wider text-[10px] mb-1">{label}</div>
      <div className="text-paper text-2xl font-bold tabular-nums">{value}</div>
    </div>
  )
}
