const surpriseMe = async (string) => {
  let endPoint = '';
  endPoint = string === 'comidas'
    ? 'https://www.themealdb.com/api/json/v1/1/random.php'
    : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const responseSurpeise = await fetch(endPoint);
  try {
    const data = await responseSurpeise.json();
    if (endPoint.includes('meal')) {
      return data.meals[0].idMeal;
    }
    return data.drinks[0].idDrink;
  } catch (error) {
    console.log(error);
  }
};
// const getRandomID = (string) => {
//   let id;
//   surpriseMe();
//   console.log(id);
//   return id;
// };

export default surpriseMe;
