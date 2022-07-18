import { VideoTexture, LinearFilter, RGBAFormat, Vector2 } from 'three'
import Loader from './Loader'

import videoSrc from '../../assets/video/tokyo_in_2015.mp4'

class _Video {
  onVideoLoaded() {
    const texture = this.createVideoTexture()
    const textureSize = new Vector2(
      this.video.clientWidth,
      this.video.clientHeight
    )
    this.onLoadedSuccess(texture, textureSize)
    this.video.style.display = 'none'

    this.play()

    Loader.loaded('📽️ Video ready')
  }
  //////////////////////////////////////////////////////////////////////////////

  bind() {
    this.onVideoLoaded = this.onVideoLoaded.bind(this)
  }

  init(callback) {
    this.bind()

    this.onLoadedSuccess = callback
    this.video = document.getElementById('video')
    this.video.src = videoSrc
    this.video.load()
    this.video.onloadeddata = this.onVideoLoaded()
  }

  //////////////////////////////////////////////////////////////////////////////

  createVideoTexture() {
    const texture = new VideoTexture(this.video)
    texture.needsUpdate = true
    texture.minFilter = LinearFilter
    texture.magFilter = LinearFilter
    texture.format = RGBAFormat
    texture.crossOrigin = 'anonymous'
    return texture
  }

  play(autoStop = true) {
    this.video.muted = true
    const playPromise = this.video?.play()

    if (autoStop) {
      if (playPromise !== undefined) {
        playPromise
          .then((_) => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            setTimeout(() => this.pause(), 25)
          })
          .catch((error) => {
            console.error('play video: ', { error })
          })
      }
    }
  }

  pause(time) {
    this.video?.pause()
    if (time && this.video) {
      this.video.currentTime = time
    }
  }
}

const Video = new _Video()
export default Video
