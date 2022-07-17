uniform sampler2D uTexture;

uniform vec2 uTextureResolution;
uniform vec2 uResolution;

uniform float uTime;
uniform float uFrequency;
uniform float uAmplitude;

varying vec2 vUv;
varying float vElevation;

mat2 scale(vec2 _scale) {
  return mat2(_scale.x, 0.0, 0.0, _scale.y);
}

void main() {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uTextureResolution.x / uTextureResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uTextureResolution.y / uTextureResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  // uv.y = 1.0 - uv.y;

  float frequency = uFrequency;
  float amplitude = uAmplitude;
  float elevationPower = vElevation * 0.2;

  float distortion = sin(uv.y * frequency + (uTime * 0.01)) * amplitude + elevationPower;

  vec4 texture = texture2D(uTexture, uv + distortion);
  // texture.rgb *= vElevation * 2. + 1.25;
  
  gl_FragColor = texture;
}
