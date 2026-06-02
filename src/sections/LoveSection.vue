<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const heartRef = ref<HTMLElement>()
const lineRefs = ref<HTMLElement[]>([])
const wallPlantRef = ref<HTMLElement>()
const breadRef = ref<HTMLElement>()

const loveLines = [
  '我们的相遇概率是千万分之一',
  '但或许这就是命中注定！',
  '',
  '我会努力做好一个靠谱的人。',
  '我会是一个一生敬你爱你的好丈夫。',
  '我是一颗你可以依靠的大树🌲',
  '',
  '我想继续和你走过更多地方',
  '和你一起环游世界🌍',
  '去看遍这世界的美好🌈',
]

let triggers: ScrollTrigger[] = []

onMounted(() => {
  // 爱心跳动
  gsap.to(heartRef.value!, {
    scale: 1.15,
    duration: 0.8,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  })

  // 文字逐行浮现
  lineRefs.value.forEach((line, i) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: line,
        start: 'top 85%',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    tl.from(line, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
      delay: i === 0 ? 0.2 : 0,
    })

    triggers.push(tl.scrollTrigger!)
  })

  // 装饰物
  gsap.from(wallPlantRef.value!, {
    y: 80,
    rotation: -10,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: wallPlantRef.value,
      start: 'top 85%',
      once: true,
    },
  })

  gsap.from(breadRef.value!, {
    y: 80,
    rotation: 10,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: breadRef.value,
      start: 'top 85%',
      once: true,
    },
  })
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section class="love-section">
    <div class="love-section__inner">
      <div ref="heartRef" class="love-heart">
        <svg viewBox="0 0 64 64" width="64" height="64">
          <path
            d="M32 56 C 8 40, 4 22, 16 14 C 24 9, 30 14, 32 20 C 34 14, 40 9, 48 14 C 60 22, 56 40, 32 56 Z"
            fill="#fc736d"
            stroke="#725d42"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <ellipse cx="22" cy="22" rx="3.5" ry="5" fill="#fff" opacity="0.7" transform="rotate(-25 22 22)" />
        </svg>
      </div>

      <div class="love-poem">
        <p
          v-for="(line, i) in loveLines"
          :key="i"
          ref="lineRefs"
          class="love-line"
          :class="{ 'love-line--empty': !line }"
        >
          {{ line || '\u00A0' }}
        </p>
      </div>

      <img ref="wallPlantRef" src="/assets/插图/壁挂盆栽架.png" alt="壁挂盆栽" class="deco deco--wallplant" />
      <img ref="breadRef" src="/assets/插图/面包机.png" alt="面包机" class="deco deco--bread" />
      <img src="/assets/插图/果汁罐.png" alt="果汁罐" class="deco deco--juice" />
    </div>
  </section>
</template>

<style scoped>
.love-section {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.love-section__inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
}
.love-heart {
  margin-bottom: 40px;
  filter: drop-shadow(0 4px 12px rgba(252,115,109,0.3));
}
.love-poem {
  text-align: center;
  max-width: 340px;
}
.love-line {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: clamp(1rem, 4.5vw, 1.2rem);
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.12);
  line-height: 2;
  letter-spacing: 2px;
  font-weight: 500;
}
.love-line--empty {
  line-height: 1;
  height: 0.5em;
}
.deco {
  position: absolute;
  pointer-events: none;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
}
.deco--wallplant {
  top: 5vh;
  right: -6vw;
  width: 30vw;
  max-width: 160px;
}
.deco--bread {
  bottom: 10vh;
  left: -6vw;
  width: 28vw;
  max-width: 150px;
}
.deco--juice {
  bottom: 8vh;
  right: -5vw;
  width: 26vw;
  max-width: 140px;
}
</style>
