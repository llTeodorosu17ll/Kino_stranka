<template>
  <div class="fixed inset-0 z-[60]">
    <div class="absolute inset-0 bg-black/60" @click="$emit('close')"></div>

    <div class="relative max-w-2xl mx-auto mt-16 bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden">
      <div class="p-4 flex items-center justify-between border-b border-white/10">
        <div class="font-semibold">{{ title }}</div>
        <button class="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/15" @click="$emit('close')">✕</button>
      </div>

      <div class="p-5">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal",
  props: { title: { type: String, default: "" } },
  emits: ["close"],
};
</script>
