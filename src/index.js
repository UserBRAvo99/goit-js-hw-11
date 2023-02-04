import { formEl, btnLoaderMore } from './js/refs';
import { handleInput, pageCurrent } from './js/event';

formEl.addEventListener('submit', handleInput);

btnLoaderMore.addEventListener('click', pageCurrent);
