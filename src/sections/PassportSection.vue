<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement>()
const titleRef = ref<HTMLElement>()
const stampRefs = ref<HTMLElement[]>([])
const juiceRef = ref<HTMLElement>()
const toyRef = ref<HTMLElement>()

let triggers: ScrollTrigger[] = []

const stamps = ['✈️', '🗾', '🏔️', '🌸', '🐼', '🌶️']

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 65%',
      toggleActions: 'play none none none',
      once: true,
    },
  })

  tl.from(titleRef.value!, {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power2.out',
  })

  tl.from(stampRefs.value, {
    scale: 3,
    opacity: 0,
    rotation: gsap.utils.random(-30, 30),
    duration: 0.5,
    stagger: 0.15,
    ease: 'back.out(2)',
  }, '-=0.5')

  tl.from(juiceRef.value!, {
    x: -100,
    rotation: -20,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(1.7)',
  }, '-=0.6')

  tl.from(toyRef.value!, {
    x: 100,
    rotation: 20,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(1.7)',
  }, '-=0.7')
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="passport-section">
    <div class="passport-section__inner">
      <h2 ref="titleRef" class="passport-title">我们的足迹</h2>
      <div class="passport-stamps">
        <span
          v-for="(stamp, i) in stamps"
          :key="i"
          ref="stampRefs"
          class="stamp"
          :style="{ transform: `rotate(${Math.random() * 40 - 20}deg)` }"
        >
          {{ stamp }}
        </span>
      </div>
      <img ref="juiceRef" src="/assets/插图/果汁罐.png" alt="果汁罐" class="deco deco--juice" />
      <img ref="toyRef" src="/assets/插图/玩具箱.png" alt="玩具箱" class="deco deco--toy" />
    </div>
  </section>
</template>

<style scoped>
.passport-section {
  position: relative;
  min-height: 50dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.passport-section__inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
}
.passport-title {
  font-family: 'Noto Sans SC', 'Zen Maru Gothic', sans-serif;
  font-size: clamp(1.6rem, 6vw, 2.2rem);
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-weight: 700;
  letter-spacing: 4px;
  margin-bottom: 32px;
  text-align: center;
}
.passport-stamps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  max-width: 320px;
}
.stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(4px);
  border: 2px dashed rgba(255,255,255,0.4);
  font-size: 28px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}
.deco {
  position: absolute;
  pointer-events: none;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
}
.deco--juice {
  bottom: 5vh;
  left: -6vw;
  width: 28vw;
  max-width: 160px;
}
.deco--toy {
  top: 10vh;
  right: -6vw;
  width: 30vw;
  max-width: 170px;
}
</style>
