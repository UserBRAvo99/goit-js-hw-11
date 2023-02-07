// пишемо розмітку на кожну картинку, на кожній ітерації метод map буде додавати елемент масиву розмітки з динамічними значеннями.
// далі join з'єднуємо елементи масиву в один рядок
export function getMarkup(item) {
  // ОБОВ'ЯЗКОВО повертаємо
  return item
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        // ОБОВ'ЯЗКОВО повертаємо розмітку
        return `<li class="photo-card">
        <a class="photo-card__link" href="${largeImageURL}"><img width="270" height="180" class="photo-card__image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</li>`;
      }
    )
    .join('');
}

// Для лайтбоксу, читати документацію
// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
