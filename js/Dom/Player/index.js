import './styles.css'

export const Player = `
  <div class="player disabled">
    <div class="volume">
      <h2 id="icon-volume">🔉</h2>
      <input
        id="player-volume"
        type="range"
        min="0"
        max="100"
        value="100"
      />
    </div>

    <button id="player-btn"><h1>▶️</h1></button>
  </div>
`
