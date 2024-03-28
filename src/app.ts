showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

/*
У вас є дві сутності - список фільмів і список категорій фільмів.
Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.
Категорія містить поля: назва і фільми.
У кожного списку є пошук за ім'ям (це, по суті, фільтрація),
у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.
У нас визначено три типи фільтрів:
- Фільтр відповідності має поле `filter`
- Фільтр діапазону має поле `filter` і `filterTo`
- Фільтр пошуку за значеннями має поле `values`
Кожен список містить стан його фільтрів, який може бути змінений
тільки методом `applySearchValue` або `applyFiltersValue` (за наявності додаткових фільтрів)
Вам необхідно подумати про поділ вашого коду на різні сутності,
інтерфеси і типи, щоб зробити ваше рішення типобезпечним.
Реалізація всіх методів не є необхідною - це за бажанням.
 */

interface Movie {
    title: string;
    releaseYear: number;
    rating: number;
    awards: string[];
}

interface Category {
    name: string;
    movies: Movie[];
}

interface Filter {
    filter: number | string;
    filterTo?: number;
    values?: string[];
}

interface FiltersState {
    titleFilter: Filter;
    releaseYearFilter: Filter;
    ratingFilter: Filter;
    awardsFilter: Filter;
}

interface MoviesList {
    movies: Movie[];
    filtersState: FiltersState;
    applyFiltersValue: (filters: Partial<FiltersState>) => void;
    applySearchValue: (searchValue: string) => void;
}

interface CategoriesList {
    categories: Category[];
    filtersState: FiltersState;
    applyFiltersValue: (filters: Partial<FiltersState>) => void;
    applySearchValue: (searchValue: string) => void;
}
