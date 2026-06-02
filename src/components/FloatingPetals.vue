<template>
  <div class="petals-container" aria-hidden="true">
    <span
      v-for="n in 12"
      :key="n"
      class="petal"
      :class="`petal--${n}`"
    >
      <svg viewBox="0 0 32 32" width="28" height="28">
        <ellipse
          v-for="a in angles"
          :key="a"
          cx="16"
          cy="8"
          rx="5"
          ry="7"
          fill="#f8a6b2"
          stroke="#725d42"
          stroke-width="1.2"
          :transform="`rotate(${a} 16 16)`"
        />
        <circle cx="16" cy="16" r="3.5" fill="#f7cd67" stroke="#725d42" stroke-width="1.2" />
      </svg>
    </span>
  </div>
</template>

<script setup lang="ts">
const angles = [0, 72, 144, 216, 288]
</script>

<style scoped>
.petals-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
  overflow: hidden;
  /* 整个容器提升到独立合成层，避免滚动时触发重绘 */
  will-change: transform;
  transform: translateZ(0);
}
.petal {
  position: absolute;
  top: -40px;
  opacity: 0.8;
  animation: fall linear infinite;
  /* 用 CSS 变量把 scale 传入 keyframes，避免 transform 互相覆盖 */
  --s: 1;
  will-change: transform, opacity;
}

/* scale 改用 --s 变量，不再写 transform: scale() */
.petal--1  { left: 5%;  animation-duration: 8s;  animation-delay: 0s;   --s: 0.8;  }
.petal--2  { left: 15%; animation-duration: 10s; animation-delay: 2s;   --s: 1.1;  }
.petal--3  { left: 25%; animation-duration: 7s;  animation-delay: 4s;   --s: 0.9;  }
.petal--4  { left: 35%; animation-duration: 9s;  animation-delay: 1s;   --s: 1.2;  }
.petal--5  { left: 45%; animation-duration: 11s; animation-delay: 3s;   --s: 0.7;  }
.petal--6  { left: 55%; animation-duration: 8s;  animation-delay: 5s;   --s: 1.0;  }
.petal--7  { left: 65%; animation-duration: 10s; animation-delay: 0.5s; --s: 0.85; }
.petal--8  { left: 75%; animation-duration: 9s;  animation-delay: 2.5s; --s: 1.15; }
.petal--9  { left: 85%; animation-duration: 7s;  animation-delay: 4.5s; --s: 0.95; }
.petal--10 { left: 95%; animation-duration: 11s; animation-delay: 1.5s; --s: 1.05; }
.petal--11 { left: 10%; animation-duration: 12s; animation-delay: 6s;   --s: 0.75; }
.petal--12 { left: 80%; animation-duration: 8s;  animation-delay: 3.5s; --s: 1.1;  }

@keyframes fall {
  0%   { transform: scale(var(--s)) translateY(-40px)   rotate(0deg)   translateX(0);     opacity: 0;   }
  10%  { opacity: 0.8; }
  50%  { transform: scale(var(--s)) translateY(50vh)    rotate(180deg) translateX(20px);  }
  90%  { opacity: 0.6; }
  100% { transform: scale(var(--s)) translateY(110vh)   rotate(360deg) translateX(-10px); opacity: 0;   }
}
</style>
