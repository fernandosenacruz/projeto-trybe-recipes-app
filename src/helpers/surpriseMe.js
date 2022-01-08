const getRandomID = (string) => {
  let id;
  const surpriseMe = async () => {
    let endPoint = '';
    endPoint = string === 'comidas'
      ? 'https://www.themealdb.com/api/json/v1/1/random.php'
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const responseSurpeise = await fetch(endPoint);
    try {
      const data = await responseSurpeise.json();
      if (endPoint.includes('meal')) {
        id = data.meals[0].idMeal;
      } else {
        id = data.drinks[0].idMeal;
      }
    } catch (error) {
      console.log(error);
    }
  };
  surpriseMe();
  return id;
};

export default getRandomID;
