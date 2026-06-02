<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Cursor, Loading, Modal, Button } from './animal-island-vue'
import HeroSection from './sections/HeroSection.vue'
import PhoneSection from './sections/PhoneSection.vue'
import ClosingSection from './sections/ClosingSection.vue'
import FloatingPetals from './components/FloatingPetals.vue'
import LoveSection from './sections/LoveSection.vue'

gsap.registerPlugin(ScrollTrigger)

type Phase = 'modal' | 'loading' | 'content'
const phase = ref<Phase>('modal')
const modalOpen = ref(true)

// 城市图片预加载：loading 期间并发拉取，浏览器缓存后 carousel 展示时秒出
const CITY_IMAGES = [
  '/assets/城市/成都.png', '/assets/城市/深圳.png', '/assets/城市/广州.png',
  '/assets/城市/长沙.png', '/assets/城市/大理.png', '/assets/城市/川西.png',
  '/assets/城市/昆明.png', '/assets/城市/香港.png', '/assets/城市/上海.png',
  '/assets/城市/东京.png', '/assets/城市/京都.png', '/assets/城市/大阪.png',
  '/assets/城市/奈良.png', '/assets/城市/重庆.png', '/assets/城市/北海道.png',
]

function preloadImages(urls: string[]) {
  urls.forEach(src => { const img = new Image(); img.src = src })
}

function handleStart() {
  modalOpen.value = false
  phase.value = 'loading'
  preloadImages(CITY_IMAGES)
  setTimeout(() => { phase.value = 'content' }, 2000)
}

// 内容出现时：从中心 iris-open 展开
function onContentEnter(el: Element, done: () => void) {
  gsap.fromTo(el,
    { clipPath: 'circle(0% at 50% 50%)' },
    {
      clipPath: 'circle(150% at 50% 50%)',
      duration: 2.75,
      ease: 'power2.out',
      clearProps: 'clipPath',
      onComplete: done,
    }
  )
}

onMounted(() => {
  ScrollTrigger.refresh()
})
onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <Modal
    v-model:open="modalOpen"
    title="发现咖妃遗落的信封！"
    :maskClosable="false"
    :typewriter="true"
    :typeSpeed="60"
  >
    里面会写些什么呢？会有给lazy的话吗？
    <template #footer>
      <Button type="primary" @click="handleStart">快读读看！</Button>
    </template>
  </Modal>

  <div v-if="phase === 'loading'" class="loading-overlay">
    <Loading :active="true" />
  </div>

  <!-- 内容从中心 iris-open 揭开 -->
  <Transition :css="false" @enter="onContentEnter">
    <div v-if="phase === 'content'" class="story-container">
      <FloatingPetals />
      <Cursor>
        <HeroSection />
        <PhoneSection />
        <LoveSection />
        <ClosingSection />
      </Cursor>
    </div>
  </Transition>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
}
.story-container {
  background: linear-gradient(180deg, #a8d5ba 0%, #8cc8a8 30%, #7bc4a6 100%);
}
</style>
