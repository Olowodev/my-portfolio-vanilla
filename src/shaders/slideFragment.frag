varying vec2 vUv;
precision mediump float;
uniform vec3 uColor;
uniform float uTime;
uniform sampler2D uTexture;
varying float vWave;
uniform vec3 uMouse;
varying vec3 vPosition;
uniform vec3 uPosition;


float map(float value, float min1, float max1, float min2, float max2) {
        return min2 + (value - min1) * (max2 - min2) / (max1 - min1);
}


void main() {
    


    // vec3 texture = texture2D(uTexture, vUv).rgb;
    // gl_FragColor = vec4(texture, 1.);
    float dist = length((uPosition + vPosition) - uMouse);
    float prox = 1. - map( dist, 0., 0.11, 0., 1.);
    prox = clamp(prox, 0., 1.);
    vec2 zoomedUV = mix(vUv, uMouse.xy + vec2(0.5), prox * 0.36);
    vec4 imgColor = texture2D(uTexture, zoomedUV);
    gl_FragColor = imgColor;
}