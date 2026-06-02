<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
// @ts-ignore
import cursorImg from '../animal-island-vue/assets/img/cursor/cursor-icon.png'
import { Icon } from '../animal-island-vue'
import type { IconName } from '../animal-island-vue'

// ── refs ──────────────────────────────────────────────────────────────────
const sectionRef = ref<HTMLElement>()
const phoneWrapRef = ref<HTMLElement>()
const cursorRef = ref<HTMLElement>()
const hintRef = ref<HTMLElement>()
const suitcaseRef = ref<HTMLElement>()
const carouselRef = ref<HTMLElement>()

let tlInstance: gsap.core.Timeline | null = null
let autoPlayTimer: ReturnType<typeof setInterval> | null = null

// ── state ──────────────────────────────────────────────────────────────────
const carouselVisible = ref(false)
const currentIndex = ref(0)

// ── swipe ──────────────────────────────────────────────────────────────────
let touchStartX = 0
let touchStartY = 0

function onTouchStart(e: TouchEvent) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e: TouchEvent) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
    if (autoPlayTimer) { clearInterval(autoPlayTimer); autoPlayTimer = null }
    const next = dx < 0
      ? Math.min(currentIndex.value + 1, slides.length - 1)
      : Math.max(currentIndex.value - 1, 0)
    if (next !== currentIndex.value) slideTo(next)
  }
}

// ── phone apps ──────────────────────────────────────────────────────────────
interface AppDef { id: string; name: IconName; color: string; hasNewMessage: boolean }
const apps: AppDef[] = [
  { id: 'camera',      name: 'icon-camera',      color: '#B77DEE', hasNewMessage: true  },
  { id: 'miles',       name: 'icon-miles',        color: '#889DF0', hasNewMessage: false },
  { id: 'critterpedia',name: 'icon-critterpedia', color: '#F7CD67', hasNewMessage: false },
  { id: 'diy',         name: 'icon-diy',          color: '#E59266', hasNewMessage: false },
  { id: 'design',      name: 'icon-design',       color: '#F8A6B2', hasNewMessage: false },
  { id: 'map',         name: 'icon-map',          color: '#82D5BB', hasNewMessage: true  },
  { id: 'variant',     name: 'icon-variant',      color: '#8AC68A', hasNewMessage: false },
  { id: 'helicopter',  name: 'icon-helicopter',   color: '#FC736D', hasNewMessage: false },
  { id: 'chat',        name: 'icon-chat',         color: '#D1DA49', hasNewMessage: false },
]

// ── slides data ────────────────────────────────────────────────────────────


interface CitySlide { type: 'city'; name: string; image: string; quote: string }
interface PassportSlide { type: 'passport' }
interface LoveSlide { type: 'love' }
type Slide = PassportSlide | CitySlide | LoveSlide

const slides: Slide[] = [
  { type: 'city', name: '成都',   image: '/assets/城市/成都.png',   quote: '因这上天赐的良缘，我有幸与你相识相知' },
  { type: 'city', name: '深圳',   image: '/assets/城市/深圳.png',   quote: '第一次和你在这座城市详见、深圳湾的晚霞是我的初恋印记' },
  { type: 'city', name: '广州',   image: '/assets/城市/广州.png',   quote: '在广州两年、恭喜你顺利毕业开启无限可能的自由人生' },
  { type: 'city', name: '长沙',   image: '/assets/城市/长沙.png',   quote: '和你一起和茶颜悦色、和你一起爬岳麓山光橘子洲，什么时候都想和你在一起' },
  { type: 'city', name: '大理',   image: '/assets/城市/大理.png',   quote: '第一次来的时候听苍山流水潺潺，心旷神怡。第二次来时洱海的风在耳边吹过，带走了烦恼。' },
  { type: 'city', name: '川西',   image: '/assets/城市/川西.png',   quote: '雪山之下，草甸之上，世界只剩下我们两个人' },
  { type: 'city', name: '昆明',   image: '/assets/城市/昆明.png',   quote: '还记得滇池的海鸥吗？春城的花开，不及琳琳你笑颜的万分之一' },
  { type: 'city', name: '香港',   image: '/assets/城市/香港.png',   quote: '你带我吃红茶餐厅、教我讲粤语，感觉好想和你谈了一场港风恋爱' },
  { type: 'city', name: '上海',   image: '/assets/城市/上海.png',   quote: '我好后悔那一次离开你，去上海工作，在上海没有遇见更好的自己。' },
  { type: 'city', name: '东京',   image: '/assets/城市/东京.png',   quote: '第一次出国，万事好新奇，到处拍照，但是最想拍的还是你' },
  { type: 'city', name: '京都',   image: '/assets/城市/京都.png',   quote: '和你一起漫步鸭川纳凉，逛了好多神社，还祝自己变成美人' },
  { type: 'city', name: '大阪',   image: '/assets/城市/大阪.png',   quote: '我去环球影城当马里奥，而你穿着背带裤cos小黄人' },
  { type: 'city', name: '奈良',   image: '/assets/城市/奈良.png',   quote: '喂了好多黏人的小鹿，和你一起看若草山的日落真的好幸福' },
  { type: 'city', name: '重庆',   image: '/assets/城市/重庆.png',   quote: '多亏了你的安排，让两位妈妈在重庆和我们一起开开心心吃喝玩耍' },
  { type: 'city', name: '北海道', image: '/assets/城市/北海道.png', quote: '谢谢你凌晨叫醒，让我第一次看到雪。我无比留恋和你一起漫步在北海道的大雪里' },
]

