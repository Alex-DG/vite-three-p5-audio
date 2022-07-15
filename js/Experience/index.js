import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import P5Sound from './P5Sound.js'
import SphereMaterial from './shaders/sphere/SphereMaterial.js'
import VideoFile from './VideoFile.js'
import PlayButton from './PlayButton.js'
import PlaneMaterial from './shaders/plane/PlaneMaterial.js'
import { Vector2 } from 'three'

class Experience {
  constructor(options) {
    this.scene = new THREE.Scene()
    this.clock = new THREE.Clock()
    this.lastElapsedTime = 0
    this.deltaTime = 0
    this.frameCount = 0
    this.container = options.domElement

    this.init()
  }

  /**
   * Experience setup
   */
  init() {
    this.bind()

    this.setSizes()
    this.setRenderer()
    this.setCamera()
    // this.setSphere()
    this.setVideo()
    this.setP5Sound()
    this.setPlayButton()
    this.setResize()

    this.update()

    console.log('🤖', 'Experience initialized')
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
    this.setPlane = this.setPlane.bind(this)
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth
    this.sizes.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  //////////////////////////////////////////////////////////////////////////////

  setSizes() {
    this.sizes = {
      width: this.container.offsetWidth,
      height: this.container.offsetHeight || window.innerHeight,
    }
  }

  setCamera() {
    // Base camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    )
    // this.camera.position.x = 0.5
    // this.camera.position.y = 0.5
    this.camera.position.z = 2
    this.scene.add(this.camera)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.container.appendChild(this.renderer.domElement)
  }

  setSphere() {
    const geometry = new THREE.SphereBufferGeometry(0.75, 100, 100)
    this.material = new SphereMaterial()
    // const material = new THREE.MeshNormalMaterial({ wireframe: true })
    this.sphere = new THREE.Mesh(geometry, this.material)
    this.scene.add(this.sphere)
  }

  setPlane(videoTexture, textureSize) {
    const segments = 32
    const geometry = new THREE.PlaneBufferGeometry(2.8, 1.8, segments, segments)

    const resolution = new Vector2(this.sizes.width, this.sizes.height)
    this.planeMaterial = new PlaneMaterial(
      videoTexture,
      textureSize,
      resolution
    )
    this.plane = new THREE.Mesh(geometry, this.planeMaterial)
    this.plane.rotation.y = Math.PI / 7
    this.plane.rotation.z = Math.PI / 50
    this.scene.add(this.plane)
  }

  setVideo() {
    this.videoFile = new VideoFile({
      onLoadedSuccess: this.setPlane,
    })
  }

  setP5Sound() {
    this.p5Sound = new P5Sound({
      // audioSrc: '../../assets/audio/02.mp3',
      // audioSrc: '../../assets/audio/Duh Fuse - French Fuse.mp3',
      // audioSrc: '../../assets/audio/music_in_japan_2015_v1.mp3',

      // audioSrc: '../../assets/audio/05.mp4',
      // audioSrc: '../../assets/audio/02.mp3',
      audioSrc: '../../assets/audio/Duh Fuse - French Fuse.mp3',
      // audioSrc: '../../assets/audio/Samurai Champloo - Shiki No Uta.mp3',
    })
  }

  setPlayButton() {
    this.playBtn = new PlayButton({
      video: this.videoFile,
      audio: this.p5Sound,
    })
  }

  setResize() {
    window.addEventListener('resize', this.resize)
  }

  //////////////////////////////////////////////////////////////////////////////

  updateTime() {
    this.frameCount += 1
    this.elapsedTime = this.clock.getElapsedTime()
    this.deltaTime = this.elapsedTime - this.lastElapsedTime
    this.lastElapsedTime = this.elapsedTime
  }

  updateMaterial() {
    this.material.uniforms.uTime.value = this.frameCount

    const isPlaying = this.p5Sound?.isPlaying

    if (isPlaying) {
      const { mapF, mapA } = this.p5Sound.getMapData()
      this.material.uniforms.uFrequency.value = mapF
      this.material.uniforms.uAmplitude.value = mapA
    } else {
      this.material.uniforms.uFrequency.value = 0
      this.material.uniforms.uAmplitude.value = 0
    }
  }

  updatePlaneMaterial() {
    this.planeMaterial.uniforms.uTime.value = this.frameCount

    if (this.playBtn.playing) {
      const { mapF, mapA } = this.p5Sound.getMapData()
      this.planeMaterial.uniforms.uFrequency.value = mapF
      this.planeMaterial.uniforms.uAmplitude.value = mapA
      this.planeMaterial.uniforms.uSpeed.value = 0.05
    } else {
      this.planeMaterial.uniforms.uFrequency.value = 0
      this.planeMaterial.uniforms.uAmplitude.value = 0
      this.planeMaterial.uniforms.uSpeed.value = 0
    }
  }

  update() {
    this.updateTime()
    this.updatePlaneMaterial()

    // Update controls
    this.controls.update()

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call update again on the next frame
    window.requestAnimationFrame(this.update)
  }
}

export default Experience
