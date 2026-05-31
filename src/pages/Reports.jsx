// import React, { useState, useEffect, useRef } from 'react'; // useRef add kiya
// import { db, auth } from '../services/firebase';
// import { doc, getDoc } from "firebase/firestore";
// import { onAuthStateChanged } from "firebase/auth";
// import PDFService from '../services/pdfService';
// import { 
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
// } from 'recharts';

// const Reports = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isExporting, setIsExporting] = useState(false);
//   const reportRef = useRef(null); // Ref yahan add kiya

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         try {
//           const docRef = doc(db, "users", currentUser.uid);
//           const docSnap = await getDoc(docRef);
//           if (docSnap.exists()) {
//             setUserData(docSnap.data());
//           }
//         } catch (error) {
//           console.error("Firebase Error:", error);
//         }
//       }
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, []);

//   const handleDownload = async (type) => {
//     if (!userData || (!userData.latest_plan && !userData.dietPlan)) {
//         return alert("Please generate a schedule in the Planner module first!");
//     }

//     setIsExporting(true);
//     try {
//       // Yahan hum ref pass kar rahe hain taake wo accurate capture kare
//       await PDFService.exportReportToPDF(type, userData, reportRef.current);
//     } catch (err) {
//       console.error("PDF Generation Error:", err);
//       alert("An error occurred while generating the PDF. Please verify your system logs.");
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   if (loading) return (
//     <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
//       <p className="text-gray-700 font-black text-lg tracking-wide uppercase">Compiling Report Metrics...</p>
//     </div>
//   );

//   const displayWeight = userData?.personal_info?.weight || userData?.weight || 0;
//   const displayHeight = userData?.personal_info?.height || userData?.height || 0;
//   const displayGoal = userData?.workout_settings?.bodyPart || userData?.goal || 'N/A';
//   const displayName = userData?.userName || userData?.name || 'User';
//   const bmi = displayWeight && displayHeight ? (displayWeight / ((displayHeight/100) ** 2)).toFixed(1) : '--';

//   return (
//     // Yahan ID aur Ref wrap kiya gaya hai
//     <div ref={reportRef} id="report-to-pdf" className="p-4 md:p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      
//       {/* Header Block */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50">
//         <div>
//             <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">Fitness Analytics</h1>
//             <p className="text-gray-500 font-medium text-sm mt-1">Excellent dedication, <span className="text-emerald-600 uppercase font-bold">{displayName}</span>! Evaluate your progressive track record below.</p>
//         </div>
//         <button 
//           disabled={isExporting}
//           onClick={() => handleDownload('weekly')}
//           className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/10 hover:bg-emerald-700 active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
//         >
//           {isExporting ? (
//             <span className="flex items-center gap-2">Processing Document...</span>
//           ) : (
//             <>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
//               Export PDF Report
//             </>
//           )}
//         </button>
//       </div>

//       {/* Profile Metrics Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <MetricCard label="Current Weight" value={`${displayWeight} kg`} color="text-emerald-600" />
//         <MetricCard label="Your Body Mass Index" value={bmi} color="text-emerald-600" />
//         <MetricCard label="Target Focus Area" value={displayGoal} color="text-emerald-600" />
//         <MetricCard label="Target Caloric Cap" value={`${userData?.latest_plan?.calories || '--'} kcal`} color="text-emerald-600" />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50">
//               <div className="flex justify-between items-center mb-6">
//                 <h3 className="font-black text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">PROGRESS VISUALIZER</h3>
//                 <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-100">Live Engine</span>
//               </div>
//               <div className="h-72">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={[
//                     {n: 'Current Metrics', w: parseFloat(displayWeight)}, 
//                     {n: 'Target Threshold', w: parseFloat(displayWeight) - 2}
//                   ]}>
//                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
//                     <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 'bold'}} />
//                     <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
//                     <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', fontFamily: 'sans-serif', fontWeight: 'bold'}} />
//                     <Bar dataKey="w" fill="#059669" radius={[12, 12, 12, 12]} barSize={60} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//           </div>

//           <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col relative overflow-hidden border border-gray-800">
//               <h3 className="text-2xl font-black mb-2 tracking-tight leading-none uppercase italic">Active Setup <br/><span className="text-emerald-400 font-normal">Configured</span></h3>
//               <div className="space-y-4">
//                   <StatusRow label="Plan Strategy" value="Pakistani Traditional" />
//                   <StatusRow label="Frequency" value={`${userData?.latest_plan?.totalDays || 0} Days / Week`} />
//                   <StatusRow label="Database Link" value="Verified Secure" isSuccess />
//               </div>
//               <div className="mt-auto pt-8">
//                 <div className="p-4 bg-gray-800/60 border border-gray-700/50 rounded-2xl">
//                   <p className="text-[9px] uppercase font-black text-emerald-400 tracking-wider mb-1">Coach Strategy Directive:</p>
//                   <p className="text-xs text-gray-300 italic font-medium leading-relaxed">"Optimize hydration thresholds daily and maintain uninterrupted sleep cycles for optimal muscle recovery."</p>
//                 </div>
//               </div>
//           </div>
//       </div>
//     </div>
//   );
// };

// const MetricCard = ({ label, value, color }) => (
//   <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100/50">
//       <p className="text-gray-400 text-[10px] uppercase font-black tracking-widest mb-3">{label}</p>
//       <p className={`text-3xl font-black ${color} tracking-tight`}>{value}</p>
//   </div>
// );

// const StatusRow = ({ label, value, isSuccess }) => (
//   <div className="flex justify-between items-center border-b border-gray-800/60 pb-3.5">
//       <span className="text-gray-400 text-[10px] font-black uppercase tracking-wider">{label}</span>
//       <span className={`font-black text-xs uppercase tracking-wide ${isSuccess ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
//   </div>
// );

// export default Reports;

import React, { useState, useEffect, useRef } from 'react';
import { db, auth } from '../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PDFService from '../services/pdfService';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const Reports = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null); // Full page capture ke liye ref

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (error) {
          console.error("Firebase Error:", error);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDownload = async (type) => {
    if (!userData || (!userData.latest_plan && !userData.dietPlan)) {
        return alert("Please generate a schedule in the Planner module first!");
    }

    setIsExporting(true);
    try {
      // Ref pass kar rahe hain taake PDFService pura div capture kare
      await PDFService.exportReportToPDF(type, userData, reportRef.current);
    } catch (err) {
      console.error("PDF Generation Error:", err);
      alert("An error occurred while generating the PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
      <p className="text-gray-700 font-black text-lg tracking-wide uppercase">Compiling Report Metrics...</p>
    </div>
  );

  const displayWeight = userData?.personal_info?.weight || userData?.weight || 0;
  const displayHeight = userData?.personal_info?.height || userData?.height || 0;
  const displayGoal = userData?.workout_settings?.bodyPart || userData?.goal || 'N/A';
  const displayName = userData?.personal_info?.userName || userData?.userName || 'User';
  const bmi = displayWeight && displayHeight ? (displayWeight / ((displayHeight/100) ** 2)).toFixed(1) : '--';

  return (
    <div ref={reportRef} className="p-4 md:p-10 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50">
        <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase italic">Fitness Analytics</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Excellent dedication, <span className="text-emerald-600 uppercase font-bold">{displayName}</span>! Evaluate your progressive track record below.</p>
        </div>
        <button 
          disabled={isExporting}
          onClick={() => handleDownload('weekly')}
          className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/10 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          {isExporting ? "Processing..." : "Export PDF Report"}
        </button>
      </div>

      {/* Profile Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard label="Current Weight" value={`${displayWeight} kg`} color="text-emerald-600" />
        <MetricCard label="Your Body Mass Index" value={bmi} color="text-emerald-600" />
        <MetricCard label="Target Focus Area" value={displayGoal} color="text-emerald-600" />
        <MetricCard label="Target Caloric Cap" value={`${userData?.latest_plan?.calories || '--'} kcal`} color="text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[2.5rem] shadow-xl border border-gray-100/50">
              <h3 className="font-black text-xs text-gray-400 uppercase tracking-wider mb-6">PROGRESS VISUALIZER</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    {n: 'Current Metrics', w: parseFloat(displayWeight)}, 
                    {n: 'Target Threshold', w: Math.max(parseFloat(displayWeight) - 2, 0)}
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11, fontWeight: 'bold'}} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                    <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
                    <Bar dataKey="w" fill="#059669" radius={[12, 12, 12, 12]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
          </div>

          <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col border border-gray-800">
              <h3 className="text-2xl font-black mb-2 uppercase italic">Active Setup</h3>
              <div className="space-y-4">
                  <StatusRow label="Plan Strategy" value="Pakistani Traditional" />
                  <StatusRow label="Frequency" value={`${userData?.latest_plan?.totalDays || 0} Days`} />
                  <StatusRow label="Status" value="Verified Secure" isSuccess />
              </div>
          </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, color }) => (
  <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100/50">
      <p className="text-gray-400 text-[10px] uppercase font-black mb-3">{label}</p>
      <p className={`text-3xl font-black ${color}`}>{value}</p>
  </div>
);

const StatusRow = ({ label, value, isSuccess }) => (
  <div className="flex justify-between items-center border-b border-gray-800 pb-3">
      <span className="text-gray-400 text-[10px] font-black uppercase">{label}</span>
      <span className={`font-black text-xs uppercase ${isSuccess ? 'text-emerald-400' : 'text-white'}`}>{value}</span>
  </div>
);

export default Reports;