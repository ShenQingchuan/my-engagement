<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface City {
  name: string
  image: string
  quote: string
}

const cities: City[] = [
  { name: '香港', image: '/assets/城市/香港.png', quote: '维多利亚港的晚风里，第一次牵紧你的手' },
  { name: '东京', image: '/assets/城市/东京.png', quote: '浅草寺前的灯笼，照亮了我们共同的愿望' },
  { name: '京都', image: '/assets/城市/京都.png', quote: '千年古刹的钟声里，听见了心跳的回响' },
  { name: '北海道', image: '/assets/城市/北海道.png', quote: '雪国的白色世界里，你是唯一的色彩' },
  { name: '大理', image: '/assets/城市/大理.png', quote: '洱海的风吹过，带走了烦恼，留下了你' },
  { name: '大阪', image: '/assets/城市/大阪.png', quote: '道顿堀的霓虹下，我们的笑声比烟火更灿烂' },
  { name: '奈良', image: '/assets/城市/奈良.png', quote: '小鹿低头的一瞬间，像极了你害羞的模样' },
  { name: '成都', image: '/assets/城市/成都.png', quote: '火锅的热气里，看见了你红扑扑的脸蛋' },
  { name: '昆明', image: '/assets/城市/昆明.png', quote: '春城的花开了一季，不及你笑靥的万分之一' },
  { name: '重庆', image: '/assets/城市/重庆.png', quote: '山城的阶梯再陡，有你牵着就不觉得累' },
  { name: '长沙', image: '/assets/城市/长沙.png', quote: '橘子洲头的烟花，燃亮了整片夜空和眼底的你' },
  { name: '上海', image: '/assets/城市/上海.png', quote: '外滩的钟声敲响时，我知道我想和你走到最后' },
]

const cardRefs = ref<HTMLElement[]>([])
const mailboxRef = ref<HTMLElement>()
const plantRef = ref<HTMLElement>()

let triggers: ScrollTrigger[] = []

onMounted(() => {
  // 每张卡片滚动触发
  cardRefs.value.forEach((card, i) => {
    const isLeft = i % 2 === 0
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: 'top 82%',
        toggleActions: 'play none none none',
        once: true,
      },
    })

    tl.from(card, {
      x: isLeft ? -80 : 80,
      rotation: isLeft ? -6 : 6,
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: 'power3.out',
    })

    triggers.push(tl.scrollTrigger!)
  })

  // 装饰物
  gsap.from(mailboxRef.value!, {
    x: -80,
    rotation: -15,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: mailboxRef.value,
      start: 'top 85%',
      once: true,
    },
  })

  gsap.from(plantRef.value!, {
    x: 80,
    rotation: 15,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: plantRef.value,
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
  <section ref="sectionRef" class="cities-section">
    <div class="cities-section__inner">
      <div class="cities-list">
        <div
          v-for="(city, i) in cities"
          :key="city.name"
          ref="cardRefs"
          class="city-card"
          :class="{ 'city-card--left': i % 2 === 0, 'city-card--right': i % 2 === 1 }"
        >
          <div class="city-card__image-wrap">
            <img :src="city.image" :alt="city.name" class="city-card__image" loading="lazy" />
          </div>
          <div class="city-card__info">
            <h3 class="city-card__name">{{ city.name }}</h3>
            <p class="city-card__quote">{{ city.quote }}</p>
          </div>
        </div>
      </div>

      <img ref="mailboxRef" src="/assets/插图/邮筒.png" alt="邮筒" class="deco deco--mailbox" />
      <img ref="plantRef" src="/assets/插图/多肉盆栽.png" alt="多肉盆栽" class="deco deco--plant" />
    </div>
  </section>
</template>

<style scoped>
.cities-section {
  position: relative;
  overflow: hidden;
}
.cities-section__inner {
  position: relative;
  width: 100%;
  padding: 40px 20px 80px;
}
.cities-list {
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 420px;
  margin: 0 auto;
}
.city-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255,255,255,0.88);
  border-radius: 24px;
  padding: 20px 16px 24px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  backdrop-filter: blur(8px);
}
.city-card__image-wrap {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 16px;
  background: #f5f0e6;
}
.city-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}
.city-card__info {
  text-align: center;
}
.city-card__name {
  font-family: 'Noto Sans SC', 'Zen Maru Gothic', sans-serif;
  font-size: clamp(1.4rem, 5vw, 1.8rem);
  font-weight: 900;
  color: #725d42;
  margin-bottom: 8px;
  letter-spacing: 4px;
}
.city-card__quote {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: clamp(0.85rem, 3.5vw, 1rem);
  color: #8a7860;
  line-height: 1.7;
  letter-spacing: 1px;
}
.deco {
  position: absolute;
  pointer-events: none;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.12));
}
.deco--mailbox {
  top: 15vh;
  left: -8vw;
  width: 28vw;
  max-width: 150px;
}
.deco--plant {
  bottom: 20vh;
  right: -8vw;
  width: 26vw;
  max-width: 140px;
}
</style>
