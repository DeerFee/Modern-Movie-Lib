import json
import tkinter as tk
from tkinter import messagebox
import customtkinter as ctk
from datetime import datetime
import os
from tmdbv3api import TMDb, Movie as TMDBMovie, Search
from PIL import Image, ImageTk
import requests
from io import BytesIO
import threading
import darkdetect

# Настройка TMDB API
TMDB_API_KEY = "6dd0f361fce98637fbce06da5a2a272f"  # Замените на ваш ключ API
tmdb = TMDb()
tmdb.api_key = TMDB_API_KEY
tmdb.language = "ru"
tmdb_movie = TMDBMovie()
tmdb_search = Search()

class Folder:
    def __init__(self, name, parent=None):
        self.name = name
        self.parent = parent
        self.movies = []
        self.subfolders = []

    def to_dict(self):
        return {
            'name': self.name,
            'movies': [movie.to_dict() for movie in self.movies],
            'subfolders': [folder.to_dict() for folder in self.subfolders]
        }

    @staticmethod
    def from_dict(data, parent=None):
        folder = Folder(data['name'], parent)
        folder.movies = [Movie.from_dict(movie_data) for movie_data in data['movies']]
        folder.subfolders = [Folder.from_dict(subfolder_data, folder) for subfolder_data in data['subfolders']]
        return folder

class Movie:
    def __init__(self, title, year, genre, rating=0, description="", poster_url="", tmdb_id=None):
        self.title = title
        self.year = year
        self.genre = genre
        self.rating = rating
        self.description = description
        self.date_added = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.poster_url = poster_url
        self.tmdb_id = tmdb_id
        self.poster_image = None

    def to_dict(self):
        return {
            'title': self.title,
            'year': self.year,
            'genre': self.genre,
            'rating': self.rating,
            'description': self.description,
            'date_added': self.date_added,
            'poster_url': self.poster_url,
            'tmdb_id': self.tmdb_id
        }

    @staticmethod
    def from_dict(data):
        movie = Movie(
            data['title'],
            data['year'],
            data['genre'],
            data['rating'],
            data['description'],
            data.get('poster_url', ''),
            data.get('tmdb_id')
        )
        movie.date_added = data['date_added']
        return movie

    def load_poster(self, size=(200, 300)):
        if self.poster_url:
            try:
                response = requests.get(self.poster_url)
                img = Image.open(BytesIO(response.content))
                img = img.resize(size)
                self.poster_image = ImageTk.PhotoImage(img)
                return self.poster_image
            except:
                return None
        return None

