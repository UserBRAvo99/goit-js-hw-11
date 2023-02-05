import { formEl, btnLoaderMore } from './js/refs';
import { handleInput, pageCurrent, pageScroll } from './js/event';

formEl.addEventListener('submit', handleInput);

btnLoaderMore.addEventListener('click', pageCurrent);

// window.addEventListener('scroll', pageScroll);
