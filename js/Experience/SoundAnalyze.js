import Loader from './Loader'

import audioSrc from '../../assets/audio/Duh Fuse_French Fuse.mp3'

let words = [
  '日本',
  'Salut',
  'Tokyo',
  '伝承',
  'travel',
  'modern',
  'おやすみ',
  'neon',
  'temples',
  'shrine',
  'culture',
  'futur',
  '東京',
  'こんにちは',
  'ありがとう',
  'いただきます',
  'merci',
  'city',
  'people',
  'commute',
  'torii',
  '鳥居',
  'ramen',
  'ラーメン',
  'すし',
  'sushi',
]

class _SoundAnalyse {
  onAudioLoaded(audio) {
    this.audio = audio
    Loader.loaded('🎵 Audio ready')
  }

  onTriggerBeat() {
    if (this.audio.currentTime() > 7) {
      this.bgColor = color(random(255), random(255), random(255))

      this.texts.forEach((el, i) => {
        el.style.opacity = 0
        setTimeout(() => {
          el.style.opacity = 1
          // el.style.color = color(random(255), random(255), random(255))
          el.style.padding = `${random(40)}% 0 0 0`
          el.innerHTML = random(words)
        }, random(255) * i)
      })
    }
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

  drawFFT() {
    noStroke()
    for (let i = 0; i < this.spectrum.length; i++) {
      let y = map(this.spectrum[i] * 0.65, 0, 255, height, 0)
      push()
      stroke(0)
      strokeWeight(2.1)
      fill(255)
      rect(i * this.binWidth, y, this.binWidth, height - y)
      pop()
    }
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
    const { sketch, bins } = this

    let fft, beatDetect, amp, canvas

    sketch.preload = () => {
      loadSound(audioSrc, this.onAudioLoaded)
    }

    sketch.setup = () => {
      canvas = createCanvas(windowWidth, windowHeight)
      canvas.parent('p5')

      // Sound analysis tools
      fft = new p5.FFT(0.5, bins)
      amp = new p5.Amplitude()

      // Peak detection
      beatDetect = new p5.PeakDetect(0, 20000, 0.035)
      beatDetect.onPeak(this.onTriggerBeat)

      this.binWidth = width / bins
      this.bgColor = color(205, 150, 255)
    }

    sketch.draw = () => {
      background(this.bgColor)

      // Start FFT
      this.spectrum = fft.analyze()
      this.drawFFT()

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

    this.bins = 64
    this.binWidth = 0
    this.currentVolume = 1.0
    this.bgColor = 0
    this.spectrum = new Array(64).fill(0)

    this.texts = [...document.querySelectorAll('.text span')]

    this.bind()
    this.start()
  }
}

const SoundAnalyse = new _SoundAnalyse()
export default SoundAnalyse
