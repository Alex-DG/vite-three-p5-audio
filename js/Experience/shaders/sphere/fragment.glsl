uniform float uTime;
uniform float uAmplitude;
uniform float uIntensity;

varying vec3 vNormal;
varying float vNoise;
varying float vDistort;
varying float vDisplacement;

/**
  * From: https://iquilezles.org/articles/palettes/?source=post_page---------------------------
  */
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
  vec3 color1 = vec3(vNoise + 0.8, 0.25, 1.0);

  // float distortion = vNormal.z * (uAmplitude + vDisplacement);

  // vec3 brightness = vec3(0.5, 0.5, 1.5);
  // vec3 contrast = vec3(0.5, 0.5, 1.5);
  // vec3 oscilation = vec3(1.0, 1.0, 1.0);
  // vec3 phase = vec3(0.0, 0.12, 1.21);

  // vec3 color2 = palette(
  //   distortion,
  //   brightness,
  //   contrast,
  //   oscilation,
  //   phase
  // );

  // vec3 finalColor = mix(color1, color2, sin(uTime * 0.001));

  float distort = vDistort * uIntensity;
  
  vec3 brightness = vec3(0.5, 0.5, 1.5);
  vec3 contrast = vec3(0.5, 0.5, 0.5);
  vec3 oscilation = vec3(1.0, 1.0, 1.0);
  vec3 phase = vec3(0.00, 0.33, 0.67);

  vec3 finalColor = palette(distort, brightness, contrast, oscilation, phase);

  // vec3 finalColor = mix(color1, color2, sin(uTime * 0.001));

  gl_FragColor = vec4(finalColor, 1.0);
}
