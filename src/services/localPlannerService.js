// export const generateLocalMealPlan = (physicalInfo, workoutPref) => {
//     // Yahan calculation logic hai
//     const baseCals = (10 * physicalInfo.weight) + (6.25 * physicalInfo.height) - (5 * physicalInfo.age);
//     const calories = Math.round(physicalInfo.gender === 'male' ? baseCals + 5 : baseCals - 161);
    
//     return { 
//       isOffline: true, 
//       calories, 
//       meals: { breakfast: "Eggs & Roti", lunch: "Daal", dinner: "Chicken" }, 
//       workout: { warmup: "Stretching", exercises: ["Pushups", "Squats"] } 
//     };
//   };

export const generateLocalMealPlan = (physicalInfo, workoutPref) => {
  // 1. Advanced Calorie Calculation
  const baseCals = (10 * physicalInfo.weight) + (6.25 * physicalInfo.height) - (5 * physicalInfo.age);
  // Goal ke hisab se calories adjust (Weight gain ke liye thori zyada, loss ke liye kam)
  const calories = Math.round(physicalInfo.gender === 'male' ? baseCals + 5 : baseCals - 161);
  
  // 2. Advanced Exercise Database (Goal based)
  const exerciseDB = {
    "Full Body": [
      { name: "Pushups", sets: "3", reps: "12" },
      { name: "Squats", sets: "4", reps: "15" },
      { name: "Lunges", sets: "3", reps: "12" },
      { name: "Plank", sets: "3", reps: "45 sec" }
    ],
    "Chest": [
      { name: "Pushups", sets: "4", reps: "15" },
      { name: "Wide Grip Pushups", sets: "3", reps: "12" },
      { name: "Diamond Pushups", sets: "3", reps: "10" },
      { name: "Dips", sets: "3", reps: "12" }
    ],
    "Back": [
      { name: "Pull-ups (or Rows)", sets: "3", reps: "10" },
      { name: "Superman Exercise", sets: "3", reps: "15" },
      { name: "Back Extensions", sets: "3", reps: "12" },
      { name: "Bird-Dog", sets: "3", reps: "12" }
    ],
    "Legs": [
      { name: "Squats", sets: "4", reps: "20" },
      { name: "Bulgarian Split Squats", sets: "3", reps: "12" },
      { name: "Calf Raises", sets: "4", reps: "20" },
      { name: "Glute Bridges", sets: "3", reps: "15" }
    ]
  };

  // 3. Nutrition Plan (Pakistani Desi Healthy Mix)
  const meals = {
    breakfast: "3 Boiled Eggs, 1 Whole Wheat Roti, & Black Tea",
    lunch: "Grilled Chicken Breast with 1 Cup Boiled Rice & Salad",
    dinner: "Mixed Daal (Lentils) with small portion of Brown Rice",
    preWorkout: "1 Banana and a handful of Peanuts"
  };

  return { 
    isOffline: true, 
    calories, 
    meals, 
    workout: { 
      warmup: "5 mins Light Jogging & Dynamic Stretching", 
      exercises: exerciseDB[workoutPref.bodyPart] || exerciseDB["Full Body"] 
    } 
  };
};