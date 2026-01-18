<template>
  <div class="relative rounded-3xl overflow-hidden border border-white/10 glass">
    <!-- ARROWS -->
    <button
        class="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 border border-white/10 backdrop-blur transition place-items-center shadow-lg"
        aria-label="Prev"
        @click="prev"
    >
      <span class="text-xl leading-none">‹</span>
    </button>

    <button
        class="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 z-50 w-11 h-11 rounded-full bg-black/35 hover:bg-black/55 border border-white/10 backdrop-blur transition place-items-center shadow-lg"
        aria-label="Next"
        @click="next"
    >
      <span class="text-xl leading-none">›</span>
    </button>

    <Swiper
        :modules="modules"
        :slides-per-view="1"
        :loop="items.length >= 4"
        :autoplay="{ delay: 4500, disableOnInteraction: false }"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
    >
      <SwiperSlide v-for="m in items" :key="m.id">
        <div class="relative h-[440px] md:h-[540px]">
          <!-- BACKDROP BASE -->
          <div
              class="absolute inset-0 bg-center bg-cover"
              :style="{ backgroundImage: 'url(' + assetUrl(m.backdrop || m.poster) + ')' }"
          ></div>

          <!-- SOFT BLUR LAYER -->
          <div
              class="absolute inset-0 bg-center bg-cover scale-110 blur-2xl opacity-70"
              :style="{ backgroundImage: 'url(' + assetUrl(m.backdrop || m.poster) + ')' }"
          ></div>

          <!-- VIGNETTE / GRADIENT -->
          <div class="absolute inset-0 bg-black/45"></div>
          <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10"></div>
          <div class="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/25"></div>

          <!-- CONTENT -->
          <div class="relative h-full p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
            <!-- LEFT -->
            <div class="space-y-4">
              <div class="flex flex-wrap gap-2 text-xs text-zinc-200">
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ m.age }}</span>
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">{{ m.durationMin }} min</span>
                <span class="px-2 py-1 rounded-lg bg-white/10 border border-white/10">
                  {{ m.genres.join(" • ") }}
                </span>
              </div>

              <h1 class="text-3xl md:text-5xl font-semibold leading-tight">
                {{ m.title }}
              </h1>

              <p class="text-zinc-200/90 max-w-xl line-clamp-4">
                {{ m.description }}
              </p>

              <div class="flex flex-wrap gap-3 pt-2">
                <button
                    class="px-5 py-3 rounded-2xl bg-red-600 hover:bg-red-500 font-medium transition shadow"
                    @click="$emit('buy', m.id)"
                >
                  Kúpiť lístok
                </button>

                <router-link
                    to="/schedule"
                    class="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  Filmy
                </router-link>
              </div>
            </div>

            <!-- RIGHT -->
            <div class="md:justify-self-end w-full md:w-[350px]">
              <div class="rounded-3xl overflow-hidden border border-white/10 bg-black/20 shadow-2xl">
                <div class="aspect-[2/3]">
                  <img
                      :src="assetUrl(m.poster)"
                      :alt="m.title"
                      class="w-full h-full object-cover object-center block"
                      loading="lazy"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </SwiperSlide>
    </Swiper>

    <!-- PAGINATION (DOTS + PAGE COUNTER) -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div class="bg-black/35 border border-white/10 backdrop-blur rounded-2xl px-4 py-2 flex items-center gap-3 shadow">
        <div class="text-xs text-white/80 tabular-nums">
          {{ pageText }}
        </div>

        <div class="flex items-center gap-2">
          <button
              v-for="(x, i) in items"
              :key="x.id"
              class="w-2.5 h-2.5 rounded-full transition"
              :class="i === realIndex ? 'bg-sky-400' : 'bg-white/70 hover:bg-white'"
              @click="goTo(i)"
              aria-label="Slide dot"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default {
  name: "MovieCarousel",
  components: { Swiper, SwiperSlide },
  props: { items: { type: Array, default: () => [] } },
  emits: ["buy"],
  data() {
    return {
      modules: [Autoplay],
      swiper: null,
      realIndex: 0,
    };
  },
  computed: {
    pageText() {
      const total = this.items.length || 0;
      const current = total ? this.realIndex + 1 : 0;
      return `${current} / ${total}`;
    },
  },
  methods: {
    onSwiper(swiper) {
      this.swiper = swiper;
      this.realIndex = swiper.realIndex || 0;
    },
    onSlideChange(swiper) {
      this.realIndex = swiper.realIndex || 0;
    },
    prev() {
      if (this.swiper) this.swiper.slidePrev();
    },
    next() {
      if (this.swiper) this.swiper.slideNext();
    },
    goTo(i) {
      if (!this.swiper) return;
      if (this.swiper.params.loop) this.swiper.slideToLoop(i);
      else this.swiper.slideTo(i);
    },
    assetUrl(path) {
      if (!path) return "";
      const base = import.meta.env.BASE_URL || "/";
      const cleanBase = base.endsWith("/") ? base : base + "/";
      const cleanPath = path.startsWith("/") ? path.slice(1) : path;
      return cleanBase + cleanPath;
    },
  },
};
</script>
