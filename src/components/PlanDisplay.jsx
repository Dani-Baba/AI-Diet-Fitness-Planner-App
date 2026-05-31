import React from 'react';

const PlanDisplay = ({ plan, userProfile }) => {
  if (!plan) return null;

  const { bmr, dailyCalories, macros, dietPlan, workoutPlan } = plan;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Caloric & Macronutrient Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Stats */}
        <div className="lg:col-span-1 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-white/20 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg">Energy Profile</h3>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-blue-100 text-xs uppercase tracking-wider font-semibold">Daily Target</p>
              <p className="text-4xl font-black">{dailyCalories} <span className="text-lg font-normal text-blue-200">kcal</span></p>
            </div>
            <div className="pt-4 border-t border-blue-500/50">
              <p className="text-blue-100 text-xs">Basal Metabolic Rate (BMR)</p>
              <p className="text-xl font-bold">{Math.round(bmr)} kcal/day</p>
            </div>
          </div>
        </div>

        {/* Macro Bars */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
            Macronutrient Breakdown
          </h3>
          <div className="space-y-5">
            {[
              { label: 'Protein', value: macros.protein, color: 'bg-blue-500', pct: '25%', goal: 'Muscle Repair' },
              { label: 'Carbohydrates', value: macros.carbs, color: 'bg-orange-400', pct: '45%', goal: 'Energy Source' },
              { label: 'Fats', value: macros.fats, color: 'bg-yellow-400', pct: '30%', goal: 'Hormonal Health' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-2">
                  <div>
                    <span className="font-bold text-gray-800">{item.label}</span>
                    <span className="text-gray-400 ml-2 text-xs hidden sm:inline">— {item.goal}</span>
                  </div>
                  <span className="text-gray-600 font-mono font-bold">{item.value}g <span className="text-gray-400 text-xs">({item.pct})</span></span>
                </div>
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`${item.color} h-full rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: item.pct }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Diet Plan Section */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-yellow-50 px-6 py-4 border-b border-yellow-100 flex items-center justify-between">
          <h3 className="font-bold text-yellow-900 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Personalized Nutrition Strategy
          </h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(dietPlan.meals).map(([mealName, meal]) => (
              <div key={mealName} className="group p-4 rounded-xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50/30 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-800 capitalize">
                    {mealName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </h4>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-md">
                    {meal.calories} kcal
                  </span>
                </div>
                <ul className="space-y-1 mb-3">
                  {meal.foods.map((food, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></span>
                      {food}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-400 italic leading-relaxed">{meal.description}</p>
              </div>
            ))}
          </div>

          {/* Timing & Hydration - Quick Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl">
              <p className="text-blue-900 font-bold text-sm mb-1">💧 Hydration Guide</p>
              <p className="text-blue-700 text-xs">{dietPlan.hydration}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <p className="text-purple-900 font-bold text-sm mb-1">⏰ Optimal Timing</p>
              <p className="text-purple-700 text-xs">{dietPlan.timing}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Workout Plan Section */}
      <div className="bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800 flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="font-bold text-white text-lg">Training Schedule</h3>
        </div>
        
        <div className="p-6 overflow-x-auto">
          <div className="flex space-x-4 pb-4">
            {Object.entries(workoutPlan.weeklySchedule).map(([day, workout]) => (
              <div key={day} className="flex-shrink-0 w-64 bg-gray-800 border border-gray-700 rounded-xl p-4">
                <p className="text-purple-400 font-black uppercase text-xs tracking-widest mb-1">{day}</p>
                <h4 className="text-white font-bold mb-3">{workout.type}</h4>
                <div className="space-y-3">
                  {workout.exercises?.slice(0, 4).map((ex, i) => (
                    <div key={i} className="text-xs">
                      <p className="text-gray-300 font-medium">{ex.name}</p>
                      <p className="text-gray-500">{ex.sets} sets × {ex.reps} reps</p>
                    </div>
                  ))}
                  <p className="text-[10px] text-gray-500 mt-2 italic">Duration: {workout.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progression Footer */}
        {workoutPlan.progression && (
          <div className="bg-gray-800/50 px-6 py-4 border-t border-gray-800">
            <p className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-tighter">Progression Strategy</p>
            <p className="text-sm text-gray-300">{workoutPlan.progression}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDisplay;