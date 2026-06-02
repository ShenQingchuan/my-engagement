<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// @ts-ignore
import bgImg from '../animal-island-vue/assets/img/animalisland_1440_2560.JPG'

const subtitleRef = ref<HTMLElement>()
const scrollHintRef = ref<HTMLElement>()
const rockRef = ref<HTMLElement>()

let triggers: ScrollTrigger[] = []

onMounted(() => {
  const tl = gsap.timeline()
  tl.from('.hero-title__line', {
    y: -100,
    opacity: 0,
    duration: 1.4,
    ease: 'elastic.out(1, 0.5)',
    stagger: 0.2,
  })
    .from(subtitleRef.value!, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.6')
    .from(scrollHintRef.value!, {
      opacity: 0,
      y: 20,
      duration: 0.8,
    }, '-=0.4')
    .from(rockRef.value!, {
      y: 200,
      rotation: -15,
      opacity: 0,
      duration: 1.2,
      ease: 'back.out(1.7)',
      clearProps: 'transform,opacity',
    }, '-=1')

  // 视差改用 CSS，零 JS 开销，移动端更流畅
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section class="hero-section">
    <div class="hero-bg" :style="{ backgroundImage: `url(${bgImg})` }">
      <img ref="rockRef" src="/assets/插图/摇摇马.png" alt="摇摇马" class="hero-deco hero-deco--rock" />
    </div>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="hero-title__line">给 Crazy 岛主 lazy</span>
        <span class="hero-title__line">的一封情书</span>
      </h1>
      <p ref="subtitleRef" class="hero-subtitle">致我最爱的琳琳</p>
      <div ref="scrollHintRef" class="scroll-hint">
        <span class="scroll-hint__text">向下滑动</span>
        <span class="scroll-hint__arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-bg {
  position: absolute;
  inset: -15% 0;          /* 预留溢出空间，滚出去不露白 */
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
}
.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 24px;
  margin-top: -20vh;
}
.hero-title {
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2px 10px rgba(0,0,0,0.15), 0 4px 24px rgba(0,0,0,0.1);
  line-height: 1.15;
  margin-bottom: 20px;
}
.hero-title__line {
  display: block;
}
.hero-subtitle {
  font-size: clamp(1rem, 4.5vw, 1.35rem);
  color: #fff;
  text-shadow: 0 1px 6px rgba(0,0,0,0.15);
  margin-bottom: 64px;
  font-weight: 500;
}
.scroll-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  animation: bounce-hint 2.2s infinite ease-in-out;
}
.scroll-hint__text {
  font-family: 'Zen Maru Gothic', sans-serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0,0,0,0.15);
  letter-spacing: 2px;
}
.scroll-hint__arrow {
  display: block;
  animation: bounce-arrow 2.2s infinite ease-in-out;
}
.hero-deco--rock {
  position: absolute;
  bottom: 40px;
  right: -5vw;
  width: 35vw;
  max-width: 200px;
  z-index: 3;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  pointer-events: none;
}
@keyframes bounce-hint {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
@keyframes bounce-arrow {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.5; }
}
</style>
