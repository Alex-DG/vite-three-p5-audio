uniform float uTime;

varying vec3 vNormal;
varying float vNoise;

/**
  * From: https://iquilezles.org/articles/palettes/?source=post_page---------------------------
  */
vec3 palette( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
  vec3 color1 = vec3(vNoise);
  // vec3 color1 = vec3(vNoise * 1.2, vNoise * 0.2, vNoise * 1.2);

  vec3 color2 = palette(
      vNormal.y,
      vec3(0.5, 0.5, 0.5),
      vec3(0.5, 0.5, 0.5),
      vec3(1.0, 1.0, 0.5),
      vec3(0.8, 0.9, 0.3)
  );

  vec3 finalColor = mix(color1, color2, sin(uTime * 0.001));

  gl_FragColor = vec4(finalColor, 1.0);
}