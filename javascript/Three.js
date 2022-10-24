import * as THREE from 'three';
import fragment from '../shaders/fragment.frag'
import vertex from '../shaders/vertex.vert'
import slideFragment from '../shaders/slideFragment.frag'
import slideVertex from '../shaders/slideVertex.vert'
import test from '../media/test.webp'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll'
import abstract1 from '../media/abstract1.webp'
import abstract2 from '../media/abstract2.jpg'
import abstract3 from '../media/abstract3.jpg'
import abstract4 from '../media/abstract4.jpg'


const images = [abstract1, abstract2, abstract3, abstract4]

const meSection = document.getElementById('me')
const workSection = document.getElementById('work')
// init

const camera = new THREE.PerspectiveCamera( 8, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;
const workCamera = new THREE.PerspectiveCamera( 8, window.innerWidth / window.innerHeight, 0.1, 1000)
workCamera.position.z = 5

const scene = new THREE.Scene();
const workScene = new THREE.Scene();

const geometry = new THREE.PlaneGeometry( 0.6, 0.4, 16, 16 );
const workGeometry = new THREE.PlaneGeometry( 0.4, 0.4, 16, 16 );


const clock = new THREE.Clock()

//material to add shaders to mesh
const material = new THREE.ShaderMaterial({
    fragmentShader: fragment,
    vertexShader: vertex,
    uniforms: {
        uTime: {type: 'f', value: 0.0},
        uTexture: {value: new THREE.TextureLoader().load(test)},
        uResolution: {type: 'v4', value: new THREE.Vector4()}
    },
    side: THREE.DoubleSide
 });
 

//normalMesh
const mesh = new THREE.Mesh( geometry, material );

const meshes = []
for (let i = 0; i < 10; i++) {
    const workMaterial = new THREE.ShaderMaterial({
        fragmentShader: slideFragment,
        vertexShader: slideVertex,
        uniforms: {
            uTime: {type: 'f', value: 0.0},
            uMouse: {type: 'v3', value: new THREE.Vector3()},
            uHover: {type: 'i', value: 0},
            uTexture: {value: new THREE.TextureLoader().load(images[i])},
            uResolution: {type: 'v4', value: new THREE.Vector4()}
        },
        side: THREE.DoubleSide
     });
    const workMesh = new THREE.Mesh( workGeometry, workMaterial);
    meshes.push({
        workMesh,
        index: i,
    });
    workScene.add(workMesh)
}

let state = {
    x: 0
}


const updateMeshes = () => {
    meshes.forEach((o)=> {
        o.workMesh.material.uniforms.uTime.value = clock.getElapsedTime()
        o.workMesh.position.x = (0.5 * o.index + 1) + state.x
    })
}

scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
const workRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

renderer.setSize( meSection.offsetWidth, meSection.offsetHeight );
workRenderer.setSize(workSection.offsetWidth, workSection.offsetHeight);

renderer.setAnimationLoop( animation );
workRenderer.setAnimationLoop( workAnimation );

document.getElementById('work').appendChild( workRenderer.domElement );
document.getElementById('me').appendChild( renderer.domElement );

//resize
function resize() {
    const width = meSection.offsetWidth;
    const height = meSection.offsetHeight;
    renderer.setSize(width, height);
    workRenderer.setSize(width, height)
    camera.aspect = width / height
    workCamera.aspect = width / height

    //image cover
    const imageAspect = 851/1200;
    let a1; let a2;
    if (height/width > imageAspect) {
        a1 = (width/height) * imageAspect;
        a2 = 1;
    } else {
        a1 = 1;
        a2 = (height/width) / imageAspect;
    }

    material.uniforms.uResolution.value.x = width;
    material.uniforms.uResolution.value.y = height;
    material.uniforms.uResolution.value.z = a1;
    material.uniforms.uResolution.value.w = a2;


    meshes.forEach((o)=> {
        o.workMesh.material.uniforms.uResolution.value.x = width;
        o.workMesh.material.uniforms.uResolution.value.y = height;
        o.workMesh.material.uniforms.uResolution.value.z = a1;
        o.workMesh.material.uniforms.uResolution.value.w = a2;
    })
    


    camera.updateProjectionMatrix();
    workCamera.updateProjectionMatrix()
}

resize()

window.addEventListener('resize', resize)

// animation

function animation( time ) {
    material.uniforms.uTime.value = clock.getElapsedTime()
	renderer.render( scene, camera );
}

function workAnimation ( time ) {
    workRenderer.render(workScene, workCamera)
    updateMeshes()

}



gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".smooth-scroll"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".smooth-scroll", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
});

gsap.timeline( {
    scrollTrigger: {
        trigger: '#about',
        scroller: '.smooth-scroll',
        scrub: true,
        pin: true,
        start: 'top top',
        end: '+=100%'
    },
})
.to('#svg', {
    strokeDashoffset: 0,
    duration: 13
  })
  .to('#text', {
    y: -100,
    opacity: 0,
    duration: 5
  })
  .to('#svg', {
    opacity: 0,
    duration: 5
  })
  .to('#story', {
    y: -700,
    duration: 20
  });

  const tl = gsap.timeline(
    {
        scrollTrigger: {
          trigger: '#work',
          scroller: '.smooth-scroll',
          scrub: true,
          pin: true,
          start: 'center center',
          end: '+=100%',
        },
        defaults: {ease: 'none'}
      }
);
tl.to(state, {
  x: -2.5,
})

  const changeColorToWhite = (p) => {
    gsap.to(p, {color: 'white'})
  }
  const changeColorToGrey = (p) => {
    gsap.to(p, {color: 'rgba(255, 255, 255, 0.2)'})
  }

  locoScroll.on('scroll', () => {
    const div = gsap.getProperty('#story', 'y')
    console.log(div)
   let ps = gsap.utils.toArray('#p')
   console.log(ps)
     ps.forEach((p, i) => {
       if (div < (-355 - (75 * i))) {
         changeColorToWhite(p)
       } else if (div === 0) {
         changeColorToGrey(p)
       }
     })
  })

  
  




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();