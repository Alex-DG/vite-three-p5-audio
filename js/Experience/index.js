import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import P5Sound from './P5Sound.js'
import SphereMaterial from './SphereMaterial.js'

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
    this.setSphere()
    this.setP5Sound()
    this.setResize()
    this.update()

    console.log('🤖', 'Experience initialized')
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
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
    this.camera.position.x = 1
    this.camera.position.y = 1
    this.camera.position.z = 1
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
    const geometry = new THREE.SphereGeometry(0.8, 100, 100)
    this.material = new SphereMaterial()
    // const material = new THREE.MeshNormalMaterial({ wireframe: true })
    this.sphere = new THREE.Mesh(geometry, this.material)
    this.scene.add(this.sphere)
  }

  setP5Sound() {
    this.p5Sound = new P5Sound()
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

  update() {
    this.updateTime()
    this.updateMaterial()

    // Update controls
    this.controls.update()

    // Render
    this.renderer.render(this.scene, this.camera)

    // Call update again on the next frame
    window.requestAnimationFrame(this.update)
  }
}

export default Experience
