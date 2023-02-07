// імпортуємо потрібні файли та документи, спочатку js потім css, не змішувати
import { fetchUsersEntered } from '../fetch';
import { getMarkup } from '../markup';
import { addMarkupGallery } from '../addMarcup';
import Notiflix from 'notiflix';
import { btnLoaderMore, galleryListEl } from '../refs';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

//  створюємо глобальні змінни(виносимо повторювальний код, або данні які потрібно використовувати у різних функціях)
let resultFormInput = '';
const notiflixFailureMessage =
  'Sorry, there are no images matching your search query. Please try again.';
const btnClassList = btnLoaderMore.classList;
let perPage = 40;
let page = 1;

// callbeck функція для події форми submit
// вказуємо async для визначення що це асинхронна функція
export async function handleInput(event) {
  // прибираємо дефолтне перезавантаження сторінки при натисканні submit
  event.preventDefault();
  //  збираємо значення з поля форми
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  // з результату треба прибрати пробіли з початку та кінця
  resultFormInput = searchQuery.value.trim();
  //  якщо поле для введення , це пусти рядок, то ми очищаємо розмітку, викликаємо нотіфікашку та ховаємо кнопку
  if (resultFormInput === '') {
    galleryListEl.innerHTML = '';
    Notiflix.Notify.failure(notiflixFailureMessage);
    btnLoaderMore.classList.add('hidden');
    // виходимо з функції(припиняємо її роботу на данному запиті)
    return;
  }
  // при новому запиті(одразу після попереднього), треба очистити розмітку та вказати що сторінка 1(тобто наступний запит почнеться з першої сторінки)
  galleryListEl.innerHTML = '';
  page = 1;
  // функція fetchUsersEntered чекає (await)
  //  передаємо текст введений в поле форми, в функцію запиту fetchUsersEntered (динамічне значення)
  await fetchUsersEntered(resultFormInput).then(resolve => {
    // якщо масив данних що прийде , буде = 0 , тобто пустий
    if (resolve.hits.length === 0) {
      Notiflix.Notify.failure(notiflixFailureMessage);
      btnClassList.add('hidden');
      return;
    }
    if (resolve.hits.length) {
      btnClassList.remove('hidden');
    }
    // якщо знайдених файлів менше ніж 40(perPage)
    if (resolve.totalHits < perPage) {
      btnClassList.add('hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
    // якщо все добре, показуємо сповіщення та рендеремо розмітку на сторінку
    Notiflix.Notify.success(`Hooray! We found ${resolve.totalHits} images!`);
    const markup = getMarkup(resolve.hits);
    addMarkupGallery(markup, galleryListEl);
    page += 1;
    // if (galleryListEl.lastElementChild) {
    //   infiniteScroll.observe(galleryListEl.lastElementChild);
    // }

    // оголошуємо SimpleLightbox та передаємо значення, тобто в якому блоці буде працювати лайтбокс(блок і посилання). Дивитись документацію
    const modal = new SimpleLightbox('.gallery a');
  });
}

// callbeck функція для події натискання на кнопку
// робимо функцію асинхронною async
export async function pageCurrent(event) {
  // викликаємо функцію fetchUsersEntered та передаємо динамічні параметри для збільшення сторінки
  await fetchUsersEntered(resultFormInput, page, perPage)
    .then(resolve => {
      page += 1;
      if (resolve.hits.length === 0) {
        Notiflix.Notify.failure(notiflixFailureMessage);
      }
      //  якщо (від значення сторінки віднімаємо 1) множимо на 40 (скільки елементів буде показуватись на сторінці) і порівнюємо чи це значення більше або дорівнює значенню, скільки елементів в цілому є по нашому запиту(наприклад (3-1)*40 >= 337)
      if ((page - 1) * perPage >= resolve.totalHits) {
        // якщо елементів що ми відкрили більше або дорівнює загальній кулькості знайдених елементів по запиту, тоді треба сховати кнопку та показати нотіфікашку(більше елементів немає)
        btnLoaderMore.classList.add('hidden');
        Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
        // код для скролла!!!
        // infiniteScroll.unobserve(galleryListEl.lastElementChild);
        // return;
      }
      // якщо все ок, рендеромо розмітку далі та додаємо кнопку - завантажити ще
      const markup = getMarkup(resolve.hits);
      addMarkupGallery(markup, galleryListEl);

      // код для скролла!!!
      // if (galleryListEl.lastElementChild) {
      //   infiniteScroll.observe(galleryListEl.lastElementChild);
      // }
    })
    .catch(error => {
      console.log(error.message);
    });
}

// функція infiniteScroll (безкінечеий скролл)
// const infiniteScroll = new IntersectionObserver(
//   ([entry], obsorver) => {
//     if (entry.isIntersecting) {
//       obsorver.unobserve(entry.target);
//       pageCurrent();
//     }
//   },
//   { threshold: 0.8 }
// );
