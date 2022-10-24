varying vec2 vUv;
precision mediump float;
uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;
varying float vWave;

void main() {
    float wave = vWave * 0.1;
    vec3 texture = texture2D(uTexture, vUv + wave).rgb;
    gl_FragColor = vec4(texture,1.);
}