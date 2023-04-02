(() => {
    const API_URL =
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';
    const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
    const SEARCH_API =
      'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
  
    const main = document.getElementById('main');
    const form = document.getElementById('form');
    const search = document.getElementById('search');
  
    const fetchMovies = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
      } catch (error) {
        console.error(error);
        return [];
      }
    };
  
    const showMovies = (movies) => {
      main.innerHTML = '';
      movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview } = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
          <img src="${IMG_PATH}${poster_path}" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview:</h3>
            ${overview}
          </div>`;
        main.appendChild(movieEl);
      });
    };
  
    const searchMovies = async (term) => {
      if (!term) return;
      const url = `${SEARCH_API}${term}`;
      const movies = await fetchMovies(url);
      showMovies(movies);
    };
  
    const getClassByRate = (vote) => {
      if (vote >= 8) {
        return 'green';
      } else if (vote >= 5) {
        return 'orange';
      } else {
        return 'red';
      }
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const searchTerm = search.value.trim();
      searchMovies(searchTerm);
      search.value = '';
    };
  
    form.addEventListener('submit', handleFormSubmit);
 
    fetchMovies(API_URL).then(showMovies);
  })();
  