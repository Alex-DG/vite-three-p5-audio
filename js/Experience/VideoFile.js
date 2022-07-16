import { VideoTexture, LinearFilter, RGBAFormat, Vector2 } from 'three'
import Loader from './Loader'

import videoSrc from '../../assets/video/video_in_japan_2015_wo_audio_v1.mp4'

class VideoFile {
  constructor(options) {
    this.onLoadedSuccess = options.onLoadedSuccess

    this.bind()
    this.init()
  }

  bind() {
    this.onVideoLoaded = this.onVideoLoaded.bind(this)
  }

  init() {
    this.setVideo()
  }

  //////////////////////////////////////////////////////////////////////////////

  onVideoLoaded() {
    console.log('📂📽️', 'Video ready')

    const texture = this.createVideoTexture()
    const textureSize = new Vector2(
      this.video.clientWidth,
      this.video.clientHeight
    )
    this.onLoadedSuccess(texture, textureSize)
    this.video.style.display = 'none'

    this.play()

    Loader.loaded()
  }

  //////////////////////////////////////////////////////////////////////////////

  setVideo() {
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

export default VideoFile
