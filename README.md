# Netflix Clone

A Netflix-like platform built with HTML, CSS, JavaScript, and Bootstrap that allows users to browse movies and TV shows.

## Features

- **Movie Listings**: Browse movies and TV shows in categorized sections (Trending, Popular Movies, Top Rated, TV Shows)
- **Search Functionality**: Search for specific movies or TV shows
- **User Authentication**: Simple client-side login/signup system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Movie Details**: View details about movies including overview, rating, release date, and genres

## Demo Images

The project uses the following images in the `images` folder:
- `netlifx-logo.png` - Netflix logo
- `device-pile-in.png` - User avatar
- `netflix_bg.jpg` - Featured background image
- `tv.png` - Default poster image
- `mobile.jpg` - Additional image for device display

## API Integration

This project uses [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api) to fetch movie and TV show data. The API key is securely handled using serverless functions to prevent exposure.

## Setup and Installation

1. Clone the repository
2. Ensure you have the required images in the `images` folder
3. For local development:
   - Create a `.env` file with your TMDB API key: `TMDB_API_KEY=your_api_key_here`
   - Use a local server like Live Server or http-server to serve the files
4. For deployment:
   - Deploy to Netlify or Vercel (instructions below)
   - Set the TMDB_API_KEY environment variable in your hosting platform

## Deployment

### Netlify Deployment

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set the build settings:
   - Build command: (leave empty)
   - Publish directory: `.`
4. Add environment variable in Netlify:
   - Key: `TMDB_API_KEY`
   - Value: Your TMDB API key
5. Deploy! Netlify will automatically enable HTTPS for your site

### Manual Deployment

If you're using a different hosting provider:
1. Ensure HTTPS is enabled
2. Set up proper security headers (see netlify.toml for reference)
3. Create a server-side API proxy for the TMDB API key

## Project Structure

```
├── index.html            # Main HTML file
├── css/
│   └── style.css         # Main CSS file
├── js/
│   ├── api.js            # API integration
│   ├── auth.js           # Authentication functionality
│   └── app.js            # Main application logic
├── functions/
│   └── getApiKey.js      # Serverless function for API key
├── netlify.toml          # Netlify configuration
└── images/
    ├── netlifx-logo.png  # Netflix logo
    ├── device-pile-in.png# User avatar
    ├── netflix_bg.jpg    # Background image
    ├── tv.png            # TV/poster image
    └── mobile.jpg        # Mobile device image
```

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome
- TMDB API
- Netlify Functions

## Security Features

- HTTPS-only deployment
- API key protection using serverless functions
- Content Security Policy (CSP) implementation
- Secure HTTP headers
- No mixed content

## Notes

- This is a frontend project for educational purposes
- Authentication is handled client-side with local storage (not secure for production)
- The actual streaming functionality is not implemented
- TMDB API usage is subject to their terms of service

## License

This project is available for personal/educational use.

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [Font Awesome](https://fontawesome.com/) for the icons 