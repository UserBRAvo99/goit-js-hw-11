export const KEY = '33349465-f6e14a947762518aeccde2783';
export const BASE_URL = 'https://pixabay.com/api/?key=';

export const fetchUsersEntered = async () => {
  const image = 'image_type=photo';
  const orientation = 'orientation=horizontal';
  const safesearch = 'safesearch=true';
  try {
    const response = await fetch(
      `${BASE_URL}${KEY}&q=cat&${image}&${orientation}&${safesearch}`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
