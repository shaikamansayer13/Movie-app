const API_KEY = "517976d0e6ad8fcb4bd1a907a50386b7";

const moviesDiv = document.getElementById("movies");
const searchInput = document.getElementById("search");

// Load movies on start
fetchMovies("https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY);

// Fetch movies
async function fetchMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.results);
  } catch (error) {
    moviesDiv.innerHTML = "<h2>Something went wrong 😢</h2>";
    console.error(error);
  }
}

// Display movies
function displayMovies(list) {
  moviesDiv.innerHTML = "";

  list.forEach(function (m) {
    const div = document.createElement("div");
    div.className = "movie";

    // Image
    const img = document.createElement("img");
    img.src = m.poster_path
      ? "https://image.tmdb.org/t/p/w500" + m.poster_path
      : "https://via.placeholder.com/200x300";

    // Info container
    const info = document.createElement("div");
    info.className = "movie-info";

    // Title
    const title = document.createElement("h4");
    title.innerText = m.title;

    // Rating
    const rating = document.createElement("span");
    rating.innerText = m.vote_average;
    rating.className = getColor(m.vote_average);

    // Append
    info.appendChild(title);
    info.appendChild(rating);

    div.appendChild(img);
    div.appendChild(info);

    moviesDiv.appendChild(div);
  });
}

// Rating color function
function getColor(vote) {
  if (vote >= 7) return "green";
  if (vote >= 5) return "orange";
  return "red";
}

// Search
searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.trim();

  if (value !== "") {
    fetchMovies(
      "https://api.themoviedb.org/3/search/movie?api_key=" +
        API_KEY +
        "&query=" +
        value
    );
  } else {
    fetchMovies(
      "https://api.themoviedb.org/3/discover/movie?api_key=" + API_KEY
    );
  }
});