varying vec2 vUv;
precision mediump float;
uniform float uTime;
varying float vWave;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() {
    vUv = uv;

    vec3 pos = position;
    float noiseFreq = 2.5;
    float noiseAmp = 0.55;
    vec3 nosiePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise3(nosiePos) * noiseAmp;
    vWave = pos.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );


    //vec4 mvPosition = modelViewMatrix * vec4( position, 1. ); 

    //needed for particles
    //gl_PointSize = 50. * ( 1. / - mvPosition.z );

    //gl_PointSize = size*10. ;
    //gl_Position = projectionMatrix * mvPosition;
}