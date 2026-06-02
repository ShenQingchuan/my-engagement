<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// @ts-ignore
import brideAndGroomImg from '../animal-island-vue/components/WeddingInvitation/img/brideandgroom.PNG'

const sectionRef = ref<HTMLElement>()
const letterRef = ref<HTMLElement>()
const lineRefs = ref<HTMLElement[]>([])
const coupleRef = ref<HTMLElement>()
const stampRef = ref<HTMLElement>()

let triggers: ScrollTrigger[] = []

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 60%',
      toggleActions: 'play none none none',
      once: true,
    },
  })

  // 信纸浮现
  tl.from(letterRef.value!, {
    y: 100,
    opacity: 0,
    rotation: 3,
    duration: 1.1,
    ease: 'power3.out',
  })

  // 印章弹入
  tl.from(stampRef.value!, {
    scale: 0,
    rotation: -20,
    opacity: 0,
    duration: 0.5,
    ease: 'back.out(2)',
  }, '-=0.4')

  // 信件内容逐行浮现
  tl.from(lineRefs.value, {
    opacity: 0,
    x: -16,
    duration: 0.45,
    stagger: 0.1,
    ease: 'power2.out',
  }, '-=0.2')

  // 新人插图滑入
  tl.from(coupleRef.value!, {
    x: 80,
    opacity: 0,
    duration: 0.9,
    ease: 'back.out(1.3)',
  }, '-=0.8')

  // 新人轻浮
  gsap.to(coupleRef.value!, {
    y: -10,
    duration: 2.8,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.5,
  })
})

onUnmounted(() => {
  triggers.forEach(t => t.kill())
})
</script>

<template>
  <section ref="sectionRef" class="closing-section">
    <div class="closing-section__inner">

      <div ref="letterRef" class="letter">

        <!-- 信纸顶部装饰条 -->
        <div class="letter__header">
          <span class="letter__header-deco">✦</span>
          <span class="letter__header-title">写给 lazy 的信</span>
          <span class="letter__header-deco">✦</span>
        </div>

        <!-- 信纸正文 -->
        <div class="letter__body">

          <p ref="el => { if (el) lineRefs[0] = el as HTMLElement }" class="letter__greeting">
            亲爱的琳琳，
          </p>

          <p ref="el => { if (el) lineRefs[1] = el as HTMLElement }" class="letter__para">
            我从成都走来，到如今在深圳，<br />
            相处七年，我们仍是热恋。
          </p>

          <p ref="el => { if (el) lineRefs[2] = el as HTMLElement }" class="letter__para">
            我们一起走过风风雨雨，<br />
            还好身边仍是你。<br />
            每一座城市都是一个故事，<br />
            每一个故事都有你。
          </p>

          <p ref="el => { if (el) lineRefs[3] = el as HTMLElement }" class="letter__para">
            你说世界很大，想多去看看，<br />
            我说你去哪里我就去哪里，<br />
            有你的地方就是家。
          </p>

          <p ref="el => { if (el) lineRefs[4] = el as HTMLElement }" class="letter__date-line">
            这个周六，<span class="letter__date">2026年6月6日</span>，<br />
            要给我们的故事，翻开新的篇章~
          </p>

          <p ref="el => { if (el) lineRefs[5] = el as HTMLElement }" class="letter__para letter__para--emphasis">
            我挚爱的宝贝，<br />
            你愿意嫁给我吗？
          </p>

          <div ref="el => { if (el) lineRefs[6] = el as HTMLElement }" class="letter__sign">
            <span class="letter__sign-text">小兔头</span>
            <span class="letter__sign-sub">爱你一生一世</span>
          </div>

        </div>

        <!-- 印章 -->
        <div ref="stampRef" class="letter__stamp">
          <div class="stamp">
            <span class="stamp__inner">LOVE</span>
          </div>
        </div>

        <!-- 新人插图 -->
        <div ref="coupleRef" class="letter__couple">
          <img :src="brideAndGroomImg" alt="新人" class="couple-img" />
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
/* ── section ─────────────────────────────────────────────────────────────── */
.closing-section {
  position: relative;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding: 60px 20px 100px;
}
.closing-section__inner {
  width: 100%;
  display: flex;
  justify-content: center;
}

/* ── 信纸 ─────────────────────────────────────────────────────────────────── */
.letter {
  position: relative;
  width: min(92vw, 380px);
  background-color: #fffef5;
  /* 横线：28px 行距 */
  background-image:
    repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 27px,
      rgba(183, 125, 238, 0.13) 27px,
      rgba(183, 125, 238, 0.13) 28px
    );
  border-radius: 4px 4px 4px 4px;
  box-shadow:
    0 2px 0 0 #e0d0c0,
    0 12px 40px rgba(0,0,0,0.14),
    0 4px 12px rgba(0,0,0,0.08);
  padding-bottom: 80px;
  /* 左侧红线 */
  border-left: 3px solid rgba(252, 115, 109, 0.35);
  /* 微倾斜 */
  transform: rotate(-0.8deg);
}

/* ── 顶部装饰 ─────────────────────────────────────────────────────────────── */
.letter__header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 20px 12px;
  border-bottom: 2px solid rgba(248, 166, 178, 0.5);
  background: linear-gradient(135deg, rgba(248,166,178,0.18) 0%, rgba(183,125,238,0.12) 100%);
}
.letter__header-deco {
  color: #f8a6b2;
  font-size: 0.75rem;
}
.letter__header-title {
  font-family: 'Noto Sans SC', 'Zen Maru Gothic', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: #a07858;
  letter-spacing: 4px;
}

/* ── 正文 ─────────────────────────────────────────────────────────────────── */
.letter__body {
  padding: 28px 28px 16px 36px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.letter__greeting {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #5a3e2b;
  letter-spacing: 2px;
  margin: 0;
}
.letter__para {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  color: #6b4c35;
  line-height: 2;
  letter-spacing: 1.5px;
  margin: 0;
}
.letter__para--emphasis {
  font-weight: 600;
  color: #5a3e2b;
  font-size: 1rem;
}
.letter__date-line {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.95rem;
  color: #6b4c35;
  line-height: 2;
  letter-spacing: 1.5px;
  margin: 0;
}
.letter__date {
  font-weight: 700;
  color: #fc736d;
}
.letter__hint {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.88rem;
  color: rgba(107,76,53,0.7);
  letter-spacing: 2px;
  font-style: italic;
  margin: 0;
  padding-left: 8px;
  border-left: 2px solid rgba(248,166,178,0.5);
}
.letter__sign {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  padding-right: 16px;
  padding-top: 8px;
}
.letter__sign-text {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.9rem;
  color: #5a3e2b;
  letter-spacing: 2px;
  font-weight: 600;
}
.letter__sign-sub {
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.75rem;
  color: rgba(90,62,43,0.55);
  letter-spacing: 2px;
}

/* ── 印章 ─────────────────────────────────────────────────────────────────── */
.letter__stamp {
  position: absolute;
  bottom: 40px;
  right: 28px;
}
.stamp {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2.5px solid #fc736d;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.75;
  transform: rotate(12deg);
}
.stamp__inner {
  font-family: 'Noto Sans SC', serif;
  font-size: 1rem;
  font-weight: 900;
  color: #fc736d;
}

/* ── 新人插图 ─────────────────────────────────────────────────────────────── */
.letter__couple {
  position: absolute;
  bottom: -60px;
  left: -20px;
  pointer-events: none;
}
.couple-img {
  width: min(52vw, 200px);
  height: auto;
  display: block;
  filter: drop-shadow(0 6px 18px rgba(0,0,0,0.18));
}
</style>
