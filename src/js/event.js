import { formEl, inputFormEl, btnFormEl, galleryListEl } from './refs';

inputFormEl.addEventListener('input', handleInput);

function handleInput(event) {
  return console.log(event.target.value);
}
