<template>
  <router-link
      :to="to"
      class="px-4 py-2 rounded-2xl border transition text-sm"
      :class="isActive ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 hover:bg-white/10 border-white/10 text-zinc-200'"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: "NavPill",
  props: {
    to: { type: [String, Object], required: true },
    label: { type: String, required: true },
  },
  computed: {
    isActive() {
      // простая активность по path
      const target = typeof this.to === "string" ? this.to : this.to.path;
      return this.$route.path === target;
    },
  },
};
</script>