// ── carousel ───────────────────────────────────────────────────────────────
// ── 层叠切换方向 ───────────────────────────────────────────────────────────
const slideDirection = ref<'forward' | 'back'>('forward')

function slideTo(index: number) {
  if (index === currentIndex.value) return
  slideDirection.value = index > currentIndex.value ? 'forward' : 'back'
  currentIndex.value = index
}

function onCardLeave(el: Element, done: () => void) {
  const dir = slideDirection.value
  gsap.to(el, {
    x: dir === 'forward' ? '-115%' : '115%',
    rotation: dir === 'forward' ? -8 : 8,
    scale: 0.82,
    opacity: 0,
    duration: 0.42,
    ease: 'power2.in',
    zIndex: 1,
    onComplete: done,
  })
}

function onCardEnter(el: Element, done: () => void) {
  const dir = slideDirection.value
  gsap.fromTo(el,
    {
      x: dir === 'forward' ? '22%' : '-22%',
      y: 28,
      scale: 0.86,
      rotation: dir === 'forward' ? 6 : -6,
      opacity: 0,
      zIndex: 2,
    },
    {
      x: 0, y: 0, scale: 1, rotation: 0, opacity: 1,
      duration: 0.52,
      ease: 'back.out(1.5)',
      onComplete: done,
    }
  )
}

function startCarousel() {
  carouselVisible.value = true
  nextTick(() => {
    gsap.to(phoneWrapRef.value!, { y: -150, opacity: 0, scale: 0.75, duration: 0.55, ease: 'power2.in' })
    gsap.to(hintRef.value!, { opacity: 0, duration: 0.35 })
    gsap.fromTo(carouselRef.value!,
      { opacity: 0, y: 50, scale: 0.88 },
      { opacity: 1, y: 0, scale: 1, duration: 0.65, delay: 0.45, ease: 'back.out(1.4)' }
    )
  })
}

// ── main timeline ──────────────────────────────────────────────────────────
onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 55%',
      toggleActions: 'play none none none',
      once: true,
    },
  })
  tlInstance = tl

  // 手机直接显示，不做入场动画
  // 装饰物直接出现
  tl.from(hintRef.value!, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)
  tl.from(suitcaseRef.value!, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0)

  // ScrollTrigger 触发后短暂停顿，光标从图标下方弧线锁定
  const targetApp = phoneWrapRef.value!.querySelector('.phone__app--target') as HTMLElement | null
  if (targetApp && cursorRef.value && phoneWrapRef.value) {
    const phoneRect = phoneWrapRef.value.getBoundingClientRect()
    const targetRect = targetApp.getBoundingClientRect()
    const offsetX = targetRect.left - phoneRect.left + targetRect.width / 2
    const offsetY = targetRect.top - phoneRect.top + targetRect.height / 2 + 16

    tl.set(cursorRef.value!, { x: offsetX + 30, y: offsetY + 80, opacity: 0, scale: 1 })
    tl.to(cursorRef.value!, { x: offsetX, y: offsetY, opacity: 1, duration: 0.65, ease: 'power3.out' }, '+=0.3')

    // 点击
    tl.to(cursorRef.value!, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 })
    tl.to(targetApp, { scale: 0.85, duration: 0.08, yoyo: true, repeat: 1 }, '<')

    tl.call(startCarousel)
  }
})

onUnmounted(() => {
  if (tlInstance) tlInstance.kill()
  if (autoPlayTimer) clearInterval(autoPlayTimer)
})
</script>

