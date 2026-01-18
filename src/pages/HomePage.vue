<template>
  <section class="max-w-6xl mx-auto px-4 py-6">
    <MovieCarousel
        :items="nowPlaying"
        @buy="goBuyFromMovie"
        @openSchedule="goMovies"
    />
  </section>
</template>

<script>
import { mapState } from "pinia";
import { useCinemaStore } from "../stores/cinema";
import MovieCarousel from "../components/cinema/MovieCarousel.vue";

export default {
  name: "HomePage",
  components: { MovieCarousel },

  computed: {
    ...mapState(useCinemaStore, ["nowPlaying"]),
  },

  methods: {
    goMovies() {
      this.$router.push({ path: "/schedule" });
    },
    goBuyFromMovie(movieId) {
      this.$router.push({ path: `/movie/${movieId}` });
    },
  },
};
</script>
