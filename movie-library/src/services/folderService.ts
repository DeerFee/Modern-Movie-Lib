import { Folder } from '../types';

export const getFolders = async (): Promise<Folder[]> => {
    // Временные данные для тестирования
    const mockFolders: Folder[] = [
        {
            id: "1",
            name: "Избранное",
            movies: []
        },
        {
            id: "2",
            name: "Посмотреть позже",
            movies: []
        }
    ];

    return mockFolders;
};