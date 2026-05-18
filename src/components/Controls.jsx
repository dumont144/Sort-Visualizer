import { ALGORITHMS } from '../algorithms'

export function Controls({
  algorithmKey, setAlgorithmKey,
  size, setSize,
  speed, setSpeed,
  isRunning, isDone,
  onPlay, onPause, onShuffle, onReset,
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-paper/40 uppercase tracking-wider text-[10px] mb-2">
          Algoritmo
        </label>
        <select
          value={algorithmKey}
          onChange={(e) => setAlgorithmKey(e.target.value)}
          disabled={isRunning}
          className="w-full bg-ink border border-paper/20 text-paper px-3 py-2 font-mono text-sm focus:outline-none focus:border-accent disabled:opacity-50"
        >
          {Object.entries(ALGORITHMS).map(([key, alg]) => (
            <option key={key} value={key}>{alg.name}</option>
          ))}
        </select>
      </div>

      <Slider
        label="Tamanho do array"
        value={size}
        min={10}
        max={200}
        onChange={setSize}
        disabled={isRunning}
        suffix={size.toString()}
      />

      <Slider
        label="Velocidade"
        value={speed}
        min={1}
        max={100}
        onChange={setSpeed}
        disabled={false}
        suffix={`${speed}%`}
      />

      <div className="grid grid-cols-2 gap-2 pt-2">
        {!isRunning ? (
          <button
            onClick={onPlay}
            disabled={isDone}
            className="bg-accent text-ink font-bold py-3 hover:bg-accent/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono text-sm tracking-wider"
          >
            ▶ EXECUTAR
          </button>
        ) : (
          <button
            onClick={onPause}
            className="bg-gold text-ink font-bold py-3 hover:bg-gold/90 transition-colors font-mono text-sm tracking-wider"
          >
            ❚❚ PAUSAR
          </button>
        )}
        <button
          onClick={onShuffle}
          disabled={isRunning}
          className="border border-paper/20 text-paper py-3 hover:bg-paper/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono text-sm tracking-wider"
        >
          ⤭ EMBARALHAR
        </button>
      </div>

      <button
        onClick={onReset}
        disabled={isRunning}
        className="w-full text-paper/50 py-2 hover:text-paper transition-colors disabled:opacity-30 disabled:cursor-not-allowed font-mono text-xs tracking-wider"
      >
        RESET
      </button>
    </div>
  )
}

function Slider({ label, value, min, max, onChange, disabled, suffix }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <label className="text-paper/40 uppercase tracking-wider text-[10px]">{label}</label>
        <span className="font-mono text-paper text-xs tabular-nums">{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full accent-accent disabled:opacity-50"
      />
    </div>
  )
}
