import { TimelineLite as Timeline,Back } from 'gsap';

window.loadPromise = new Promise(resolve => {
  window.addEventListener('DOMContentLoaded', resolve)
})

export const play = (node, appears) => {
  const timeline = new Timeline({ paused: false });

  timeline
    .from(node, 0.6, {xPercent: -100})
    .from(node, 1, {scale:0.7,ease: Back.easeOut})

  return timeline;
}

export const exit = (node,appears) => {
  const timeline = new Timeline({ paused: true });

  timeline
    .from(node, 0.6, {scale:0.7,ease: Back.easeOut})
    .from(node, 1, {xPercent: 100})
    
  return timeline
  
}
