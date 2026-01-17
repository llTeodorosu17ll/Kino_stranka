<template>
  <router-link
      :to="to"
      class="px-4 py-2 rounded-2xl text-sm transition border"
      :class="isActive
      ? 'bg-white/10 border-white/15 text-white'
      : 'bg-transparent border-transparent text-zinc-300 hover:bg-white/5 hover:border-white/10 hover:text-white'"
  >
    {{ label }}
  </router-link>
</template>

<script>
export default {
  name: "NavPill",
  props: { to: String, label: String },
  computed: {
    isActive() {
      return this.$route.path === this.to;
    },
  },
};
</script>
