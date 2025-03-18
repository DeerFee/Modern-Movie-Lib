import { Movie } from '../types';

export const getMovies = async (): Promise<Movie[]> => {
    // Временные данные для тестирования
    const mockMovies: Movie[] = [
        {
            id: 1,
            title: "Пример фильма 1",
            overview: "Описание фильма 1"
        },
        {
            id: 2,
            title: "Пример фильма 2",
            overview: "Описание фильма 2"
        }
    ];

    return mockMovies;
};