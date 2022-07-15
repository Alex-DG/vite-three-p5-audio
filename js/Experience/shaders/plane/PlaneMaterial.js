import { ShaderMaterial, Vector2 } from 'three'

import vertexShader from './vertex.glsl'
import fragmentShader from './fragment.glsl'

const settings = {
  frequency: 0,
  amplitude: 0,
  speed: 0,
  frequencyStrength: 9,
}

class PlaneMaterial extends ShaderMaterial {
  constructor(texture, textureSize, resolution) {
    super({
      // wireframe: true,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: texture },
        uSpeed: { value: settings.speed },
        uFrequency: { value: settings.frequency },
        uAmplitude: { value: settings.amplitude },
        uFreqStrength: { value: settings.frequencyStrength },
        uResolution: { value: resolution },
        uTextureResolution: { value: textureSize },
      },
      // blending: AdditiveBlending,
      // transparent: true,
      vertexShader,
      fragmentShader,
    })
  }
}

export default PlaneMaterial
