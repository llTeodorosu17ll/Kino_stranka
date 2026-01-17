import { defineStore } from "pinia";
import { movies } from "../data/movies";
import { halls, sessions } from "../data/schedule";

const KEY = "kino_stranka_v1";
const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
};
const save = (s) => localStorage.setItem(KEY, JSON.stringify(s));

export const useCinemaStore = defineStore("cinema", {
    state: () => load() || ({
        movies, halls, sessions,
        filters: { query: "", genre: "All", date: "", hallId: "all" },
        selectedSessionId: null,
        selectedSeats: [],
        tickets: [],
    }),

    getters: {
        nowPlaying: (s) => s.movies.filter(m => m.status === "now"),
        comingSoon: (s) => s.movies.filter(m => m.status === "soon"),
        genres: (s) => ["All", ...Array.from(new Set(s.movies.flatMap(m => m.genres))).sort()],
        movieById: (s) => (id) => s.movies.find(m => m.id === id) || null,
        hallById: (s) => (id) => s.halls.find(h => h.id === id) || null,
        sessionById: (s) => (id) => s.sessions.find(x => x.id === id) || null,
        filteredMovies(s) {
            const q = s.filters.query.toLowerCase();
            const g = s.filters.genre;
            return s.movies
                .filter(m => m.title.toLowerCase().includes(q))
                .filter(m => g === "All" ? true : m.genres.includes(g));
        },
        filteredSessions(s) {
            const { date, hallId } = s.filters;
            return s.sessions
                .filter(x => date ? x.date === date : true)
                .filter(x => hallId === "all" ? true : x.hallId === hallId);
        },
    },

    actions: {
        persist() {
            save({
                movies: this.movies,
                halls: this.halls,
                sessions: this.sessions,
                filters: this.filters,
                selectedSessionId: this.selectedSessionId,
                selectedSeats: this.selectedSeats,
                tickets: this.tickets,
            });
        },
        setQuery(v) { this.filters.query = v; this.persist(); },
        setGenre(v) { this.filters.genre = v; this.persist(); },
        setDate(v) { this.filters.date = v; this.persist(); },
        setHall(v) { this.filters.hallId = v; this.persist(); },

        openSession(id) {
            this.selectedSessionId = id;
            this.selectedSeats = [];
            this.persist();
        },

        toggleSeat(code) {
            const i = this.selectedSeats.indexOf(code);
            if (i >= 0) this.selectedSeats.splice(i, 1);
            else this.selectedSeats.push(code);
            this.persist();
        },
        buyTickets() {
            const s = this.sessionById(this.selectedSessionId);
            if (!s || this.selectedSeats.length === 0) return;

            this.tickets.unshift({
                id: "t_" + Date.now(),
                sessionId: s.id,
                seats: [...this.selectedSeats],
                createdAt: new Date().toISOString(),
            });

            this.selectedSessionId = null;
            this.selectedSeats = [];
            this.persist();
        },
        removeTicket(id) {
            this.tickets = this.tickets.filter(t => t.id !== id);
            this.persist();
        },
    },
});
