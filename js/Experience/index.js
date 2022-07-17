import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import P5Sound from './P5Sound.js'
import SphereMaterial from './shaders/sphere/SphereMaterial.js'
import VideoFile from './VideoFile.js'
import AudioPlayer from './AudioPlayer.js'
import PlaneMaterial from './shaders/plane/PlaneMaterial.js'
import { Vector2 } from 'three'

class Experience {
  constructor(options) {
    console.log('🤖', 'Starting experience...')

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
    this.setSphere()
    this.setVideo()
    this.setP5Sound()
    this.setAudioPlayer()
    this.setResize()

    this.update()
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
    const segments = 200
    const geometry = new THREE.SphereBufferGeometry(4.5, segments, segments)
    this.sphereMaterial = new SphereMaterial()
    this.sphere = new THREE.Mesh(geometry, this.sphereMaterial)
    this.sphere.position.z = -6
    this.scene.add(this.sphere)
  }

  setPlane(videoTexture, textureSize) {
    const segments = 64
    const geometry = new THREE.PlaneBufferGeometry(3, 2.2, segments, segments)

    const resolution = new Vector2(this.sizes.width, this.sizes.height)
    this.planeMaterial = new PlaneMaterial(
      videoTexture,
      textureSize,
      resolution
    )
    this.plane = new THREE.Mesh(geometry, this.planeMaterial)
    this.plane.position.x = -0.5
    this.plane.rotation.y = Math.PI / 10
    this.plane.rotation.z = Math.PI / 50
    this.scene.add(this.plane)
  }

  setVideo() {
    this.videoFile = new VideoFile({
      onLoadedSuccess: this.setPlane,
    })
  }

  setP5Sound() {
    this.p5Sound = new P5Sound()
  }

  setAudioPlayer() {
    this.player = new AudioPlayer({
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

  updateSphereMaterial() {
    this.sphereMaterial.uniforms.uTime.value = this.frameCount

    if (this.player.playing) {
      const { smapF, smapA } = this.p5Sound.getMapData()
      this.sphereMaterial.uniforms.uFrequency.value = smapF
      this.sphereMaterial.uniforms.uAmplitude.value = smapA
    } else {
      this.sphereMaterial.uniforms.uFrequency.value = 0
      this.sphereMaterial.uniforms.uAmplitude.value = 0
    }
  }

  updatePlaneMaterial() {
    this.planeMaterial.uniforms.uTime.value = this.frameCount

    if (this.player.playing) {
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
    this.updateSphereMaterial()

    // Update controls
    this.controls.update()

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call update again on the next frame
    window.requestAnimationFrame(this.update)
  }
}

export default Experience
