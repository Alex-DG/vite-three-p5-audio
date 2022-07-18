import SoundAnalyse from './SoundAnalyze'
import VideoFile from './Video'

class AudioPlayer {
  constructor() {
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
    SoundAnalyse.setVolume(value)
  }

  onTogglePlay() {
    if (this.playing) {
      SoundAnalyse.pause()
      VideoFile.pause()

      this.playBtn.innerHTML = '<h1>▶️</h1>'
      this.playing = false
    } else {
      SoundAnalyse.play()
      VideoFile.play(false)

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
