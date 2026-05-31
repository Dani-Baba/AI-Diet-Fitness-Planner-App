import React, { useState, useEffect } from 'react';
import { db, auth } from '../services/firebase.js';
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { getSmartPlannerData } from '../services/groqService.js'; 

const Planner = () => {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [physicalInfo, setPhysicalInfo] = useState({ userName: '', age: '', weight: '', height: '', gender: 'male' });
  const [workoutPref, setWorkoutPref] = useState({ bodyPart: 'Full Body', level: 'medium', daysPerWeek: '3' });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const aiData = await getSmartPlannerData(physicalInfo, workoutPref);
      
      // Fixing the structure here:
      // Ensure exercises are accessible from the AI response
      const finalPlan = { 
        ...aiData, 
        totalDays: parseInt(workoutPref.daysPerWeek), 
        completedDays: 0,
        // Agr AI sirf exercises ki list bhej raha hai to hum unhe yahan set kr rahe hain
        workout: aiData.workout || { exercises: aiData.exercises || [] } 
      };
      
      await setDoc(doc(db, "users", user.uid), {
        personal_info: physicalInfo,
        workout_settings: workoutPref,
        latest_plan: finalPlan,
        planActive: true,
        updatedAt: serverTimestamp()
      }, { merge: true });

      setGeneratedPlan(finalPlan);
      setStep(4);
    } catch (e) { alert("Error: " + e.message); }
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-[2.5rem] mt-10 mb-10">
      
      {/* Step 1: User Info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-black">Personal Details</h2>
          <input className="w-full p-4 bg-gray-50 rounded-2xl" placeholder="Full Name" value={physicalInfo.userName} onChange={(e) => setPhysicalInfo({...physicalInfo, userName: e.target.value})} />
          <div className="grid grid-cols-3 gap-2">
            <input className="p-4 bg-gray-50 rounded-2xl" placeholder="Age" value={physicalInfo.age} onChange={(e) => setPhysicalInfo({...physicalInfo, age: e.target.value})} />
            <input className="p-4 bg-gray-50 rounded-2xl" placeholder="Weight (kg)" value={physicalInfo.weight} onChange={(e) => setPhysicalInfo({...physicalInfo, weight: e.target.value})} />
            <input className="p-4 bg-gray-50 rounded-2xl" placeholder="Height (cm)" value={physicalInfo.height} onChange={(e) => setPhysicalInfo({...physicalInfo, height: e.target.value})} />
          </div>
          {/* Gender Selection Added Back */}
          <div className="flex gap-4">
            {['male', 'female'].map(g => (
              <button key={g} onClick={() => setPhysicalInfo({...physicalInfo, gender: g})} 
                className={`flex-1 py-3 rounded-2xl font-bold capitalize ${physicalInfo.gender === g ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>
                {g}
              </button>
            ))}
          </div>
          <button onClick={() => setStep(2)} className="w-full bg-black text-white py-4 rounded-2xl font-bold">Next Step</button>
        </div>
      )}

      {/* Step 2: Goal & Days */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-black">Workout Preferences</h2>
          <select className="w-full p-4 bg-gray-50 rounded-2xl" value={workoutPref.bodyPart} onChange={(e) => setWorkoutPref({...workoutPref, bodyPart: e.target.value})}>
            <option value="Full Body">Full Body</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
          </select>
          <label className="font-bold">Days Per Week:</label>
          <div className="flex gap-2">
            {[3, 4, 5, 6].map(d => (
              <button key={d} onClick={() => setWorkoutPref({...workoutPref, daysPerWeek: d.toString()})} 
                className={`flex-1 p-4 rounded-xl ${workoutPref.daysPerWeek == d ? 'bg-green-500 text-white' : 'bg-gray-100'}`}>{d}</button>
            ))}
          </div>
          <button onClick={handleGenerate} className="w-full bg-green-500 text-white py-4 rounded-2xl font-black">
            {isLoading ? "Generating Plan..." : "Generate AI Plan"}
          </button>
        </div>
      )}
      
      {/* Step 4: Display Generated Plan */}
      {step === 4 && generatedPlan && (
        <div className="space-y-8">
          <h2 className="text-4xl font-black text-green-600 uppercase text-center">Congratulations Your Plane is Generated!</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-[2rem] border-2 border-green-100">
              <h3 className="text-xl font-bold mb-4 text-green-800">🍽️ Pakistani Diet</h3>
              <ul className="space-y-3 text-sm">
                {generatedPlan.meals && Object.entries(generatedPlan.meals).map(([meal, desc]) => (
                  <li key={meal}><span className="font-bold text-green-600 uppercase text-[10px] block">{meal}</span>{desc}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-[2rem] text-white">
              <h3 className="text-xl font-bold mb-4 text-green-400">💪 Workout ({workoutPref.bodyPart})</h3>
              <ul className="space-y-2 text-sm">
                {/* Yahan fix kiya hai: check both generatedPlan.workout.exercises AND generatedPlan.exercises */}
                {(generatedPlan.workout?.exercises || generatedPlan.exercises || []).map((ex, i) => (
                  <li key={i} className="bg-gray-800 p-3 rounded-xl">{typeof ex === 'object' ? ex.name : ex}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <button onClick={() => navigate('/dashboard')} className="w-full bg-green-500 text-white py-6 rounded-3xl font-black text-xl uppercase">
            GO TO DASHBOARD
          </button>
        </div>
      )}
    </div>
  );
};
export default Planner;