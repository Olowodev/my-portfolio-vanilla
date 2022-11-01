// import {gsap} from 'gsap'
// import highway from '@dogstudio/highway'

// export default class Expand extends highway.Transition {
//     out({from, done}){
//         const elements = from.getElementsByTagName('*')
//         const tl = gsap.timeline({onComplete: done}) 
//         for (let i = 0; i < elements.length; i++) {
//             console.log(i)
//             if (i != 26 && i !==27 && i !==28 && i !==29 && i !==30 && i !==31 && i !==32 && i !==33) {
//                 tl.to(elements[i], {opacity: 0, duration: 1}, 0)
//             }
//         }


//     }

//     in({from, to, done}){
//         const elements = from.getElementsByTagName('*')
//         for (let i = 0; i < elements.length; i++) {
//             console.log(i)
//             if (i != 26 && i !==27 && i !==28 && i !==29 && i !==30 && i !==31 && i !==32 && i !==33) {
//                 elements[i].remove()
//             }
//         }

//         gsap.timeline({onComplete: done})
//         .fromTo(to, {opacity: 0}, {opacity: 1, duration: 1})
//     }
// }