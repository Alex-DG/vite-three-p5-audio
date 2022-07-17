import audioSrc from '../../assets/audio/Duh Fuse_French Fuse.mp3'
import Loader from './Loader'

const wrapper = window
window.p5 = p5

class P5Sound {
  constructor() {
    this.currentVolume = 1.0
    this.init()
  }

  init() {
    this.bind()

    wrapper.setup = () => {
      loadSound(audioSrc, this.onAudioLoaded)
      this.amp = new p5.Amplitude()
      this.fft = new p5.FFT()
      this.beatDetect = new p5.PeakDetect(20, 20000, 0.3)
      this.beatDetect.onPeak(this.onTriggerBeat)
    }
  }

  bind() {
    this.onAudioLoaded = this.onAudioLoaded.bind(this)
    this.onTriggerBeat = this.onTriggerBeat.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////

  onAudioLoaded(audio) {
    console.log('📂🎵', 'Audio ready')
    this.audio = audio
    Loader.loaded()
  }

  //////////////////////////////////////////////////////////////////////////////

  onTriggerBeat() {
    const r = random(255)
    const g = random(255)
    const b = random(200)
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  }

  setVolume(value) {
    const volume = parseFloat(value / 100)
    this.currentVolume = volume
    this.audio.setVolume(volume)
  }

  getMapData() {
    // if (this.audio?.isPlaying()) {
    this.fft.analyze()
    this.beatDetect.update(this.fft)

    const volume = this.amp.getLevel() // 0 to 1
    let freq = this.fft.getCentroid() // 0 to 255
    freq *= 0.0015

    const smapA = map(volume, 0, 0.2, 0, 0.5)
    const smapF = map(freq, 0, 1, 0, 10)

    const mapA = map(volume, 0, 1, 0, 0.056)
    const mapF = map(freq, 0, 1, 0, 6)

    return {
      mapA,
      mapF,
      smapF,
      smapA,
    }
    // }
  }

  play() {
    this.audio?.play()
  }

  pause() {
    this.audio?.pause()
  }
}

export default P5Sound
