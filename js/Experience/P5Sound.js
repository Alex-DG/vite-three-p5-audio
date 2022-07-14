import audioSrc from '../../assets/audio/01.mp3'

const wrapper = window
window.p5 = p5

class P5Sound {
  constructor() {
    this.playBtn = document.getElementById('play-audio-btn')
    this.isPlaying = false

    this.init()
  }

  init() {
    this.bind()

    wrapper.setup = () => {
      loadSound(audioSrc, this.onAudioLoaded)
      this.amp = new p5.Amplitude()
      this.fft = new p5.FFT()
    }
  }

  bind() {
    this.onAudioLoaded = this.onAudioLoaded.bind(this)
    this.onTogglePlay = this.onTogglePlay.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////

  onTogglePlay() {
    if (this.audio?.isPlaying()) {
      this.audio?.pause()
      this.playBtn.innerText = 'Play'
      this.isPlaying = false
    } else {
      this.audio?.play()
      this.playBtn.innerText = 'Pause'
      this.isPlaying = true
    }
  }

  onAudioLoaded(audio) {
    console.log('📂🎵', 'Audio loaded', { audio })
    this.audio = audio
    this.playBtn.addEventListener('click', this.onTogglePlay)
  }

  //////////////////////////////////////////////////////////////////////////////

  update() {
    if (this.isPlaying) {
      this.fft.analyze()

      const volume = this.amp.getLevel() // 0 to 1
      // const freq = fft.getEnergy('highMid') // 0 to 255
      let freq = this.fft.getCentroid() // 0 to 255
      freq *= 0.001

      this.mapF = map(freq, 0, 1, 0, 20)
      this.mapA = map(volume, 0, 0.2, 0, 0.5)
    }
  }
}

export default P5Sound
