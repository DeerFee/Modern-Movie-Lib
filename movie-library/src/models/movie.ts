export class Movie {
    id: number;
    title: string;
    overview: string;
    posterPath: string;

    constructor(id: number, title: string, overview: string, posterPath: string) {
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.posterPath = posterPath;
    }

    formatMovieData(): string {
        return `${this.title} - ${this.overview}`;
    }
}