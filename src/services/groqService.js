import axios from 'axios';
import { generateLocalMealPlan } from './localPlannerService.js';

// CHANGE: Vite ke liye process.env ki jagah import.meta.env use karein
const KEY = import.meta.env.VITE_GROQ_API_KEY;

export const getSmartPlannerData = async (info, pref) => {
  // Check internet connection status
  if (!navigator.onLine) {
    console.warn("Internet offline detected. Switching to Local Planner.");
    return generateLocalMealPlan(info, pref);
  }

  try {
    // --- TESTING KE LIYE: Is line ko uncomment kar dein to API fail ho jayegi aur Local Planner chal jayega ---
    // throw new Error("Force AI Failure for Testing");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions", 
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { 
            role: "system", 
            content: `You are a fitness expert. Return the response ONLY as a raw JSON object with this exact structure:
            {
              "meals": { "breakfast": "...", "lunch": "...", "dinner": "...", "preWorkout": "..." },
              "exercises": [ { "name": "Exercise Name", "sets": "3", "reps": "12" } ],
              "calories": 2000
            }
            Do not include any markdown.` 
          },
          { 
            role: "user", 
            content: `Generate a fitness and meal plan for: ${info.userName}. Age: ${info.age}, Weight: ${info.weight}kg, Height: ${info.height}cm. Goal: ${pref.bodyPart}. Level: ${pref.level}.` 
          }
        ]
      }, 
      {
        headers: { "Authorization": `Bearer ${KEY}`, "Content-Type": "application/json" }
      }
    );

    let rawContent = response.data.choices[0].message.content.trim();
    rawContent = rawContent.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/```$/, "");
    
    const parsedData = JSON.parse(rawContent);
    
    // AI Data Console mein show karna
    console.log("AI Successfully Generated Data:", parsedData);
    
    return parsedData;
    
  } catch (e) {
    // Error Handling Message
    console.error("AI service failed. Reason:", e.message);
    console.log("Switching to Local Fallback Planner...");
    
    // Agar AI data na de, to local wala call ho jayega
    return generateLocalMealPlan(info, pref);
  }
};