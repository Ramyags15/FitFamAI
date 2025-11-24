import React, { useState } from "react";
import "../styles/NutritionGame.css";

const foodItems = [
  { name: "Apple", type: "good", calories: 80, image: "https://www.halfyourplate.ca/wp-content/uploads/2014/12/one-apple-with-leaves.jpg" },
  { name: "Broccoli", type: "good", calories: 50, image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/broccoli-1238250_1280.jpg" },
  { name: "Chicken", type: "good", calories: 200, image: "https://wallpapercave.com/wp/wp2055308.jpg" },
  { name: "Nuts", type: "good", calories: 150, image: "https://img.freepik.com/premium-photo/illustration-nuts-composition-isolated-transparent-white-background_945369-27962.jpg?w=2000" },
  { name: "Fish", type: "good", calories: 180, image: "https://images.pexels.com/photos/45910/goldfish-carassius-fish-golden-45910.jpeg?cs=srgb&dl=pexels-pixabay-45910.jpg&fm=jpg" },
  { name: "Carrots", type: "good", calories: 40, image: "https://static.vecteezy.com/system/resources/previews/009/233/255/non_2x/carrots-flat-lay-photo.jpg" },
  { name: "Milk", type: "good", calories: 120, image: "https://wallpaperaccess.com/full/1751326.jpg" },

  { name: "Burger", type: "junk", calories: 500, image: "https://cdn.pixabay.com/photo/2023/03/05/11/02/burger-7831128_1280.jpg" },
  { name: "Fries", type: "junk", calories: 400, image: "https://tse4.mm.bing.net/th/id/OIP.DYyuIhpn3dLCj-_CScycjAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { name: "Pizza", type: "junk", calories: 550, image: "https://cdn.pixabay.com/photo/2024/04/18/10/41/ai-generated-8704060_1280.jpg" },
  { name: "Soda", type: "junk", calories: 180, image: "https://static.vecteezy.com/system/resources/previews/002/181/635/non_2x/soda-with-copy-space-free-photo.jpg" },
  { name: "Ice Cream", type: "junk", calories: 300, image: "https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?cs=srgb&dl=pexels-teejay-1362534.jpg&fm=jpg" },
  { name: "Chips", type: "junk", calories: 250, image: "https://cdn.pixabay.com/photo/2010/12/01/chips-643_1280.jpg" },
  { name: "Cake", type: "junk", calories: 450, image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?cs=srgb&dl=bakery-baking-blueberries-291528.jpg&fm=jpg" },
];

export default function NutritionGame() {
  const [round, setRound] = useState(0);
  const [choices, setChoices] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const handlePick = (item) => {
    setChoices([...choices, item]);
    if (round < 6) setRound(round + 1);
    else setGameOver(true);
  };

  const goodCalories = choices
    .filter(f => f.type === "good")
    .reduce((a, c) => a + c.calories, 0);
  const junkCalories = choices
    .filter(f => f.type === "junk")
    .reduce((a, c) => a + c.calories, 0);

  // Example detailed cards for results
  const resultsCards = [
    {
      title: "Maintain Balance",
      description: "You made mostly healthy choices. Keep up the good habits!",
      exercises: "30 mins cardio, 20 pushups, 15 squats",
      foodAdvice: "Continue eating more fruits, veggies, and lean proteins.",
      image: "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.webp?a=1&b=1&s=612x612&w=0&k=20&c=o05hnttK9m68ECcHQvCvX5jMH3Mc5yZ4c2ELGPo2frg=",
    },
    {
      title: "Improve Choices",
      description: "You selected a few junk foods. Time to balance your meals.",
      exercises: "40 mins cardio, 3 sets of bodyweight exercises",
      foodAdvice: "Reduce junk food and increase fiber intake.",
      image: "https://supplysix.com/cdn/shop/articles/Healthy_Food_vs_Junk_Food_fb219ba8-fd63-45eb-b131-2b76803aa785.png?v=1728457290&width=1500",
    },
    {
      title: "High Junk Intake",
      description: "You ate a lot of junk food! Focus on detox and active recovery.",
      exercises: "1 hour cardio, yoga stretches",
      foodAdvice: "Avoid processed foods for 2 days and eat greens, fruits, water.",
      image: "https://hips.hearstapps.com/hmg-prod/images/full-frame-collage-variety-of-snacks-in-high-res-stock-photography-1578667941.jpg",
    },
  ];

  // Select results card based on ratio of junk vs good calories
  let cardIndex = 0;
  if (junkCalories > goodCalories) cardIndex = 2;
  else if (junkCalories > 0) cardIndex = 1;

  const replayGame = () => {
    setRound(0);
    setChoices([]);
    setGameOver(false);
  };

  return (
    <div className="nutrition-game game-frame padded-section light-bg">
      <h2 className="text-gradient">🎮 Nutrition Game</h2>
      <p className="subtitle">Pick the healthier option to track your calories!</p>
      {!gameOver ? (
        <div className="round">
          <p>Round {round + 1} of 7</p>
          <div className="choices">
            {[foodItems[round], foodItems[round + 7]].map((item, i) => (
              <img
                key={i}
                src={item.image}
                alt={item.name}
                className={`food-img ${item.type}`}
                onClick={() => handlePick(item)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="results-card">
          <h3>{resultsCards[cardIndex].title}</h3>
          <img src={resultsCards[cardIndex].image} alt="Advice" className="results-img" />
          <p><strong>Description:</strong> {resultsCards[cardIndex].description}</p>
          <p><strong>Calories from Good Food:</strong> {goodCalories}</p>
          <p><strong>Calories from Junk Food:</strong> {junkCalories}</p>
          <p><strong>Recommended Exercises:</strong> {resultsCards[cardIndex].exercises}</p>
          <p><strong>Food Advice:</strong> {resultsCards[cardIndex].foodAdvice}</p>
          <button className="btn-gradient large-btn" onClick={replayGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
