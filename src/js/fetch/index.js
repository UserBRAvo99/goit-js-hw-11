import getGallery from '../../index';
import axios from 'axios';
import Notiflix from 'notiflix';

const KEY = '33349465-f6e14a947762518aeccde2783';
const BASE_URL = 'https://pixabay.com/api/?key=';
const image = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safesearch = 'safesearch=true';
const perPage = 40;

export async function fetchUsersEntered(name) {
  try {
    const response = await fetch(
      `${BASE_URL}${KEY}&q=${name}&${image}&${orientation}&${safesearch}&per_page=${perPage}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