<template>
  <section ref="sectionRef" class="phone-section">
    <div class="phone-section__inner">
      <p ref="hintRef" class="phone-hint">翻开我们的旅行护照</p>

      <!-- stage：手机和轮播共用同一区域 -->
      <div class="stage">
      <div ref="phoneWrapRef" class="phone-wrap">
        <div class="phone">
          <div class="phone__inner">
            <div class="phone__statusbar">
              <div class="phone__topbar">
                <span class="phone__icon phone__icon--wifi" />
                <div class="phone__time">2:21<span class="phone__blink">:</span>PM</div>
                <span class="phone__icon phone__icon--loc" />
              </div>
              <div class="phone__welcome">Welcome!</div>
            </div>
            <div class="phone__grid">
              <div
                v-for="(app, i) in apps"
                :key="app.id"
                class="phone__app"
                :class="{ 'phone__app--target': i === 1 }"
                :style="{ backgroundColor: app.color }"
              >
                <span v-if="app.hasNewMessage" class="phone__badge" />
                <Icon :name="app.name" :size="36" />
              </div>
            </div>
            <div class="phone__pageindicator">
              <span class="phone__icon phone__icon--page" />
            </div>
          </div>
        </div>
        <img ref="cursorRef" :src="cursorImg" alt="cursor" class="cursor-hand" />
        <div ref="rippleRef" class="ripple" />
      </div>

      <!-- 轮播（绝对覆盖 stage） -->
      <div v-if="carouselVisible" ref="carouselRef" class="carousel">
        <div class="carousel__viewport" @touchstart="onTouchStart" @touchend="onTouchEnd">
          <!-- 层叠切：新旧两张卡同时在 DOM，GSAP 分别控制进出 -->
          <Transition :css="false" @leave="onCardLeave" @enter="onCardEnter">
            <div :key="currentIndex" class="carousel__card">
              <div class="card card--city">
                <div class="card__img-wrap">
                  <img :src="(slides[currentIndex] as CitySlide).image" :alt="(slides[currentIndex] as CitySlide).name" class="card__img" />
                  <span class="card__city-name">{{ (slides[currentIndex] as CitySlide).name }}</span>
                </div>
                <p class="card__quote">{{ (slides[currentIndex] as CitySlide).quote }}</p>
              </div>
            </div>
          </Transition>
        </div>

        <!-- 导航点 -->
        <div class="carousel__dots">
          <button
            v-for="(_, i) in slides"
            :key="i"
            class="carousel__dot"
            :class="{ 'carousel__dot--active': i === currentIndex }"
            @click="slideTo(i)"
          />
        </div>
      </div>

      </div><!-- /stage -->

      <img ref="suitcaseRef" src="/assets/插图/旅行箱.png" alt="旅行箱" class="suitcase-deco" />
      <img src="/assets/插图/玩具箱.png" alt="玩具箱" class="toybox-deco" />
    </div>
  </section>
</template>

<style scoped>
/* ── section ─────────────────────────────────────────────────────────────── */
.phone-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 0;
}
.phone-section__inner {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
}

/* ── stage ───────────────────────────────────────────────────────────────── */
.stage {
  position: relative;
  width: min(94vw, 460px);
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.phone-hint {
  font-family: 'Noto Sans SC', 'Zen Maru Gothic', sans-serif;
  font-size: clamp(1.3rem, 5vw, 1.8rem);
  color: #fff;
  text-shadow: 0 2px 8px rgba(0,0,0,0.15);
  margin-bottom: 40px;
  font-weight: 700;
  letter-spacing: 2px;
  text-align: center;
}

/* ── phone ───────────────────────────────────────────────────────────────── */
.phone-wrap {
  position: relative;
}
.phone {
  position: relative;
  width: 280px;
  height: 520px;
  border-radius: 42px;
  overflow: hidden;
  background: #f8f4e8;
  box-shadow: 0 20px 60px rgba(0,0,0,0.25), 0 8px 24px rgba(0,0,0,0.15);
  border: 4px solid #e8e0d0;
}
.phone__inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  background: #f8f4e8;
}
.phone__statusbar { text-align: center; width: 100%; padding: 0 28px 16px; }
.phone__topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #dddbcc;
  font-weight: 800;
  letter-spacing: 1px;
  font-family: 'Nunito', sans-serif;
}
.phone__time { display: flex; align-items: baseline; }
.phone__blink { animation: blink 1s steps(1) infinite; }
.phone__welcome {
  font-size: 24px;
  font-weight: 800;
  margin-top: 8px;
  color: #725c4e;
  letter-spacing: 1px;
  font-family: 'Nunito', sans-serif;
}
.phone__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  padding: 8px 16px;
  padding-top: 24px;
  flex: 1;
  align-items: center;
  justify-content: center;
  align-content: start;
}
.phone__app {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 20px;
  transition: transform 0.2s;
}
.phone__app--target { box-shadow: 0 0 0 3px rgba(136,157,240,0.5); }
.phone__badge {
  position: absolute;
  top: -2px; left: -2px;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: #ff544a;
  border: 3px solid #f8f4e8;
}
.phone__pageindicator { display: flex; justify-content: center; margin-top: 16px; padding-bottom: 20px; }
.phone__icon { display: inline-block; }
.phone__icon--wifi   { width: 36px; height: 14px; background: url('../animal-island-vue/assets/img/icons/wifi.svg') center / contain no-repeat; }
.phone__icon--loc    { width: 16px; height: 16px; background: url('../animal-island-vue/assets/img/icons/location.svg') center / contain no-repeat; }
.phone__icon--page   { width: 32px; height: 16px; background: url('../animal-island-vue/assets/img/icons/page.svg') center / contain no-repeat; }

