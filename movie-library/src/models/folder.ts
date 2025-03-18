export class Folder {
    id: string;
    name: string;
    movies: string[];

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.movies = [];
    }

    addMovie(movieId: string) {
        this.movies.push(movieId);
    }

    removeMovie(movieId: string) {
        this.movies = this.movies.filter(id => id !== movieId);
    }
}