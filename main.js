import { getMealsByQueryText, getMealByIdOrRandom } from "./api-calls.js";

const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

window.getMealById = getMealById;

random.addEventListener("click", getRandomMeal);
function getRandomMeal() {
  resultHeading.innerHTML = "";
  mealsEl.innerHTML = "";
  getMealByIdOrRandom().then((meal) => addSingleMealToDOM(meal));
}

function addSingleMealToDOM(singleMeal) {
  single_mealEl.innerHTML = "";
  const { strInstructions, strMeal, strMealThumb, strArea, strCategory } =
    singleMeal;

  let ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (singleMeal["strIngredient" + i]) {
      const singleIngredient = `<li>${singleMeal["strIngredient" + i]} - ${
        singleMeal["strMeasure" + i]
      }</li>`;
      ingredients.push(singleIngredient);
    }
  }

  const stringIngredients = ingredients.join("");

  const singleMealElement = `<div class="single-meal">
                            <h1>${strMeal}</h1>
                            <img
                                src="${strMealThumb}"
                                alt="${strMeal}"
                            />
                            <div class="single-meal-info">
                                <p>${strCategory}</p>
                                <p>${strArea}</p>
                            </div>
                            <div class="main">
                                <p>
                                ${strInstructions}
                                </p>
                                <h2>Ingredients</h2>
                                <ul>
                                ${stringIngredients}
                                </ul>
                            </div>
                            </div>`;
  single_mealEl.innerHTML = singleMealElement;
}

submit.addEventListener("submit", searchMeals);

function searchMeals(event) {
  event.preventDefault();

  const queryString = search.value.trim();

  if (queryString) {
    getMealsByQueryText(queryString).then((meals) =>
      addMealsToDOM(meals, queryString)
    );
  }
}

function addMealsToDOM(meals, queryStr) {
  mealsEl.innerHTML = "";
  if (meals === null) {
    resultHeading.innerHTML =
      "<h2>There are no search results. Try again!</h2>";
  } else {
    resultHeading.innerHTML = `<h2>Search results for '${queryStr}':</h2>`;

    meals.forEach((meal) => {
      const { strMealThumb, strMeal, idMeal } = meal;

      const eachMeal = `<div class="meal">
                        <img
                            src="${strMealThumb}"
                            alt="${strMeal}"
                        />
                        <div onclick="getMealById(${idMeal})" class="meal-info">
                            <h3>${strMeal}</h3>
                        </div>
                        </div>`;
      mealsEl.innerHTML += eachMeal;
    });
  }
  search.value = "";
}

function getMealById(id) {
  getMealByIdOrRandom(id).then((meal) => addSingleMealToDOM(meal));
}
