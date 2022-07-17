class AudioPlayer {
  constructor(options) {
    this.audio = options.audio
    this.video = options.video

    this.playing = false
    this.audioEnabled = true

    this.bind()
    this.init()
  }

  bind() {
    this.onTogglePlay = this.onTogglePlay.bind(this)
    this.onVolumeChange = this.onVolumeChange.bind(this)
  }

  init() {
    this.setPlayBtn()
    this.setPlayEvent()
    this.setVolumeSlider()
    this.setVolumeEvent()
  }

  //////////////////////////////////////////////////////////////////////////////

  onVolumeChange(e) {
    const value = e.target.value
    this.audio.setVolume(value)
  }

  onTogglePlay() {
    if (this.playing) {
      this.audio?.pause()
      this.video?.pause()

      this.playBtn.innerHTML = '<h1>▶️</h1>'
      this.playing = false
    } else {
      this.audio?.play()
      this.video?.play(false)

      this.playBtn.innerHTML = '<h1>⏸️</h1>'
      this.playing = true
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  setPlayBtn() {
    this.playBtn = document.getElementById('player-btn')
  }

  setPlayEvent() {
    this.playBtn.addEventListener('click', this.onTogglePlay)
  }

  setVolumeSlider() {
    this.slider = document.getElementById('player-volume')
  }

  setVolumeEvent() {
    this.slider.addEventListener('change', this.onVolumeChange)
  }
}

export default AudioPlayer
