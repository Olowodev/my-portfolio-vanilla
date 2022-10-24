#define PI 3.1415926535897932384626433832795

varying vec2 vUv;
precision mediump float;
uniform float uTime;
varying float vWave;
varying vec3 vPosition;
uniform int uHover;
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() {
    vUv = uv;
    vPosition = position;
    vec3 pos = position;

    if (uHover == 1) {
    float noiseFreq = 2.5;
    float noiseAmp = 0.55;
    vec3 nosiePos = vec3(pos.x * noiseFreq + uTime, pos.y, pos.z);
    pos.z += snoise3(nosiePos) * noiseAmp;

    vec4 newPosition = modelViewMatrix * vec4(pos, 1.0);

    newPosition.z += sin(newPosition.x * PI + 1.5 );
    gl_Position = projectionMatrix * newPosition;
    } else {
        vec4 newPosition = modelViewMatrix * vec4(pos, 1.0);

        newPosition.z += sin(newPosition.x * PI + 1.5 );
        gl_Position = projectionMatrix * newPosition;
    }
    //gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);


    //vec4 mvPosition = modelViewMatrix * vec4( position, 1. ); 

    //needed for particles
    //gl_PointSize = 50. * ( 1. / - mvPosition.z );

    //gl_PointSize = size*10. ;
    //gl_Position = projectionMatrix * mvPosition;
}