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

const applyFiltersValueForMoviesList: MoviesList['applyFiltersValue'] = (filters: Partial<FiltersState>): void => {
    console.log('Фільтри застосовано до списку фільмів:', filters);
};

const applySearchValueForMoviesList: MoviesList['applySearchValue'] = (searchValue: string): void => {
    console.log('Значення пошуку застосовано до списку фільмів:', searchValue);
};

const moviesList: MoviesList = {
    movies: [],
    filtersState: {
        titleFilter: { filter: '' },
        releaseYearFilter: { filter: 0 },
        ratingFilter: { filter: 0 },
        awardsFilter: { filter: '' },
    },
    applyFiltersValue: applyFiltersValueForMoviesList,
    applySearchValue: applySearchValueForMoviesList,
};

const applyFiltersValueForCategoriesList: CategoriesList['applyFiltersValue'] = (filters: Partial<FiltersState>): void => {
    console.log('Фільтри застосовано до списку категорій:', filters);
};

const applySearchValueForCategoriesList: CategoriesList['applySearchValue'] = (searchValue: string): void => {
    console.log('Значення пошуку застосовано до списку категорій:', searchValue);
};

const categoriesList: CategoriesList = {
    categories: [],
    filtersState: {
        titleFilter: { filter: '' },
        releaseYearFilter: { filter: 0 },
        ratingFilter: { filter: 0 },
        awardsFilter: { filter: '' },
    },
    applyFiltersValue: applyFiltersValueForCategoriesList,
    applySearchValue: applySearchValueForCategoriesList,
};

moviesList.applyFiltersValue({
    releaseYearFilter: { filter: 2001, filterTo: 2011 },
    ratingFilter: { filter: 8 },
});

moviesList.applySearchValue('Гаррі Поттер і Кубок Вогню');

categoriesList.applyFiltersValue({
    titleFilter: { filter: 'Фентазі' },
});

categoriesList.applySearchValue('Гаррі Поттер');