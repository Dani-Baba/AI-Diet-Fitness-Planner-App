import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

class PDFService {
  async exportReportToPDF(reportType = 'weekly', userData) {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      // FIX 1: Name fetching logic ko strong banaya
      const userName = userData?.personal_info?.userName || userData?.userName || "Fitness User";
      const plan = userData?.latest_plan || userData?.dietPlan || null;

      // --- Header ---
      doc.setFillColor(16, 185, 129); 
      doc.rect(0, 0, pageWidth, 40, 'F');
      doc.setFontSize(20);
      doc.setTextColor(255, 255, 255);
      doc.text(`${reportType.toUpperCase()} PROGRESS REPORT`, pageWidth / 2, 20, { align: 'center' });
      
      doc.setFontSize(12);
      doc.text(`Client: ${userName}`, pageWidth / 2, 30, { align: 'center' });

      let y = 50;

      // --- Table 1: Profile Info ---
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text("User Information", 14, y);
      
      autoTable(doc, {
        startY: y + 5,
        body: [
          ["Name", userName],
          ["Age", userData?.personal_info?.age || "N/A"],
          ["Weight", `${userData?.personal_info?.weight || "N/A"} kg`],
          ["Calories", `${plan?.calories || "N/A"} kcal`]
        ],
        theme: 'striped'
      });

      y = doc.lastAutoTable.finalY + 15;

      // --- Table 2: Diet Plan ---
      if (plan?.meals) {
        doc.text("Diet Plan (Pakistani Meals)", 14, y);
        autoTable(doc, {
          startY: y + 5,
          head: [['Meal Time', 'Suggested Menu']],
          body: [
            ["Breakfast", plan.meals.breakfast || "N/A"],
            ["Pre-Workout", plan.meals.preWorkout || "N/A"],
            ["Post-Workout", plan.meals.postWorkout || "N/A"],
            ["Lunch", plan.meals.lunch || "N/A"],
            ["Dinner", plan.meals.dinner || "N/A"]
          ],
          headStyles: { fillColor: [16, 185, 129] },
          columnStyles: { 1: { cellWidth: 120 } }
        });
        y = doc.lastAutoTable.finalY + 15;
      }

      // --- Table 3: Workout Plan ---
      if (plan?.workout?.exercises) {
        if (y > 220) { doc.addPage(); y = 20; }
        doc.text("Workout Exercises", 14, y);
        
        // FIX 2: Check kiya ke exercise object hai ya string
        const exerciseRows = plan.workout.exercises.map((ex, i) => [
            i + 1, 
            typeof ex === 'object' ? (ex.name || ex.exerciseName || "Unnamed Exercise") : ex
        ]);

        autoTable(doc, {
          startY: y + 5,
          head: [['#', 'Exercise Name']],
          body: exerciseRows,
          headStyles: { fillColor: [30, 41, 59] }
        });
      }

      doc.save(`${userName}_Fitness_Report.pdf`);
    } catch (error) {
      console.error("PDF Logic Error:", error);
      throw error; 
    }
  }
}

export default new PDFService();