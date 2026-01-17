<template>
  <button
      class="w-full text-left rounded-2xl overflow-hidden border transition"
      :class="active ? 'border-red-500/50 bg-white/10' : 'border-white/10 bg-white/5 hover:bg-white/10'"
      @click="$emit('select', movie.id)"
  >
    <div class="flex gap-3 p-3 items-center">
      <div class="w-14 h-20 rounded-xl overflow-hidden border border-white/10 bg-black/20 shrink-0">
        <img :src="movie.poster" :alt="movie.title" class="w-full h-full object-cover" loading="lazy"/>
      </div>

      <div class="min-w-0">
        <div class="font-medium text-sm line-clamp-1">{{ movie.title }}</div>
        <div class="text-xs text-zinc-400 line-clamp-1">{{ movie.genres.join(" • ") }}</div>
        <div class="mt-1 flex gap-2 text-[11px] text-zinc-200">
          <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ movie.age }}</span>
          <span class="px-2 py-1 rounded-lg bg-black/25 border border-white/10">{{ movie.durationMin }} min</span>
        </div>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: "MovieMiniCard",
  props: {
    movie: { type: Object, required: true },
    active: { type: Boolean, default: false },
  },
  emits: ["select"],
};
</script>
