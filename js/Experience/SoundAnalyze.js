import Loader from './Loader'

// import audioSrc from '../../assets/audio/03.mp3'
import audioSrc from '../../assets/audio/Duh Fuse_French Fuse.mp3'

class _SoundAnalyse {
  onAudioLoaded(audio) {
    this.audio = audio
    Loader.loaded('🎵 Audio ready')
  }

  onTriggerBeat() {
    const r = random(255)
    const g = random(255)
    const b = random(200)
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  }

  //////////////////////////////////////////////////////////////////////////////

  bind() {
    this.onAudioLoaded = this.onAudioLoaded.bind(this)
    this.onTriggerBeat = this.onTriggerBeat.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////

  setVolume(value) {
    const volume = parseFloat(value / 100)
    this.currentVolume = volume
    this.audio?.setVolume(volume)
  }

  //////////////////////////////////////////////////////////////////////////////

  play() {
    this.audio?.play()
  }

  pause() {
    this.audio?.pause()
  }

  //////////////////////////////////////////////////////////////////////////////

  start() {
    const { sketch } = this

    let fft, amp, beatDetect

    sketch.preload = () => {
      loadSound(audioSrc, this.onAudioLoaded)
    }
    sketch.setup = () => {
      canvas = createCanvas(windowWidth, windowHeight)
      canvas.parent('p5')

      amp = new p5.Amplitude()
      fft = new p5.FFT()
      beatDetect = new p5.PeakDetect(20, 20000, 0.3)

      beatDetect.onPeak(this.onTriggerBeat)
    }

    sketch.draw = () => {
      fft.analyze()
      beatDetect.update(fft)

      const volume = amp.getLevel() // 0 to 1
      let freq = fft.getCentroid() // 0 to 255
      freq *= 0.0015

      // Sphere
      this.smapA = map(volume, 0, 0.2, 0, 0.5)
      this.smapF = map(freq, 0, 1, 0, 10)

      // Plane
      this.mapA = map(volume, 0, 1, 0, 0.056)
      this.mapF = map(freq, 0, 1, 0, 6)
    }

    sketch.windowResized = () => {
      resizeCanvas(windowWidth, windowHeight)
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  init(s) {
    this.sketch = s
    this.currentVolume = 1.0

    this.bind()
    this.start()
  }
}

const SoundAnalyse = new _SoundAnalyse()
export default SoundAnalyse