class ModernMovieLibraryGUI:
    def __init__(self):
        self.root = ctk.CTk()
        self.setup_window()
        self.load_theme()
        
        self.root_folder = Folder("Корневая папка")
        self.current_folder = self.root_folder
        self.filename = "movie_library_modern.json"
        self.load_library()
        
        self.create_gui()

    def setup_window(self):
        self.root.title("Современная библиотека фильмов")
        self.root.geometry("1200x800")
        self.root.grid_columnconfigure(1, weight=1)
        self.root.grid_rowconfigure(0, weight=1)

    def load_theme(self):
        ctk.set_appearance_mode("dark" if darkdetect.isDark() else "light")
        ctk.set_default_color_theme("blue")

    def create_gui(self):
        # Создаем основные фреймы
        self.create_sidebar()
        self.create_main_content()
        self.create_details_panel()

    def create_sidebar(self):
        # Левая панель с деревом папок
        sidebar_frame = ctk.CTkFrame(self.root, width=200)
        sidebar_frame.grid(row=0, column=0, sticky="nsew", padx=10, pady=10)
        
        # Кнопки управления папками
        btn_frame = ctk.CTkFrame(sidebar_frame)
        btn_frame.pack(fill="x", padx=5, pady=5)
        
        ctk.CTkButton(btn_frame, text="Новая папка", 
                     command=self.create_folder).pack(side="left", padx=2)
        ctk.CTkButton(btn_frame, text="Удалить папку", 
                     command=self.delete_folder).pack(side="left", padx=2)

        # Дерево папок
        self.folder_tree = ctk.CTkScrollableFrame(sidebar_frame)
        self.folder_tree.pack(fill="both", expand=True, padx=5, pady=5)
        
        self.update_folder_tree()

    def create_main_content(self):
        # Центральная панель со списком фильмов
        main_frame = ctk.CTkFrame(self.root)
        main_frame.grid(row=0, column=1, sticky="nsew", padx=10, pady=10)
        main_frame.grid_columnconfigure(0, weight=1)
        main_frame.grid_rowconfigure(1, weight=1)

        # Панель поиска
        search_frame = ctk.CTkFrame(main_frame)
        search_frame.grid(row=0, column=0, sticky="ew", padx=5, pady=5)
        
        self.search_var = tk.StringVar()
        self.search_var.trace('w', self.on_search_change)
        
        ctk.CTkEntry(search_frame, textvariable=self.search_var, 
                    placeholder_text="Поиск фильмов...").pack(side="left", fill="x", expand=True, padx=5)
        
        ctk.CTkButton(search_frame, text="Добавить фильм", 
                     command=self.show_add_movie_dialog).pack(side="right", padx=5)
        ctk.CTkButton(search_frame, text="Поиск TMDB", 
                     command=self.show_tmdb_search_dialog).pack(side="right", padx=5)

        # Список фильмов
        self.movies_frame = ctk.CTkScrollableFrame(main_frame)
        self.movies_frame.grid(row=1, column=0, sticky="nsew", padx=5, pady=5)
        
        self.update_movies_list()

    def create_details_panel(self):
        # Правая панель с детальной информацией
        self.details_frame = ctk.CTkFrame(self.root)
        self.details_frame.grid(row=0, column=2, sticky="nsew", padx=10, pady=10)
        
        self.poster_label = ctk.CTkLabel(self.details_frame, text="")
        self.poster_label.pack(pady=10)
        
        self.details_text = ctk.CTkTextbox(self.details_frame, width=300, height=400)
        self.details_text.pack(fill="both", expand=True, padx=5, pady=5)

    def on_search_change(self, *args):
        """Метод вызывается при изменении текста в поле поиска"""
        self.update_movies_list()

    def show_tmdb_search_dialog(self):
        dialog = ctk.CTkToplevel(self.root)
        dialog.title("Поиск фильма в TMDB")
        dialog.geometry("600x400")
        
        search_frame = ctk.CTkFrame(dialog)
        search_frame.pack(fill="x", padx=10, pady=5)
        
        search_var = tk.StringVar()
        search_entry = ctk.CTkEntry(search_frame, textvariable=search_var, 
                                  placeholder_text="Введите название фильма...")
        search_entry.pack(side="left", fill="x", expand=True, padx=5)
        
        results_frame = ctk.CTkScrollableFrame(dialog)
        results_frame.pack(fill="both", expand=True, padx=10, pady=5)

        def search_tmdb():
            query = search_var.get()
            if query:
                for widget in results_frame.winfo_children():
                    widget.destroy()
                
                results = tmdb_search.movies(query)
                for result in results:
                    movie_frame = ctk.CTkFrame(results_frame)
                    movie_frame.pack(fill="x", pady=2)
                    
                    title = f"{result.title} ({result.release_date[:4] if result.release_date else 'N/A'})"
                    ctk.CTkLabel(movie_frame, text=title).pack(side="left", padx=5)
                    
                    def add_movie_from_tmdb(movie_data=result):
                        self.add_movie_from_tmdb(movie_data)
                        dialog.destroy()
                    
                    ctk.CTkButton(movie_frame, text="Добавить", 
                                command=add_movie_from_tmdb).pack(side="right", padx=5)

        ctk.CTkButton(search_frame, text="Поиск", 
                     command=search_tmdb).pack(side="right", padx=5)

    def add_movie_from_tmdb(self, movie_data):
        # Получаем детальную информацию о фильме
        details = tmdb_movie.details(movie_data.id)
        
        # Создаем объект фильма
        movie = Movie(
            title=details.title,
            year=int(details.release_date[:4]) if details.release_date else 0,
            genre=", ".join([genre['name'] for genre in details.genres]),
            rating=float(details.vote_average),
            description=details.overview,
            poster_url=f"https://image.tmdb.org/t/p/w500{details.poster_path}" if details.poster_path else "",
            tmdb_id=details.id
        )
        
        # Добавляем фильм в текущую папку
        self.current_folder.movies.append(movie)
        self.save_library()
        self.update_movies_list()

    def create_folder(self):
        dialog = ctk.CTkInputDialog(text="Введите название папки:", title="Новая папка")
        folder_name = dialog.get_input()
        if folder_name:
            new_folder = Folder(folder_name, self.current_folder)
            self.current_folder.subfolders.append(new_folder)
            self.save_library()
            self.update_folder_tree()

    def delete_folder(self):
        if self.current_folder == self.root_folder:
            messagebox.showerror("Ошибка", "Нельзя удалить корневую папку!")
            return
            
        if messagebox.askyesno("Подтверждение", 
                             f"Удалить папку '{self.current_folder.name}' и все её содержимое?"):
            parent = self.current_folder.parent
            parent.subfolders.remove(self.current_folder)
            self.current_folder = parent
            self.save_library()
            self.update_folder_tree()
            self.update_movies_list()

    def update_folder_tree(self):
        for widget in self.folder_tree.winfo_children():
            widget.destroy()

        def add_folder_to_tree(folder, level=0):
            frame = ctk.CTkFrame(self.folder_tree)
            frame.pack(fill="x", pady=1)
            
            btn = ctk.CTkButton(frame, text="  " * level + "📁 " + folder.name,
                              command=lambda f=folder: self.select_folder(f),
                              anchor="w")
            btn.pack(fill="x")
            
            for subfolder in folder.subfolders:
                add_folder_to_tree(subfolder, level + 1)

        add_folder_to_tree(self.root_folder)

    def select_folder(self, folder):
        self.current_folder = folder
        self.update_movies_list()

    def update_movies_list(self):
        for widget in self.movies_frame.winfo_children():
            widget.destroy()

        search_term = self.search_var.get().lower()
        movies = self.current_folder.movies

        for movie in movies:
            if search_term and not (search_term in movie.title.lower() or
                                  search_term in movie.genre.lower() or
                                  search_term in movie.description.lower()):
                continue

            movie_frame = ctk.CTkFrame(self.movies_frame)
            movie_frame.pack(fill="x", pady=2)

            # Загружаем постер в отдельном потоке
            def load_poster(movie=movie, frame=movie_frame):
                poster = movie.load_poster((50, 75))
                if poster:
                    ctk.CTkLabel(frame, image=poster, text="").pack(side="left", padx=5)

            threading.Thread(target=load_poster).start()

            title_frame = ctk.CTkFrame(movie_frame)
            title_frame.pack(side="left", fill="x", expand=True, padx=5)

            ctk.CTkLabel(title_frame, text=movie.title, 
                        font=("", 14, "bold")).pack(anchor="w")
            ctk.CTkLabel(title_frame, 
                        text=f"{movie.year} • {movie.genre} • Рейтинг: {movie.rating}/10").pack(anchor="w")

            def show_details(m=movie):
                self.show_movie_details(m)

            ctk.CTkButton(movie_frame, text="Подробнее", 
                         command=show_details).pack(side="right", padx=5)
            ctk.CTkButton(movie_frame, text="Удалить", 
                         command=lambda m=movie: self.delete_movie(m)).pack(side="right", padx=5)

    def show_movie_details(self, movie):
        self.details_text.delete("1.0", tk.END)
        
        # Загружаем постер
        poster = movie.load_poster()
        if poster:
            self.poster_label.configure(image=poster)
            self.poster_label.image = poster
        else:
            self.poster_label.configure(image=None)
            self.poster_label.image = None

        details = f"Название: {movie.title}\n"
        details += f"Год: {movie.year}\n"
        details += f"Жанр: {movie.genre}\n"
        details += f"Рейтинг: {movie.rating}/10\n"
        details += f"Дата добавления: {movie.date_added}\n\n"
        details += f"Описание:\n{movie.description}"
        self.details_text.insert("1.0", details)

    def delete_movie(self, movie):
        if messagebox.askyesno("Подтверждение", f"Удалить фильм '{movie.title}'?"):
            self.current_folder.movies.remove(movie)
            self.save_library()
            self.update_movies_list()
            self.details_text.delete("1.0", tk.END)
            self.poster_label.configure(image=None)

    def show_add_movie_dialog(self):
        dialog = ctk.CTkToplevel(self.root)
        dialog.title("Добавить фильм")
        dialog.geometry("500x600")
        dialog.transient(self.root)
        dialog.grab_set()

        form_frame = ctk.CTkFrame(dialog)
        form_frame.pack(fill="both", expand=True, padx=20, pady=20)

        # Поля ввода
        ctk.CTkLabel(form_frame, text="Название:").pack(anchor="w", pady=(0, 2))
        title_entry = ctk.CTkEntry(form_frame)
        title_entry.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(form_frame, text="Год:").pack(anchor="w", pady=(0, 2))
        year_entry = ctk.CTkEntry(form_frame)
        year_entry.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(form_frame, text="Жанр:").pack(anchor="w", pady=(0, 2))
        genre_entry = ctk.CTkEntry(form_frame)
        genre_entry.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(form_frame, text="Рейтинг (0-10):").pack(anchor="w", pady=(0, 2))
        rating_entry = ctk.CTkEntry(form_frame)
        rating_entry.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(form_frame, text="Постер (URL):").pack(anchor="w", pady=(0, 2))
        poster_entry = ctk.CTkEntry(form_frame)
        poster_entry.pack(fill="x", pady=(0, 10))

        ctk.CTkLabel(form_frame, text="Описание:").pack(anchor="w", pady=(0, 2))
        description_text = ctk.CTkTextbox(form_frame, height=150)
        description_text.pack(fill="x", pady=(0, 10))

        def save_movie():
            try:
                title = title_entry.get().strip()
                year = int(year_entry.get().strip())
                genre = genre_entry.get().strip()
                rating = float(rating_entry.get().strip())
                poster_url = poster_entry.get().strip()
                description = description_text.get("1.0", tk.END).strip()

                if not (0 <= rating <= 10):
                    raise ValueError("Рейтинг должен быть от 0 до 10")

                if not title or not genre:
                    raise ValueError("Заполните все обязательные поля")

                movie = Movie(title, year, genre, rating, description, poster_url)
                self.current_folder.movies.append(movie)
                self.save_library()
                self.update_movies_list()
                dialog.destroy()
                messagebox.showinfo("Успех", "Фильм успешно добавлен!")

            except ValueError as e:
                messagebox.showerror("Ошибка", str(e))

        button_frame = ctk.CTkFrame(dialog)
        button_frame.pack(fill="x", padx=20, pady=10)

        ctk.CTkButton(button_frame, text="Сохранить", 
                     command=save_movie).pack(side="left", padx=5)
        ctk.CTkButton(button_frame, text="Отмена", 
                     command=dialog.destroy).pack(side="left", padx=5)

    def save_library(self):
        with open(self.filename, 'w', encoding='utf-8') as f:
            json.dump(self.root_folder.to_dict(), f, ensure_ascii=False, indent=4)

    def load_library(self):
        try:
            with open(self.filename, 'r', encoding='utf-8') as f:
                data = json.load(f)
                self.root_folder = Folder.from_dict(data)
        except FileNotFoundError:
            self.root_folder = Folder("Корневая папка")

    def run(self):
        self.root.mainloop()

def main():
    app = ModernMovieLibraryGUI()
    app.run()

if __name__ == "__main__":
    main()