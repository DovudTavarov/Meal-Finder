const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const searchUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";

const searchByQueryStrUrl =
  "https://www.themealdb.com/api/json/v1/1/search.php?s=";

export const getMealsByQueryText = async (queryString) => {
  try {
    const resp = await fetch(searchByQueryStrUrl + queryString);
    const data = await resp.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const getMealByIdOrRandom = async (id) => {
  const requestUrl = id ? searchUrl + id : randomUrl;
  try {
    const resp = await fetch(requestUrl);
    const data = await resp.json();
    return data.meals[0];
  } catch (error) {
    console.log(error);
  }
};
