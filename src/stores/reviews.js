// src/stores/reviews.js
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const KEY = "kino_reviews_v1";

function load() {
    try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
        return [];
    }
}
function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export const useReviewsStore = defineStore("reviews", {
    state: () => ({
        reviews: load(), // [{id, userId, userName, movieId|null, rating, text, createdAt}]
    }),

    getters: {
        sorted(state) {
            return [...state.reviews].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
        },
    },

    actions: {
        addReview({ rating, text, movieId = null }) {
            const auth = useAuthStore();
            if (!auth.currentUserId || !auth.currentUser) {
                return { ok: false, message: "Najprv sa prihlás v Profile." };
            }

            const r = Number(rating);
            const t = String(text || "").trim();

            if (!(r >= 1 && r <= 5)) return { ok: false, message: "Hodnotenie musí byť 1 až 5." };
            if (t.length < 5) return { ok: false, message: "Text recenzie je príliš krátky." };

            const review = {
                id: "r_" + Date.now(),
                userId: auth.currentUserId,
                userName: auth.currentUser.name,
                movieId,
                rating: r,
                text: t,
                createdAt: new Date().toISOString(),
            };

            this.reviews.unshift(review);
            save(this.reviews);
            return { ok: true };
        },

        removeReview(id) {
            const auth = useAuthStore();
            const uid = auth.currentUserId;
            if (!uid) return;

            // удалять можно только свои
            this.reviews = this.reviews.filter((r) => !(r.id === id && r.userId === uid));
            save(this.reviews);
        },
    },
});
