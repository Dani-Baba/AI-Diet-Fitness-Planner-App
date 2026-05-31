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
//   const navigate = useNavigate();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//         const docRef = doc(db, "users", currentUser.uid);
//         const docSnap = await getDoc(docRef);
//         if (docSnap.exists()) {
//           setUserData(docSnap.data());
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
//       setUserData(prevData);
//       alert("Error updating days!");
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
      
//       {showCongrats && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//           <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-sm relative">
//             <button 
//               onClick={() => setShowCongrats(false)} 
//               className="absolute top-6 right-6 text-gray-400 hover:text-black font-black text-xl"
//             >✕</button>
//             <h2 className="text-2xl font-black text-emerald-600 mb-4">Congratulations!</h2>
//             <p className="mb-6 font-bold text-gray-700">You completed your workout successfully! Would you like to start a new plan?</p>
//             <button onClick={() => navigate('/planner')} className="bg-gray-900 text-white w-full py-4 rounded-2xl font-black uppercase">
//               New Plan
//             </button>
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

//         {/* Workout Plan Matrix (UPDATED: Match code strictly with Planner Card mapping layout) */}
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

// ........................................................

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
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workoutMins, setWorkoutMins] = useState('');
  const [showCongrats, setShowCongrats] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
          
          // Safety Check: Agar page load hote hi saare days completed hain to modal dikhao
          const data = docSnap.data();
          if (data.latest_plan && data.latest_plan.completedDays >= data.latest_plan.totalDays) {
            setShowCongrats(true);
          }
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDayCheck = async (dayIndex) => {
    if (dayIndex > userData.latest_plan.completedDays) {
      alert("Please complete the previous days first!");
      return;
    }

    const newCompletedDays = dayIndex + 1;
    const prevData = { ...userData };
    
    setUserData({
      ...userData,
      latest_plan: { ...userData.latest_plan, completedDays: newCompletedDays }
    });

    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { "latest_plan.completedDays": newCompletedDays });
      
      if (newCompletedDays >= userData.latest_plan.totalDays) {
        setShowCongrats(true);
      }
    } catch (error) {
      setUserData(prevData);
      alert("Error updating days!");
    }
  };

  // Naya Logic: Same plan ko wapas shuru se chalane ke liye (Reset)
  const handleRepeatPlan = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        "latest_plan.completedDays": 0,
        "latest_plan.calories": 2000, // Aap default calories setup kar sakte hain
        "workout_status": "Pending Activity"
      });

      setUserData({
        ...userData,
        workout_status: "Pending Activity",
        latest_plan: { ...userData.latest_plan, completedDays: 0, calories: 2000 }
      });

      setShowCongrats(false);
      alert("Your current plan has been restarted! Let's go again!");
    } catch (error) {
      console.error("Error repeating plan:", error);
      alert("Failed to restart the plan.");
    }
  };

  const handleWorkoutDone = async () => {
    const mins = parseInt(workoutMins);
    
    if (!workoutMins || mins < 5 || mins > 120) {
      alert("Please enter minutes between 5 and 120!");
      return;
    }
    
    const caloriesBurned = mins * 7;
    const currentCals = userData.latest_plan.calories || 2000;
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
        latest_plan: { ...userData.latest_plan, calories: finalCals }
      });
      
      setWorkoutMins('');
      alert(`Burned ${caloriesBurned} calories!`);
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to log session.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-black">Loading Matrix...</div>;

  if (!userData || !userData.latest_plan) return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <Link to="/planner" className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl">
        Create Your First AI Plan
      </Link>
    </div>
  );

  const plan = userData.latest_plan;
  const chartData = [
    { name: 'Mon', burn: 200 }, { name: 'Tue', burn: 450 }, { name: 'Wed', burn: 300 },
    { name: 'Thu', burn: 600 }, { name: 'Fri', burn: 200 }, { name: 'Sat', burn: 800 }, { name: 'Sun', burn: 400 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* UPDATED MODAL: Asking to Repeat or Generate New */}
      {showCongrats && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-md relative">
            <h2 className="text-2xl font-black text-emerald-600 mb-4">🏆 Plan Completed!</h2>
            <p className="mb-6 font-bold text-gray-700 text-sm">
              Congratulations! You have completed all days. Would you like to repeat this same diet/workout plan or generate a brand new AI plan?
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleRepeatPlan} 
                className="bg-emerald-500 hover:bg-emerald-600 text-black w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-colors"
              >
                🔄 Repeat This Plan
              </button>
              
              <button 
                onClick={() => {
                  setShowCongrats(false);
                  navigate('/planner');
                }} 
                className="bg-gray-900 hover:bg-gray-800 text-white w-full py-4 rounded-2xl font-black uppercase tracking-wider text-xs transition-colors"
              >
                🤖 Generate New AI Plan
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">
            Welcome, <span className="text-emerald-600">{userData.personal_info?.userName || userData.userName || "Champion"}</span>!
          </h1>
        </div>
        <div className="px-6 py-3 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl font-black uppercase tracking-wider text-xs">
          Status: {userData.workout_status || "Pending Activity"}
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50 mb-8">
        <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">📅 Workout Progress Tracker</h3>
        <div className="flex flex-wrap gap-3">
          {[...Array(plan.totalDays)].map((_, i) => (
            <div key={i} className={`p-4 rounded-2xl border-2 ${i < plan.completedDays ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50'}`}>
              <span className={`text-[10px] font-bold block mb-2 ${i < plan.completedDays ? 'text-emerald-600' : 'text-gray-400'}`}>Day {i + 1}</span>
              <input 
                type="checkbox" 
                checked={i < plan.completedDays} 
                disabled={i > plan.completedDays} 
                onChange={() => handleDayCheck(i)} 
                className="w-5 h-5 accent-emerald-500 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" 
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100/50">
            <h3 className="text-gray-400 font-black text-xs uppercase mb-4 tracking-widest">Target Body Part</h3>
            <p className="text-4xl font-black text-gray-900">{userData.workout_settings?.bodyPart || "Full Body"}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-[2.5rem] shadow-xl text-white border border-gray-800">
            <h3 className="text-emerald-400 font-black text-xs uppercase mb-4 tracking-widest">Remaining Calories</h3>
            <p className="text-5xl font-black">{plan.calories}</p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-[2.5rem] shadow-xl border border-gray-100/50 h-80">
          <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-6">Burn Activity</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 'bold'}} />
              <Tooltip />
              <Area type="monotone" dataKey="burn" stroke="#059669" fill="#10b981" fillOpacity={0.1} strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight italic">Workout Done Today?</h2>
        </div>
        <div className="flex flex-row gap-3 w-full lg:w-auto">
          <input 
            type="number" 
            placeholder="5-120 min" 
            min="5" 
            max="120"
            className="bg-gray-800 p-4 rounded-2xl w-full sm:w-32 text-center text-lg sm:text-xl font-black outline-none border-2 border-gray-700 focus:border-emerald-500 placeholder:text-[10px] sm:placeholder:text-sm" 
            value={workoutMins} 
            onChange={(e) => {
              const val = e.target.value;
              if (val === '' || (/^[0-9]+$/.test(val) && parseInt(val) <= 120)) {
                setWorkoutMins(val);
              }
            }} 
          />
          <button onClick={handleWorkoutDone} className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 sm:px-10 py-4 rounded-2xl font-black uppercase text-sm sm:text-base whitespace-nowrap">Log Session</button>
        </div>
      </div>

      {/* Diet and Workout Plan Matrix */}
      <div className="space-y-8">
        {/* Diet Matrix */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100/50 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-400 mb-6">🥗 Current Personalized Diet Matrix</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'BREAKFAST', content: plan.meals?.breakfast },
              { label: 'LUNCH', content: plan.meals?.lunch },
              { label: 'DINNER', content: plan.meals?.dinner },
              { label: 'PRE/POST', content: plan.meals?.preWorkout }
            ].map((meal, idx) => (
              <div key={idx} className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                <span className="font-black text-[9px] block mb-3 tracking-widest text-emerald-600">{meal.label}</span>
                <p className="text-sm font-bold leading-relaxed">{meal.content || "Generating..."}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workout Plan Matrix */}
        <div className="bg-gray-900 p-6 md:p-8 rounded-[2.5rem] shadow-2xl text-white border border-gray-800">
          <h3 className="text-xl font-bold mb-4 text-green-400">
            💪 Workout ({userData.workout_settings?.bodyPart || "Plan"})
          </h3>
          <ul className="space-y-2 text-sm">
            {(plan.workout?.exercises || plan.exercises || []).map((ex, i) => (
              <li
                key={i}
                className="bg-gray-800 p-3 rounded-xl flex justify-between items-center border border-gray-700/30"
              >
                <span className="font-bold text-gray-100">{typeof ex === "object" ? ex.name : ex}</span>
                {typeof ex === "object" && (ex.sets || ex.reps) && (
                  <span className="text-green-400 font-bold ml-2 bg-gray-700 px-2 py-1 rounded-lg text-[10px]">
                    {ex.sets} Sets x {ex.reps} Reps
                  </span>
                )}
              </li>
            ))}
            {(!plan.workout?.exercises && !plan.exercises) && (
              <p className="text-sm font-bold text-gray-400">Workout data missing...</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;