import audioSrc from '../../assets/audio/Duh Fuse - French Fuse.mp3'
// import audioSrc from '../../assets/audio/02.mp3'

const wrapper = window
window.p5 = p5

class P5Sound {
  constructor(options) {
    this.audioUrl = options.audioSrc || audioSrc
    this.init()
  }

  init() {
    this.bind()

    wrapper.setup = () => {
      loadSound(this.audioUrl, this.onAudioLoaded)
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
    console.log('📂🎵', 'Audio loaded', { audio })
    this.audio = audio
  }

  //////////////////////////////////////////////////////////////////////////////

  onTriggerBeat() {
    const r = random(255)
    const g = random(255)
    const b = random(200)
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
  }

  getMapData() {
    if (this.audio?.isPlaying()) {
      this.fft.analyze()
      this.beatDetect.update(this.fft)

      const volume = this.amp.getLevel() // 0 to 1
      // const freq = fft.getEnergy('highMid')
      let freq = this.fft.getCentroid() // 0 to 255
      freq *= 0.001

      // const mapF = map(freq, 0, 1, 0, 20)
      // const mapA = map(volume, 0, 0.2, 0, 0.5)

      // const mapA = map(volume, 0, 1, 0, 0.05)
      // const mapF = map(freq, 0, 1, 0, 10)
      const mapA = map(volume, 0, 1, 0, 0.056)
      const mapF = map(freq, 0, 1, 0, 6)

      return {
        mapA,
        mapF,
      }
    }
  }

  play() {
    this.audio?.play()
  }

  pause() {
    this.audio?.pause()
  }
}

export default P5Sound
