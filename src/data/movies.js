// src/data/movies.js
export const movies = [
    // NOW PLAYING
    {
        id: "avatar-2009",
        title: "Avatar",
        year: 2009,
        age: "12+",
        durationMin: 161,
        genres: ["Action", "Adventure", "Sci-Fi", "Fantasy"],
        status: "now",
        poster: "/posters/avatarposter.jpg",
        backdrop: "/backdrops/avatar.png",
        description:
            "Paraplegic ex-Marine Jake Sully is sent to Pandora and becomes torn between following orders and protecting the world he begins to call home.",
    },
    {
        id: "zootopia-2016",
        title: "Zootropolis",
        year: 2016,
        age: "6+",
        durationMin: 108,
        genres: ["Animation", "Adventure", "Comedy", "Family"],
        status: "now",
        poster: "/posters/zootropolisposter.jpeg",
        backdrop: "/backdrops/zootropolis.png",
        description:
            "In a city of anthropomorphic animals, rookie officer Judy Hopps teams up with sly con artist Nick Wilde to crack a major case and prove herself.",
    },
    {
        id: "spongebob-run-2020",
        title: "The SpongeBob Movie: Sponge on the Run",
        year: 2020,
        age: "6+",
        durationMin: 91,
        genres: ["Animation", "Adventure", "Comedy", "Family"],
        status: "now",
        poster: "/posters/spongebobposter.png",
        backdrop: "/backdrops/spongebob.jpg",
        description:
            "SpongeBob and Patrick set out on a rescue mission to save Gary after he is kidnapped, leading them into a wild adventure beyond Bikini Bottom.",
    },

    // COMING SOON (ANONCE)
    {
        id: "scream-1996",
        title: "Scream",
        year: 1996,
        age: "18+",
        durationMin: 111,
        genres: ["Horror", "Mystery"],
        status: "soon",
        poster: "/posters/screamposter.jpeg",
        backdrop: "/backdrops/scream.png",
        description:
            "A masked killer targets teenagers in a small town, turning horror-movie rules into a deadly game.",
    },
    {
        id: "silent-hill-2006",
        title: "Silent Hill",
        year: 2006,
        age: "16+",
        durationMin: 125,
        genres: ["Horror", "Mystery", "Fantasy"],
        status: "soon",
        poster: "/posters/silenthillposter.png",
        backdrop: "/backdrops/silenthill.png",
        description:
            "A mother searches for her missing daughter and is drawn into a foggy town where reality and nightmare overlap.",
    },
];
