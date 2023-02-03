import { KEY, BASE_URL, fetchUsersEntered } from './js/fetch';
import { handleInput } from './js/event';

console.log(
  `${BASE_URL}${KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true`
);
console.log(fetchUsersEntered());
console.log(handleInput);
