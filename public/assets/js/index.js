'use strict';

/**
 * import all components and functions
 */

import { sidebar } from "./sidebar.js";
import { api_key, imageBaseURL, fetchDataFromServer } from "./api.js";
import { createMovieCard } from "./movie-card.js";
import { search } from "./search.js";

const pageContent = document.querySelector("[page-content]");



sidebar();



/**
 * Home page sections (Top rated, Upcoming, Trending movies)
 */

const homePageSections = [
  {
    title: "Upcoming Movies",
    path: "/movie/upcoming"
  },
  {
    title: "Weekly Trending Movies",
    path: "/trending/movie/week"
  },
  {
    title: "Top Rated Movies",
    path: "/movie/top_rated"
  }
]



/**
 * fetch all genres eg: [ { "id": "123", "name": "Action" } ]
 * then change genre formate eg: { 123: "Action" }
 */
const genreList = {

  // create genre string from genre_id eg: [23, 43] -> "Action, Romance".
  asString(genreIdList) {
    let newGenreList = [];

    for (const genreId of genreIdList) {
      this[genreId] && newGenreList.push(this[genreId]); // this == genreList;
    }

    return newGenreList.join(", ");
  }

};

fetchDataFromServer(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`, function ({ genres }) {
  for (const { id, name } of genres) {
    genreList[id] = name;
  }

  fetchDataFromServer(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`, heroBanner);
});



const heroBanner = function ({ results: movieList }) {

  const banner = document.createElement("section");
  banner.classList.add("banner");
  banner.ariaLabel = "Popular Movies";

  banner.innerHTML = `
    <div class="banner-slider"></div>
    
    <div class="slider-control">
      <div class="control-inner"></div>
    </div>
  `;

  let controlItemIndex = 0;

  for (const [index, movie] of movieList.entries()) {

    const {
      backdrop_path,
      title,
      release_date,
      genre_ids,
      overview,
      poster_path,
      vote_average,
      id
    } = movie;

    const sliderItem = document.createElement("div");
    sliderItem.classList.add("slider-item");
    sliderItem.setAttribute("slider-item", "");

  

    const controlItem = document.createElement("button");
    controlItem.classList.add("poster-box", "slider-item");
    controlItem.setAttribute("slider-control", `${controlItemIndex}`);

    controlItemIndex++;

    controlItem.innerHTML = `
      <img src="${imageBaseURL}w154${poster_path}" alt="Slide to ${title}" loading="lazy" draggable="false" class="img-cover">
    `;
    banner.querySelector(".control-inner").appendChild(controlItem);

  }

  addHeroSlide();


  /**
   * fetch data for home page sections (top rated, upcoming, trending)
   */
 

}



/**
 * Hero slider functionality
 */

const addHeroSlide = function () {

  const sliderItems = document.querySelectorAll("[slider-item]");
  const sliderControls = document.querySelectorAll("[slider-control]");

  let lastSliderItem = sliderItems[0];
  let lastSliderControl = sliderControls[0];

  lastSliderItem.classList.add("active");
  lastSliderControl.classList.add("active");

  const sliderStart = function () {
    lastSliderItem.classList.remove("active");
    lastSliderControl.classList.remove("active");

    // `this` == slider-control
    sliderItems[Number(this.getAttribute("slider-control"))].classList.add("active");
    this.classList.add("active");

    lastSliderItem = sliderItems[Number(this.getAttribute("slider-control"))];
    lastSliderControl = this;
  }

  addEventOnElements(sliderControls, "click", sliderStart);

}
