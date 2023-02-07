import { formEl, btnLoaderMore } from './js/refs';
import { handleInput, pageCurrent, pageScroll } from './js/event';

// встановлюємо слухача submit на форму
formEl.addEventListener('submit', handleInput);

// встановлюємо слухача click на кнопку дозавантаження
btnLoaderMore.addEventListener('click', pageCurrent);

// window.addEventListener('scroll', pageScroll);
