import { fetchUsersEntered } from '../fetch';
import { getMarkup } from '../markup';
import { addMarkupGallery } from '../addMarcup';
import Notiflix from 'notiflix';
import { btnLoaderMore, galleryListEl } from '../refs';

let resultFormInput = '';

export function handleInput(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  resultFormInput = searchQuery.value.trim();
  console.log(resultFormInput);

  if (resultFormInput === '') {
    galleryListEl.innerHTML = '';
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    btnLoaderMore.classList.add('hidden');
    return;
  }
  fetchUsersEntered(resultFormInput).then(resolve => {
    if (resolve.hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (resolve.hits.length) {
      btnLoaderMore.classList.remove('hidden');
    }

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
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    if (page === 4) {
      btnLoaderMore.classList.add('hidden');
    }
    const markup = getMarkup(resolve.hits);
    addMarkupGallery(markup, galleryListEl);
    console.log(perPage, page);
  });
}