.cursor-hand {
  position: absolute; top: 0; left: 0;
  width: 54px; height: 47px;
  z-index: 10;
  opacity: 0;
  filter: drop-shadow(0 2px 6px rgba(0,0,0,0.2));
  pointer-events: none;
}
.ripple {
  position: absolute;
  width: 48px; height: 48px;
  border-radius: 50%;
  background: rgba(136,157,240,0.4);
  pointer-events: none;
  z-index: 5;
}

/* ── carousel ────────────────────────────────────────────────────────────── */
.carousel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.carousel__viewport {
  width: min(90vw, 440px);
  /* grid 单格叠放：过渡时新旧卡都在同一格，容器高度由内容撑开 */
  display: grid;
}
.carousel__card {
  grid-area: 1 / 1;
  width: min(90vw, 440px);
  will-change: transform;
}

/* ── cards ───────────────────────────────────────────────────────────────── */
.card {
  background: #f8f4e8;
  border-radius: 24px;
  border: 3px solid #e8e0d0;
  box-shadow: 0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1);
  overflow: hidden;
  height: 440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 28px 24px;
}

/* passport */
.card--passport {
  background: linear-gradient(145deg, #eef0f8 0%, #e8e8f5 100%);
  gap: 20px;
}
.card__title {
  font-family: 'Nunito', 'Noto Sans SC', sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: #725c4e;
  letter-spacing: 3px;
  text-align: center;
  margin: 0;
}
.card__stamps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
.card__stamp {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.6);
  border: 2px dashed rgba(114,92,78,0.25);
  font-size: 26px;
}
.card__sub {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  color: #9a835a;
  letter-spacing: 1px;
  margin: 0;
}

/* city */
.card--city { padding: 0; }
.card__img-wrap {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 340px;
  overflow: hidden;
  flex-shrink: 0;
}
.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.card__city-name {
  padding: 0.25rem;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25rem;
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Nunito', 'Noto Sans SC', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  color: black;
  letter-spacing: 2px;
}
.card__quote {
  padding: 20px 20px 24px;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.88rem;
  color: #725c4e;
  letter-spacing: 1px;
  text-align: center;
  margin: 0;
  display: flex;
  align-items: center;
}

/* love */
.card--love {
  background: linear-gradient(145deg, #fff0f0 0%, #fde8e8 100%);
  gap: 2px;
  padding: 24px 20px;
}
.card__heart { margin-bottom: 8px; filter: drop-shadow(0 4px 10px rgba(252,115,109,0.3)); }
.card__love-line {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.85rem;
  color: #725c4e;
  letter-spacing: 1px;
  text-align: center;
  margin: 0;
}

/* dots */
.carousel__dots {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 240px;
}
.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.4);
  cursor: pointer;
  padding: 0;
  transition: background 0.2s, transform 0.2s;
}
.carousel__dot--active {
  background: #fff;
  transform: scale(1.3);
}

/* ── suitcase ────────────────────────────────────────────────────────────── */
.suitcase-deco {
  position: absolute;
  bottom: 0vh;
  right: -9vw;
  transform: rotateY(180deg);
  width: 40vw; max-width: 220px;
  z-index: 3;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  pointer-events: none;
}
.toybox-deco {
  position: absolute;
  top: 4vh; right: -6vw;
  width: 32vw; max-width: 170px;
  z-index: 3;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.15));
  pointer-events: none;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
