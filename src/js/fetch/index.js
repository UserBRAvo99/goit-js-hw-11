// підключаємо бібліотеку/пакет
import axios from 'axios';

// визначаємо базовий шлях
axios.defaults.baseURL = 'https://pixabay.com/api/';
// глобальні змінні для формування запиту(можна створити об'єкт для пагінації, щоб уникнути створення безлічі змінних)
const KEY = '33349465-f6e14a947762518aeccde2783';
const image = 'image_type=photo';
const orientation = 'orientation=horizontal';
const safesearch = 'safesearch=true';

// визначаємо асинхронну функцію fetchUsersEntered за допомогою async
export async function fetchUsersEntered(name, page = 1, perPage = 40) {
  // визначаєми динамічний результат, бібліотека axios під капотом має fetch
  const response = await axios.get(
    `?key=${KEY}&q=${name}&${image}&${orientation}&${safesearch}&per_page=${perPage}&page=${page}`
  );
  // повертаємо результат, обов'язково вказати data
  return response.data;
}
