const Loading = `
  <div class="loading-layout">
    <h1>Loading</h1>
  </div>
`
const AudioPlayer = `
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

const Credits = `
  <div class="credits">
    <span
      >Video
      <a href="https://www.youtube.com/watch?v=ojKBgKvnqvw" target="_blank"
        >Vincent Urban</a
      >
      | Music
      <a href="https://www.youtube.com/watch?v=mOQc0sdN4bM" target="_blank"
        >French Fuse</a
      >
      | Code
      <a href="https://twitter.com/Alex_dg_dev" target="_blank"
        >Alex DG</a
      ></span
    >
  </div>
`

const Video = `
  <video id="video"></video>
`

export { Loading, AudioPlayer, Credits, Video }
