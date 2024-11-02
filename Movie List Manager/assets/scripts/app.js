const addMovie = document.getElementById("add-modal");
const addMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovie.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInput = addMovie.querySelectorAll("input");
const entrySection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entrySection.style.display = "block";
  } else {
    entrySection.style.display = "none";
  }
};

const closeMovieDeletionModal = () => {
  backdropToggle();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = movies.findIndex(movie => movie.id === movieId);

  if (movieIndex === -1) {
    console.error("Movie not found:", movieId);
    return;
  }

  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");

  if (listRoot && listRoot.children[movieIndex]) {
    listRoot.children[movieIndex].remove();
  } else {
    console.error("Invalid movie index or no children to remove:", movieIndex);
  }
  closeMovieDeletionModal();
  updateUI();
};


const deleteMovieHandler = movieId => {
//   const deleteMovieModal = document.getElementById("delete-modal");
  deleteMovieModal.classList.add("visible");
  backdropToggle();
  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId));
  cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal)
  cancelDeletionButton.addEventListener('click', () => {
    closeMovieDeletionModal();
  });
  confirmDeletionButton.addEventListener('click', deleteMovie.bind(null, movieId))

};

const renderMovieElement = (id, title, imageValue, ratingValue) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie=element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageValue}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title} </h2>
    <p> ${ratingValue}/5 stars </p>
     </div>
    `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));

  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const backdropToggle = () => {
  backdrop.classList.remove("visible");
};

const closeMovieModal = () => {
  addMovie.classList.remove("visible");
};

const toggleMovieModal = () => {
  addMovie.classList.toggle("visible");
  backdropToggle();
};

const clearInput = () => {
  userInput[0].value = "";
  userInput[1].value = "";
  userInput[2].value = "";
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearInput();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  backdropToggle();
  clearInput();
};

const addMovieHandler = () => {
  const titleValue = userInput[0].value;
  const imageValue = userInput[1].value;
  const ratingValue = userInput[2].value;

  if (
    titleValue.trim === "" ||
    imageValue.trim === "" ||
    ratingValue.trim === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5). ");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  backdropToggle();
  toggleMovieModal();
  clearInput();
  renderMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

const cancelAddMovie = () => {
  closeMovieModal();
  backdropToggle();
  clearInput();
};

addMovieButton.addEventListener("click", toggleMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovie);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
