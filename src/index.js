import { KEY, BASE_URL, fetchUsersEntered } from './js/fetch';

console.log(
  `${BASE_URL}${KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`
);
console.log(fetchUsersEntered());
