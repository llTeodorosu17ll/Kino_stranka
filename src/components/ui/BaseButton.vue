<template>
  <button
      :type="type"
      :disabled="disabled"
      class="px-4 py-2 rounded-2xl text-sm font-medium transition border"
      :class="disabled
      ? 'bg-white/5 border-white/10 text-zinc-500 cursor-not-allowed'
      : (variant === 'primary'
          ? 'bg-red-600 hover:bg-red-500 border-red-500/40 text-white'
          : 'bg-white/10 hover:bg-white/15 border-white/10 text-white')"
      @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: { type: String, default: "secondary" }, // primary/secondary
    disabled: { type: Boolean, default: false },
    type: { type: String, default: "button" },
  },
  emits: ["click"],
};
</script>
