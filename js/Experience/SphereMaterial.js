import { ShaderMaterial } from 'three'

import vertexShader from './shaders/sphere/vertex.glsl'
import fragmentShader from './shaders/sphere/fragment.glsl'

const settings = {
  frequency: 0,
  amplitude: 0,
}

class SphereMaterial extends ShaderMaterial {
  constructor() {
    super({
      wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
      },
      vertexShader,
      fragmentShader,
    })
  }
}

export default SphereMaterial
