import { fetchUsersEntered } from '../fetch';
import { getMarkup } from '../markup';
import { addMarkupGallery } from '../addMarcup';
import Notiflix from 'notiflix';
import { btnLoaderMore, galleryListEl } from '../refs';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

let resultFormInput = '';
const notiflixFailureMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const btnClassList = btnLoaderMore.classList;
let perPage = 40;
let page = 1;

export async function handleInput(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;

  resultFormInput = searchQuery.value.trim();

  if (resultFormInput === '') {
    galleryListEl.innerHTML = '';
    Notiflix.Notify.failure(notiflixFailureMessage);
    btnLoaderMore.classList.add('hidden');
    return;
  }

  await fetchUsersEntered(resultFormInput).then(resolve => {
    if (resolve.hits.length === 0) {
      Notiflix.Notify.failure(notiflixFailureMessage);
      return;
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

    // if (galleryListEl.lastElementChild) {
    //   infiniteScroll.observe(galleryListEl.lastElementChild);
    // }

    const modal = new SimpleLightbox('.gallery a');
  });
}

export async function pageCurrent(event) {
  page += 1;
  await fetchUsersEntered(resultFormInput, page, perPage * page)
    .then(resolve => {
      if (resolve.hits.length === 0) {
        Notiflix.Notify.failure(notiflixFailureMessage);
      }
      if (page === 4) {
        btnLoaderMore.classList.add('hidden');
        page = 1;
        return;
      }
      // if ((page - 1) * 40 >= resolve.totalHits) {
      //   btnLoaderMore.classList.add('hidden');
      //   infiniteScroll.unobserve(galleryListEl.lastElementChild);
      //   return;
      // }
      const markup = getMarkup(resolve.hits);
      addMarkupGallery(markup, galleryListEl);

      // if (galleryListEl.lastElementChild) {
      //   infiniteScroll.observe(galleryListEl.lastElementChild);
      // }
    })
    .catch(error => {
      console.log(error.message);
    });
}

// const infiniteScroll = new IntersectionObserver(
//   ([entry], obsorver) => {
//     if (entry.isIntersecting) {
//       obsorver.unobserve(entry.target);
//       pageCurrent();
//     }
//   },
//   { threshold: 0.8 }
// );
