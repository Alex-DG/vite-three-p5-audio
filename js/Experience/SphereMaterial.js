import { ShaderMaterial, AdditiveBlending } from 'three'

import vertexShader from './shaders/sphere/vertex.glsl'
import fragmentShader from './shaders/sphere/fragment.glsl'

const settings = {
  frequency: 0,
  amplitude: 0,
  speed: 0.2,
  density: 1.5,
  strength: 0.2,
  intensity: 7.0,
}

class SphereMaterial extends ShaderMaterial {
  constructor() {
    super({
      wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
        uSpeed: { value: settings.speed },
        uIntensity: { value: settings.intensity },
        uNoiseDensity: { value: settings.density },
        uNoiseStrength: { value: settings.strength },
      },
      // blending: AdditiveBlending,
      vertexShader,
      fragmentShader,
    })
  }
}

export default SphereMaterial
