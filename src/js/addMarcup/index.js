// додаємо розмітку до HTML файлу (не обов'яково виносити, але зрпучно, якщо треба буде перевикористати)
export function addMarkupGallery(element, place) {
  place.insertAdjacentHTML('beforeend', element);
}
