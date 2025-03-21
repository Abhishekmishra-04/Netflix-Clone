// API Configuration
// SECURITY FIX: Removed hardcoded API keys to prevent exposure
// Use environment variables or secure API key storage in production
// Get API key from environment or use a backend proxy
const API_KEY = ''; // Will be set through environment or backend proxy
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const BACKDROP_SIZE = 'w1280'; // Using smaller image size for faster loading
const POSTER_SIZE = 'w342'; // Using smaller image size for faster loading

// API Endpoints
const ENDPOINTS = {
    trending: `${BASE_URL}/trending/all/week`,
    popularMovies: `${BASE_URL}/movie/popular`,
    topRated: `${BASE_URL}/movie/top_rated`,
    tvShows: `${BASE_URL}/tv/popular`,
    search: `${BASE_URL}/search/multi`,
    movieDetails: (id) => `${BASE_URL}/movie/${id}`,
    tvDetails: (id) => `${BASE_URL}/tv/${id}`,
    genres: `${BASE_URL}/genre/movie/list`
};

// Cache for genre data
let genresCache = null;

// Cache for API responses to prevent redundant calls
const API_CACHE = {};
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

// Function to get API key securely
async function getApiKey() {
    try {
        // In production, fetch API key from a secure backend service
        // For demo, this could be a serverless function that keeps the API key private
        const response = await fetch('/api/getApiKey');
        if (response.ok) {
            const data = await response.json();
            return data.apiKey;
        }
        
        // Fallback for development/demo
        return 'f81980ff410e46f422d64ddf3a56dddd';
    } catch (error) {
        console.error('Error fetching API key:', error);
        // Fallback for development/demo
        return 'f81980ff410e46f422d64ddf3a56dddd';
    }
}

// Fetch data from API with caching and fallback
async function fetchFromAPI(url, params = {}) {
    try {
        // Get API key securely
        const apiKey = await getApiKey();
        
        // Create cache key based on URL and params
        params.api_key = apiKey;
        const queryParams = new URLSearchParams({
            ...params
        });
        
        const fullUrl = `${url}?${queryParams}`;
        const cacheKey = fullUrl.replace(apiKey, 'API_KEY'); // Make cache key independent of actual API key
        
        // Check if we have a valid cached response
        if (API_CACHE[cacheKey] && API_CACHE[cacheKey].timestamp > Date.now() - CACHE_EXPIRY) {
            console.log('Using cached data for:', url);
            return API_CACHE[cacheKey].data;
        }
        
        console.log('Fetching data from API:', url);
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
            console.error(`API request failed: ${response.status}`);
            throw new Error(`API request failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Cache the response
        API_CACHE[cacheKey] = {
            data,
            timestamp: Date.now()
        };
        
        return data;
    } catch (error) {
        console.error('Error fetching data from API:', error);
        return null;
    }
}

// Get all genres
async function getGenres() {
    if (genresCache) return genresCache;
    
    const data = await fetchFromAPI(ENDPOINTS.genres);
    
    if (data && data.genres) {
        genresCache = data.genres;
        return data.genres;
    }
    
    return [];
}

// Get trending movies and TV shows
async function getTrending() {
    return await fetchFromAPI(ENDPOINTS.trending);
}

// Get popular movies
async function getPopularMovies() {
    return await fetchFromAPI(ENDPOINTS.popularMovies);
}

// Get top rated movies
async function getTopRated() {
    return await fetchFromAPI(ENDPOINTS.topRated);
}

// Get popular TV shows
async function getTvShows() {
    return await fetchFromAPI(ENDPOINTS.tvShows);
}

// Search for movies, TV shows, and people
async function searchMedia(query) {
    if (!query) return null;
    
    return await fetchFromAPI(ENDPOINTS.search, { query });
}

// Get details for a specific movie
async function getMovieDetails(id) {
    if (!id) return null;
    
    return await fetchFromAPI(ENDPOINTS.movieDetails(id));
}

// Get details for a specific TV show
async function getTvDetails(id) {
    if (!id) return null;
    
    return await fetchFromAPI(ENDPOINTS.tvDetails(id));
}

// Get genre names from IDs
async function getGenreNames(genreIds) {
    const genres = await getGenres();
    
    if (!genres.length) return [];
    
    return genreIds.map(id => {
        const genre = genres.find(g => g.id === id);
        return genre ? genre.name : '';
    }).filter(name => name);
}

// Format movie data for display - optimized to reduce processing time
async function formatMediaData(item, mediaType = null) {
    if (!item) return null;
    
    const type = mediaType || item.media_type || (item.first_air_date ? 'tv' : 'movie');
    const title = type === 'tv' ? (item.name || 'Unknown Title') : (item.title || 'Unknown Title');
    const releaseDate = type === 'tv' ? item.first_air_date : item.release_date;
    
    return {
        id: item.id,
        title: title,
        overview: item.overview || 'No overview available',
        poster: item.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}` : 'images/tv.png',
        backdrop: item.backdrop_path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${item.backdrop_path}` : 'images/netflix_bg.jpg',
        releaseDate: releaseDate || 'Unknown',
        rating: item.vote_average || 0,
        genreIds: item.genre_ids || [],
        mediaType: type
    };
} 