import axios from 'axios';
import scrollWatch from 'infinite-scroll/js/scroll-watch';
import Notiflix from 'notiflix';

// axios.defaults.baseURL = 'https://pixabay.com/api/?key=';
// const KEY = '33349465-f6e14a947762518aeccde2783';
// const BASE_URL = 'https://pixabay.com/api/?key=';
// const image = 'image_type=photo';
// const orientation = 'orientation=horizontal';
// const safesearch = 'safesearch=true';

// export async function fetchUsersEntered(name, page = 1, perPage = 40) {
//   const response = await axios.get(
//     `${KEY}&q=${name}&${image}&${orientation}&${safesearch}&per_page=${perPage}&page=${page}`
//   );
//   console.log(response);
// }

const KEY = '33349465-f6e14a947762518aeccde2783';
const BASE_URL = 'https://pixabay.com/api/?key=';
const image = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safesearch = 'safesearch=true';

export async function fetchUsersEntered(name, page = 1, perPage = 40) {
  const response = await fetch(
    `${BASE_URL}${KEY}&q=${name}&${image}&${orientation}&${safesearch}&per_page=${perPage}&page=${page}`
  );
  const result = await response.json();
  return result;
}

// const KEY = '33349465-f6e14a947762518aeccde2783';
// const BASE_URL = 'https://pixabay.com/api/?key=';
// const image = 'image_type=photo';
// const orientation = 'orientation=horizontal';
// const safesearch = 'safesearch=true';

// export async function fetchUsersEntered(name, page = 1, perPage = 40) {
//   try {
//     const response = await fetch(
//       `${BASE_URL}${KEY}&q=${name}&${image}&${orientation}&${safesearch}&per_page=${perPage}&page=${page}`
//     );
//     const result = await response.json();

//     return result;
//   } catch (error) {
//     Notiflix.Notify.failure(error.message);
//   }
// }
