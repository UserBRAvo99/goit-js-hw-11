import { fetchUsersEntered } from '../fetch';
import { getMarkup } from '../markup';
import { addMarkupGallery } from '../addMarcup';
import Notiflix from 'notiflix';
import { btnLoaderMore, galleryListEl } from '../refs';

let resultFormInput = '';
const notiflixFailureMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const btnClassList = btnLoaderMore.classList;

export function handleInput(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  resultFormInput = searchQuery.value.trim();

  if (resultFormInput === '') {
    galleryListEl.innerHTML = '';

    Notiflix.Notify.failure(notiflixFailureMessage);

    btnClassList.add('hidden');

    return;
  }
  fetchUsersEntered(resultFormInput).then(resolve => {
    console.log(resolve.hits);
    if (resolve.hits.length === 0) {
      Notiflix.Notify.failure(notiflixFailureMessage);
    }
    if (resolve.hits.length) {
      btnClassList.remove('hidden');
    }
    if (resolve.totalHits < perPage) {
      btnClassList.add('hidden');
    }
    Notiflix.Notify.success(`Hooray! We found ${resolve.totalHits} images!`);
    const markup = getMarkup(resolve.hits);
    addMarkupGallery(markup, galleryListEl);
  });
}

let perPage = 40;
let page = 1;

export function pageCurrent(event) {
  page += 1;
  fetchUsersEntered(resultFormInput, page, perPage * page).then(resolve => {
    if (resolve.hits.length === 0) {
      Notiflix.Notify.failure(notiflixFailureMessage);
    }
    if (page === 4) {
      btnLoaderMore.classList.add('hidden');
    }
    const markup = getMarkup(resolve.hits);
    addMarkupGallery(markup, galleryListEl);
  });
}
