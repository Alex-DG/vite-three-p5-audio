class PlayButton {
  constructor(options) {
    this.playBtn = document.getElementById('play-btn')
    this.audio = options.audio
    this.video = options.video
    this.playing = false

    this.bind()
    this.init()
  }

  bind() {
    this.onTogglePlay = this.onTogglePlay.bind(this)
  }

  init() {
    this.setClickEvent()
  }

  onTogglePlay() {
    if (this.playing) {
      this.audio?.pause()
      this.video?.pause()

      this.playBtn.innerHTML = '<h2>🔉</h2>'
      this.playing = false
    } else {
      this.audio?.play()
      this.video?.play(false)

      this.playBtn.innerHTML = '<h2>⏸️</h2>'
      this.playing = true
    }
  }

  setClickEvent() {
    this.playBtn.addEventListener('click', this.onTogglePlay)
  }
}

export default PlayButton
