

// import React, { useState, useEffect } from 'react';
// import { db, auth } from '../services/firebase.js';
// import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate, Link } from 'react-router-dom';
// import { 
//   XAxis, YAxis, CartesianGrid, Tooltip, 
//   ResponsiveContainer, AreaChart, Area 
// } from 'recharts';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [workoutMins, setWorkoutMins] = useState('');
//   const [showCongrats, setShowCongrats] = useState(false);
//   const [rating, setRating] = useState(0); // State to store the selected star rating
//   const [hoverRating, setHoverRating] = useState(0); // State for star hover effect
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         const docRef = doc(db, "users", currentUser.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
          
//           // Safety Check: Agar page load hote hi saare days completed hain to modal dikhao
//           const data = docSnap.data();
//           if (data.latest_plan && data.latest_plan.completedDays >= data.latest_plan.totalDays) {
//             setShowCongrats(true);
//           }
//         }
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleDayCheck = async (dayIndex) => {
//     if (dayIndex > userData.latest_plan.completedDays) {
//       alert("Please complete the previous days first!");
//       return;
//     }

//     const newCompletedDays = dayIndex + 1;
//     const prevData = { ...userData };
    
//     setUserData({
//       ...userData,
//       latest_plan: { ...userData.latest_plan, completedDays: newCompletedDays }
//     });

//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, { "latest_plan.completedDays": newCompletedDays });
      
//       if (newCompletedDays >= userData.latest_plan.totalDays) {
//         setShowCongrats(true);
//       }
//     } catch (error) {
//       userData(prevData);
//       alert("Error updating days!");
//     }
//   };

//   // Naya Logic: Same plan ko wapas shuru se chalane ke liye (Reset) + Rating Save
//   const handleRepeatPlan = async () => {
//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, {
//         "latest_plan.completedDays": 0,
//         "latest_plan.calories": 2000, // Default calories setup
//         "latest_plan.rating": rating, // Rating saved to Firebase doc
//         "workout_status": "Pending Activity"
//       });

//       setUserData({
//         ...userData,
//         workout_status: "Pending Activity",
//         latest_plan: { ...userData.latest_plan, completedDays: 0, calories: 2000, rating: rating }
//       });

//       setShowCongrats(false);
//       setRating(0); // Reset local rating state
//       alert("Plan restarted and feedback saved successfully! Let's go again!");
//     } catch (error) {
//       console.error("Error repeating plan:", error);
//       alert("Failed to restart the plan.");
//     }
//   };

//   const handleWorkoutDone = async () => {
//     const mins = parseInt(workoutMins);
    
//     if (!workoutMins || mins < 5 || mins > 120) {
//       alert("Please enter minutes between 5 and 120!");
//       return;
//     }
    
//     const caloriesBurned = mins * 7;
//     const currentCals = userData.latest_plan.calories || 2000;
//     const finalCals = Math.max(currentCals - caloriesBurned, 0);

//     try {
//       const userRef = doc(db, "users", user.uid);
//       await updateDoc(userRef, {
//         "latest_plan.calories": finalCals,
//         "workout_status": "Completed Today ✅",
//         "last_burn": caloriesBurned,
//         "updatedAt": serverTimestamp()
//       });
      
//       setUserData({
//         ...userData,
//         workout_status: "Completed Today ✅",
//         latest_plan: { ...userData.latest_plan, calories: finalCals }
//       });
      
//       setWorkoutMins('');
//       alert(`Burned ${caloriesBurned} calories!`);
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Failed to log session.");
//     }
//   };

//   if (loading) return <div className="h-screen flex items-center justify-center font-black">Loading Matrix...</div>;

//   if (!userData || !userData.latest_plan) return (
//     <div className="h-screen flex items-center justify-center bg-gray-50">
//       <Link to="/planner" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
//         Create Your First AI Plan
//       </Link>
//     </div>
//   );

//   const plan = userData.latest_plan;
//   const chartData = [
//     { name: 'Mon', burn: 200 }, { name: 'Tue', burn: 450 }, { name: 'Wed', burn: 300 },
//     { name: 'Thu', burn: 600 }, { name: 'Fri', burn: 200 }, { name: 'Sat', burn: 800 }, { name: 'Sun', burn: 400 },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      
//       {/* UPDATED MODAL: Asking to Repeat, Rate or Generate New */}
//       {showCongrats && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-md w-full relative">
//             <h2 className="text-2xl font-black text-emerald-600 mb-2">🏆 Plan Completed!</h2>
//             <p className="mb-4 font-bold text-gray-700 text-sm">
//               Congratulations! You have completed all days. Would you like to repeat this same diet/workout plan or generate a brand new AI plan?
//             </p>
            
//             {/* Interactive 5-Star Rating Component Block */}
//             <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
//               <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">How much did you like this plan?</p>
//               <div className="flex justify-center gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <button
//                     key={star}
//                     type="button"
//                     onClick={() => setRating(star)}
//                     onMouseEnter={() => setHoverRating(star)}
//                     onMouseLeave={() => setHoverRating(0)}
//                     className="text-3xl focus:outline-none transition-transform active:scale-95"
//                   >
//                     <span 
//                       className={`transition-colors duration-150 ${
//                         star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-300'
//                       }`}
//                     >
//                       ★
//                     </span>
//                   </button>
//                 ))}
//               </div>
//               {rating > 0 && (
//                 <p className="text-xs font-bold text-amber-600 mt-1">You rated: {rating} / 5 Stars</p>
//               )}
//             </div>
            
//             <div className="flex flex-col gap-3">
//               <button 
//                 onClick={handleRepeatPlan} 
//                 className="bg-emerald-500 hover:bg-emerald-600 text-black w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-colors"
//               >
//                 🔄 Repeat This Plan
//               </button>
              
//               <button 
//                 onClick={async () => {
//                   // Save rating to Firebase before moving to /planner
//                   try {
//                     const userRef = doc(db, "users", user.uid);
//                     await updateDoc(userRef, { "latest_plan.rating": rating });
//                   } catch (err) {
//                     console.error("Error saving rating:", err);
//                   }
//                   setShowCongrats(false);
//                   setRating(0);
//                   navigate('/planner');
//                 }} 
//                 className="bg-gray-900 hover:bg-gray-800 text-white w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-colors"
//               >
//                 🤖 Generate New AI Plan
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div>
//           <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">
//             Welcome, <span className="text-emerald-600">{userData.personal_info?.userName || userData.userName || "Champion"}</span>!
//           </h1>
//         </div>
//         <div className="px-6 py-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl font-black uppercase tracking-wider text-xs">
//           Status: {userData.workout_status || "Pending Activity"}
//         </div>
//       </div>

//       <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-8">
//         <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">📅 Workout Progress Tracker</h3>
//         <div className="flex flex-wrap gap-3">
//           {[...Array(plan.totalDays)].map((_, i) => (
//             <div key={i} className={`p-4 rounded-2xl border-2 ${i < plan.completedDays ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50'}`}>
//               <span className={`text-[10px] font-bold block mb-2 ${i < plan.completedDays ? 'text-emerald-600' : 'text-gray-400'}`}>Day {i + 1}</span>
//               <input 
//                 type="checkbox" 
//                 checked={i < plan.completedDays} 
//                 disabled={i > plan.completedDays} 
//                 onChange={() => handleDayCheck(i)} 
//                 className="w-5 h-5 accent-emerald-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" 
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
//         <div className="space-y-6">
//           <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100/50">
//             <h3 className="text-gray-400 font-black text-xs uppercase mb-4 tracking-widest">Target Body Part</h3>
//             <p className="text-4xl font-black text-gray-900">{userData.workout_settings?.bodyPart || "Full Body"}</p>
//           </div>
//           <div className="bg-gray-900 p-6 rounded-[2.5rem] shadow-xl text-white border border-gray-800">
//             <h3 className="text-emerald-400 font-black text-xs uppercase mb-4 tracking-widest">Remaining Calories</h3>
//             <p className="text-5xl font-black">{plan.calories}</p>
//           </div>
//         </div>

//         <div className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100/50 h-80">
//           <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">Burn Activity</h3>
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
//               <XAxis dataKey="name" tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 'bold'}} />
//               <Tooltip />
//               <Area type="monotone" dataKey="burn" stroke="#059669" fill="#10b981" fillOpacity={0.1} strokeWidth={3} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
//         <div>
//           <h2 className="text-2xl font-black uppercase tracking-tight italic">Workout Done Today?</h2>
//         </div>
//         <div className="flex flex-row gap-3 w-full lg:w-auto">
//           <input 
//             type="number" 
//             placeholder="5-120 min" 
//             min="5" 
//             max="120"
//             className="bg-gray-800 p-4 rounded-2xl w-full sm:w-32 text-center text-lg sm:text-xl font-black outline-none border-2 border-gray-700 focus:border-emerald-500 placeholder:text-[10px] sm:placeholder:text-sm" 
//             value={workoutMins} 
//             onChange={(e) => {
//               const val = e.target.value;
//               if (val === '' || (/^[0-9]+$/.test(val) && parseInt(val) <= 120)) {
//                 setWorkoutMins(val);
//               }
//             }} 
//           />
//           <button onClick={handleWorkoutDone} className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 sm:px-10 py-4 rounded-2xl font-black uppercase text-sm sm:text-base whitespace-nowrap">Log Session</button>
//         </div>
//       </div>

//       {/* Diet and Workout Plan Matrix */}
//       <div className="space-y-8">
//         {/* Diet Matrix */}
//         <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100/50 shadow-xl">
//           <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-6">🥗 Current Personalized Diet Matrix</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               { label: 'BREAKFAST', content: plan.meals?.breakfast },
//               { label: 'LUNCH', content: plan.meals?.lunch },
//               { label: 'DINNER', content: plan.meals?.dinner },
//               { label: 'PRE/POST', content: plan.meals?.preWorkout }
//             ].map((meal, idx) => (
//               <div key={idx} className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
//                 <span className="font-black text-[9px] block mb-3 tracking-widest text-emerald-600">{meal.label}</span>
//                 <p className="text-sm font-bold leading-relaxed">{meal.content || "Generating..."}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Workout Plan Matrix */}
//         <div className="bg-gray-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl text-white border border-gray-800">
//           <h3 className="text-xl font-bold mb-4 text-green-400">
//             💪 Workout ({userData.workout_settings?.bodyPart || "Plan"})
//           </h3>
//           <ul className="space-y-2 text-sm">
//             {(plan.workout?.exercises || plan.exercises || []).map((ex, i) => (
//               <li
//                 key={i}
//                 className="bg-gray-800 p-3 rounded-xl flex justify-between items-center border border-gray-700/30"
//               >
//                 <span className="font-bold text-gray-100">{typeof ex === "object" ? ex.name : ex}</span>
//                 {typeof ex === "object" && (ex.sets || ex.reps) && (
//                   <span className="text-green-400 font-bold ml-2 bg-gray-700 px-2 py-1 rounded-lg text-[10px]">
//                     {ex.sets} Sets x {ex.reps} Reps
//                   </span>
//                 )}
//               </li>
//             ))}
//             {(!plan.workout?.exercises && !plan.exercises) && (
//               <p className="text-sm font-bold text-gray-400">Workout data missing...</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// .............................................

import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase.js';
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workoutMins, setWorkoutMins] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const [showDailyCongrats, setShowDailyCongrats] = useState(false); 
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Real-time Date & Time State
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Task Checkboxes States (Hamesha starting mein un-checked honge)
  const [checkedMeals, setCheckedMeals] = useState({ breakfast: false, lunch: false, dinner: false, preWorkout: false });
  const [checkedExercises, setCheckedExercises] = useState([]);

  // ==========================================
  // ⚙️ TIME CONFIGURATION (Yahan Se Time Change Karein)
  // ==========================================
  // Abhi isko 30 seconds par rakha hai testing ke liye.
  const LOCK_DURATION_MS =  120 * 1000; 

  // Live Clock Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          
          if (data.latest_plan) {
            // FIX: Agar day completed hai aur abhi lock duration chal rahi hai, to checks reset hi rehne chahiye. Purana data load na ho.
            const lastCompletionTime = data.latest_plan.dayCompletedAt?.toDate ? data.latest_plan.dayCompletedAt.toDate() : (data.latest_plan.dayCompletedAt ? new Date(data.latest_plan.dayCompletedAt) : null);
            const isLocked = lastCompletionTime && (new Date() - lastCompletionTime < LOCK_DURATION_MS);

            const exercisesCount = (data.latest_plan.workout?.exercises || data.latest_plan.exercises || []).length;

            if (isLocked) {
              // Agar abhi cooldown chal raha hai, to agla din shuru ho chuka hai (ya hone wala hai), ticks blank hone chahiye
              const resetMeals = { breakfast: false, lunch: false, dinner: false, preWorkout: false };
              const resetExs = new Array(exercisesCount).fill(false);
              setCheckedMeals(resetMeals);
              setCheckedExercises(resetExs);
            } else {
              // Agar locked nahi hai to database se load karein, agar wahan data nahi hai to default false karein
              setCheckedMeals(data.latest_plan.checkedMeals || { breakfast: false, lunch: false, dinner: false, preWorkout: false });
              setCheckedExercises(data.latest_plan.checkedExercises || new Array(exercisesCount).fill(false));
            }

            // Ultimate Plan Completion Safety Check
            if (data.latest_plan.completedDays >= data.latest_plan.totalDays) {
              setShowCongrats(true);
            }
          }
        }
      }
        setLoading(false);
    });
    return () => unsubscribe();
  }, [LOCK_DURATION_MS]);

  const plan = userData?.latest_plan;
  const exercisesList = plan?.workout?.exercises || plan?.exercises || [];

  // Function to check if cooldown has passed since the last day completion
  const isTimeGatePassed = () => {
    if (!plan?.dayCompletedAt) return true; 
    
    const lastCompletionTime = plan.dayCompletedAt.toDate ? plan.dayCompletedAt.toDate() : new Date(plan.dayCompletedAt);
    const timeDifferenceInMs = currentDateTime - lastCompletionTime;
    
    return timeDifferenceInMs >= LOCK_DURATION_MS; 
  };

  // Modernized remaining time calculation string (Now supports Hours, Minutes & Seconds)
  const getRemainingTimeStr = () => {
    if (!plan?.dayCompletedAt) return "";
    const lastCompletionTime = plan.dayCompletedAt.toDate ? plan.dayCompletedAt.toDate() : new Date(plan.dayCompletedAt);
    const msPassed = currentDateTime - lastCompletionTime;
    const msRemaining = LOCK_DURATION_MS - msPassed;
    if (msRemaining <= 0) return "";
    
    const hours = Math.floor(msRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((msRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((msRemaining % (1000 * 60)) / 1000);
    
    if (hours > 0) {
      return `⏳ ${hours} Hr : ${minutes} Min : ${seconds} Sec`;
    }
    return `⏳ ${minutes} Min : ${seconds} Sec`;
  };

  // Handle individual meal toggle
  const handleMealToggle = async (mealKey) => {
    if (!isTimeGatePassed()) {
      alert(`🔒 Access Denied! Please wait, Next Day unlocks in: ${getRemainingTimeStr()}`);
      return;
    }

    const updatedMeals = { ...checkedMeals, [mealKey]: !checkedMeals[mealKey] };
    setCheckedMeals(updatedMeals);
    
    // Check if everything is now complete
    checkAndTriggerDayCompletion(updatedMeals, checkedExercises);
  };

  // Handle individual exercise toggle
  const handleExerciseToggle = async (index) => {
    if (!isTimeGatePassed()) {
      alert(`🔒 Access Denied! Please wait, Next Day unlocks in: ${getRemainingTimeStr()}`);
      return;
    }

    const updatedExercises = [...checkedExercises];
    updatedExercises[index] = !updatedExercises[index];
    setCheckedExercises(updatedExercises);

    // Check if everything is now complete
    checkAndTriggerDayCompletion(checkedMeals, updatedExercises);
  };

  // Core automatic evaluation function
  const checkAndTriggerDayCompletion = async (currentMeals, currentExs) => {
    const allMealsDone = Object.values(currentMeals).every(val => val === true);
    const allExsDone = currentExs.length > 0 && currentExs.every(val => val === true);

    if (allMealsDone && allExsDone) {
      const newCompletedDays = plan.completedDays + 1;
      const userRef = doc(db, "users", user.uid);

      try {
        if (newCompletedDays >= plan.totalDays) {
          // All days completed -> Show Rating & Final Popup
          await updateDoc(userRef, {
            "latest_plan.completedDays": newCompletedDays,
            "latest_plan.checkedMeals": currentMeals,
            "latest_plan.checkedExercises": currentExs,
            "latest_plan.dayCompletedAt": serverTimestamp()
          });
          setUserData({
            ...userData,
            latest_plan: { ...plan, completedDays: newCompletedDays, checkedMeals: currentMeals, checkedExercises: currentExs }
          });
          setShowCongrats(true);
        } else {
          // Today completed, trigger lock and auto-reset tasks for the upcoming day block
          const resetMeals = { breakfast: false, lunch: false, dinner: false, preWorkout: false };
          const resetExs = new Array(exercisesList.length).fill(false);

          await updateDoc(userRef, {
            "latest_plan.completedDays": newCompletedDays,
            "latest_plan.checkedMeals": resetMeals,
            "latest_plan.checkedExercises": resetExs,
            "latest_plan.dayCompletedAt": serverTimestamp()
          });

          setUserData({
            ...userData,
            latest_plan: { ...plan, completedDays: newCompletedDays, checkedMeals: resetMeals, checkedExercises: resetExs, dayCompletedAt: new Date() }
          });

          // Local UI state ko foran reset kar dein taake ticks gayab ho jayen aur lock show ho
          setCheckedMeals(resetMeals);
          setCheckedExercises(resetExs);
          setShowDailyCongrats(true); 
        }
      } catch (error) {
        console.error("Error updating sequence:", error);
        alert("Database sync failed!");
      }
    } else {
      // Intermediate state save karein taake components crash ya refresh pe save rahein
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "latest_plan.checkedMeals": currentMeals,
        "latest_plan.checkedExercises": currentExs
      });
    }
  };

  const handleRepeatPlan = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const resetMeals = { breakfast: false, lunch: false, dinner: false, preWorkout: false };
      const resetExs = new Array(exercisesList.length).fill(false);

      await updateDoc(userRef, {
        "latest_plan.completedDays": 0,
        "latest_plan.calories": 2000,
        "latest_plan.rating": rating,
        "latest_plan.checkedMeals": resetMeals,
        "latest_plan.checkedExercises": resetExs,
        "latest_plan.dayCompletedAt": null,
        "workout_status": "Pending Activity"
      });

      setUserData({
        ...userData,
        workout_status: "Pending Activity",
        latest_plan: { ...plan, completedDays: 0, calories: 2000, rating: rating, checkedMeals: resetMeals, checkedExercises: resetExs, dayCompletedAt: null }
      });

      setCheckedMeals(resetMeals);
      setCheckedExercises(resetExs);
      setShowCongrats(false);
      setRating(0);
      alert("Plan restarted and feedback saved successfully! Let's go again!");
    } catch (error) {
      console.error("Error repeating plan:", error);
      alert("Failed to restart the plan.");
    }
  };

  const handleGenerateNewPlanNav = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      const resetMeals = { breakfast: false, lunch: false, dinner: false, preWorkout: false };
      
      await updateDoc(userRef, { 
        "latest_plan.rating": rating,
        "latest_plan.checkedMeals": resetMeals,
        "latest_plan.checkedExercises": [] 
      });
    } catch (err) { 
      console.error("Error resetting states before new plan navigation:", err); 
    }
    
    setShowCongrats(false);
    setRating(0);
    navigate('/planner');
  };

  const handleWorkoutDone = async () => {
    const mins = parseInt(workoutMins);
    if (!workoutMins || mins < 5 || mins > 120) {
      alert("Please enter minutes between 5 and 120!");
      return;
    }
    const caloriesBurned = mins * 7;
    const currentCals = plan.calories || 2000;
    const finalCals = Math.max(currentCals - caloriesBurned, 0);

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "latest_plan.calories": finalCals,
        "workout_status": "Completed Today ✅",
        "last_burn": caloriesBurned,
        "updatedAt": serverTimestamp()
      });
      setUserData({
        ...userData,
        workout_status: "Completed Today ✅",
        latest_plan: { ...plan, calories: finalCals }
      });
      setWorkoutMins('');
      alert(`Burned ${caloriesBurned} calories!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log session.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black text-gray-900">Loading Matrix...</div>;

  if (!userData || !userData.latest_plan) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 p-4 text-center">
      <Link to="/planner" className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs sm:text-sm shadow-xl inline-block w-full max-w-xs">
        Create Your First AI Plan
      </Link>
    </div>
  );

  const chartData = [
    { name: 'Mon', burn: 200 }, { name: 'Tue', burn: 450 }, { name: 'Wed', burn: 300 },
    { name: 'Thu', burn: 600 }, { name: 'Fri', burn: 200 }, { name: 'Sat', burn: 800 }, { name: 'Sun', burn: 400 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      
      {/* DAILY TODAY COMPLETION MODAL */}
      {showDailyCongrats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl text-center max-w-sm w-full">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-xl font-black text-emerald-600 mb-2">Day Completed!</h2>
            <p className="mb-6 font-bold text-gray-700 text-xs leading-relaxed">
              Congratulations! You have successfully completed your Today's Activities! Day {plan.completedDays} tracker checked. Next day activities will unlock soon for temporary verification phase. Keep grinding!
            </p>
            <button 
              onClick={() => setShowDailyCongrats(false)} 
              className="bg-gray-900 text-white w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs transition-colors hover:bg-gray-800"
            >
              Understood, Got It!
            </button>
          </div>
        </div>
      )}
      
      {/* ULTIMATE PLAN COMPLETION MODAL */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl text-center max-w-md w-full relative">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-600 mb-2">🏆 Entire Plan Completed!</h2>
            <p className="mb-4 font-bold text-gray-700 text-xs sm:text-sm leading-relaxed">
              Congratulations! You have completed all days. Would you like to repeat this same diet/workout plan or generate a brand new AI plan?
            </p>
            
            <div className="bg-gray-50 p-4 rounded-2xl mb-6 border border-gray-100">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">How much did you like this plan?</p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-2xl sm:text-3xl focus:outline-none transition-transform active:scale-95"
                  >
                    <span className={`transition-colors duration-150 ${star <= (hoverRating || rating) ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                  </button>
                ))}
              </div>
              {rating > 0 && <p className="text-xs font-bold text-amber-600 mt-1">You rated: {rating} / 5 Stars</p>}
            </div>
            
            <div className="flex flex-col gap-3">
              <button onClick={handleRepeatPlan} className="bg-emerald-500 hover:bg-emerald-600 text-black w-full py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-colors">
                🔄 Repeat This Plan
              </button>
              <button 
                onClick={handleGenerateNewPlanNav} 
                className="bg-gray-900 hover:bg-gray-800 text-white w-full py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-colors"
              >
                🤖 Generate New AI Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner Container */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">
            Welcome, <span className="text-emerald-600">{userData.personal_info?.userName || userData.userName || "Champion"}</span>!
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
            <div className="px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl font-black uppercase tracking-wider text-[10px]">
              Status: {userData.workout_status || "Pending Activity"}
            </div>
            {!isTimeGatePassed() && (
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1 rounded-xl">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] font-black tracking-wide text-amber-700 uppercase font-mono">
                  Unlocks In: {getRemainingTimeStr()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Live Clock Card */}
        <div className="bg-slate-950 text-slate-100 px-6 py-3 rounded-2xl shadow-xl border border-slate-800 min-w-[200px] sm:min-w-[220px] text-center md:text-right transition-all hover:scale-105">
          <div className="flex items-center gap-1.5 justify-center md:justify-end">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
            <p className="text-[9px] font-black tracking-widest text-emerald-400 uppercase">Live Matrix Sync</p>
          </div>
          <p className="text-xl font-black tracking-wider text-white font-mono mt-0.5">
            {currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-wide">
            {currentDateTime.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* WORKOUT PROGRESS TRACKER */}
      <div className="bg-white p-6 md:p-8 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-6">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">📅 Workout Progress Tracker (Auto-Updates)</h3>
        <p className="text-[10px] text-gray-400 mb-4 font-medium">*Days are locked. Complete all tasks below to auto-check the current day.</p>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2.5 sm:gap-3">
          {[...Array(plan.totalDays)].map((_, i) => (
            <div key={i} className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 text-center sm:text-left ${i < plan.completedDays ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50'} opacity-90`}>
              <span className={`text-[9px] sm:text-[10px] font-bold block mb-1 sm:mb-2 ${i < plan.completedDays ? 'text-emerald-600' : 'text-gray-400'}`}>Day {i + 1}</span>
              <input 
                type="checkbox" 
                checked={i < plan.completedDays} 
                disabled={true} 
                className="w-4 h-4 sm:w-5 sm:h-5 accent-emerald-500 cursor-not-allowed opacity-60 mx-auto sm:mx-0" 
              />
            </div>
          ))}
        </div>
      </div>

      {/* STATS MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-6 lg:gap-0">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100/50 flex flex-col justify-center">
            <h3 className="text-gray-400 font-black text-xs uppercase mb-2 tracking-widest">Target Body Part</h3>
            <p className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">{userData.workout_settings?.bodyPart || "Full Body"}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-[2rem] shadow-xl text-white border border-gray-800 flex flex-col justify-center">
            <h3 className="text-emerald-400 font-black text-xs uppercase mb-2 tracking-widest">Remaining Calories</h3>
            <p className="text-4xl sm:text-5xl font-black">{plan.calories}</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-[2rem] shadow-xl border border-gray-100/50 h-72 sm:h-80">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-4">Burn Activity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{fill: '#9ca3af', fontSize: 10, fontWeight: 'bold'}} />
              <YAxis tick={{fill: '#9ca3af', fontSize: 10}} />
              <Tooltip />
              <Area type="font-mono" dataKey="burn" stroke="#059669" fill="#10b981" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOG WORKOUT FORM */}
      <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-[2rem] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 mb-6 text-center lg:text-left">
        <div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight italic">Workout Done Today?</h2>
        </div>
        <div className="flex flex-row gap-3 w-full lg:w-auto">
          <input 
            type="number" 
            placeholder="5-120 min" 
            min="5" 
            max="120"
            className="bg-gray-800 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl w-1/2 lg:w-32 text-center text-base sm:text-xl font-black outline-none border-2 border-gray-700 focus:border-emerald-500 placeholder:text-[10px] sm:placeholder:text-xs" 
            value={workoutMins} 
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || (/^[0-9]+$/.test(val) && parseInt(val) <= 120)) {
                setWorkoutMins(val);
              }
            }} 
          />
          <button onClick={handleWorkoutDone} className="bg-emerald-500 hover:bg-emerald-600 text-black w-1/2 lg:w-auto px-4 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black uppercase text-xs sm:text-sm whitespace-nowrap transition-colors">
            Log Session
          </button>
        </div>
      </div>

      {/* DIET & WORKOUT MATRIX CARDS */}
      <div className="space-y-6">
        
        {/* Diet Matrix Block */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] border border-gray-100/50 shadow-xl">
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-gray-400 mb-4 sm:mb-6">🥗 Current Personalized Diet Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'breakfast', label: 'BREAKFAST', content: plan.meals?.breakfast },
              { id: 'lunch', label: 'LUNCH', content: plan.meals?.lunch },
              { id: 'dinner', label: 'DINNER', content: plan.meals?.dinner },
              { id: 'preWorkout', label: 'PRE/POST', content: plan.meals?.preWorkout }
            ].map((meal) => (
              <div key={meal.id} className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border transition-all ${checkedMeals[meal.id] ? 'bg-emerald-100/70 border-emerald-300' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="font-black text-[9px] tracking-widest text-emerald-600">{meal.label}</span>
                  <input 
                    type="checkbox" 
                    checked={checkedMeals[meal.id]} 
                    onChange={() => handleMealToggle(meal.id)}
                    className="w-4 h-4 accent-emerald-600 cursor-pointer"
                  />
                </div>
                <p className={`text-xs sm:text-sm font-bold leading-relaxed ${checkedMeals[meal.id] ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {meal.content || "Generating..."}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plan Block */}
        <div className="bg-gray-900 p-6 md:p-8 rounded-[2rem] shadow-2xl text-white border border-gray-800">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-green-400">
            💪 Workout ({userData.workout_settings?.bodyPart || "Plan"})
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {exercisesList.map((ex, i) => (
              <li key={i} className={`p-3 rounded-xl flex justify-between items-center border transition-all gap-2 ${checkedExercises[i] ? 'bg-gray-800/40 border-emerald-500/50 text-gray-400' : 'bg-gray-800 border-gray-700/30'}`}>
                <div className="flex items-center gap-2.5 min-w-0">
                  <input 
                    type="checkbox" 
                    checked={checkedExercises[i] || false} 
                    onChange={() => handleExerciseToggle(i)}
                    className="w-4 h-4 accent-emerald-500 cursor-pointer flex-shrink-0"
                  />
                  <span className={`font-bold truncate ${checkedExercises[i] ? 'line-through' : 'text-gray-100'}`}>
                    {typeof ex === "object" ? ex.name : ex}
                  </span>
                </div>
                {typeof ex === "object" && (ex.sets || ex.reps) && (
                  <span className={`font-bold flex-shrink-0 px-2 py-1 rounded-lg text-[9px] sm:text-[10px] ${checkedExercises[i] ? 'bg-gray-700/30 text-gray-500' : 'bg-gray-700 text-green-400'}`}>
                    {ex.sets}S x {ex.reps}R
                  </span>
                )}
              </li>
            ))}
            {exercisesList.length === 0 && (
              <p className="text-xs font-bold text-gray-400">Workout data missing...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;