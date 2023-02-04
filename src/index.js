import { formEl, galleryListEl } from './js/refs';
import { fetchUsersEntered } from './js/fetch';
import { getMarkup } from './js/markup';
import Notiflix from 'notiflix';

formEl.addEventListener('submit', handleInput);

export function handleInput(event) {
  event.preventDefault();

  const {
    elements: { searchQuery },
  } = event.currentTarget;

  const resultFormInput = searchQuery.value.trim();

  if (resultFormInput === '') {
    galleryListEl.innerHTML = '';
    return;
  }
  fetchUsersEntered(resultFormInput).then(({ hits }) => {
    if (hits.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    const markup = getMarkup(hits);
    addMarkupGallery(markup, galleryListEl);
  });
}

export function addMarkupGallery(element, place) {
  place.innerHTML = element;
}
