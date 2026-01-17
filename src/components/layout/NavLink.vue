<template>
  <router-link
      :to="to"
      class="relative hover:text-white transition"
      :class="{ 'text-white': isActive }"
  >
    {{ label }}
    <span
        v-if="isActive"
        class="absolute -bottom-2 left-0 w-full h-[2px] bg-red-500 rounded"
    />
  </router-link>
</template>

<script>
export default {
  name: "NavLink",
  props: {
    to: String,
    label: String,
  },
  computed: {
    isActive() {
      return this.$route.path === this.to;
    },
  },
};
</script>
