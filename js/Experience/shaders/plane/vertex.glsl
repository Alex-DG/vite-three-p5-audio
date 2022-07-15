uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;
uniform float uSpeed;
uniform float uFreqStrength;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0); 

  vec2 frequency = vec2(uFrequency / uFreqStrength, uFrequency / uFreqStrength);

  float t = uTime * uSpeed; //clamp(uAmplitude, 0.0, 0.05);
  float elevation = sin(modelPosition.x * frequency.x - t) * 0.1;
  elevation += sin(modelPosition.y * frequency.y - t) * 0.1;

  // modelPosition.x += elevation * 1.0;
  modelPosition.z += elevation * 1.0;
  modelPosition.x += elevation * 0.5;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}
