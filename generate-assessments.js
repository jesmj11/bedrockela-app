const fs = require('fs');

console.log('📝 Generating Assessment Days...\n');

const assessmentDays = [65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180];

function generateAssessment(day) {
  const week = Math.ceil(day / 5);
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Day ${day} Assessment - 4th Grade</title>
    <link rel="stylesheet" href="css/lesson-viewer.css?v=1772665488">
</head>
<body class="lesson-viewer">
    <div id="lesson-container"></div>
    <script src="js/lesson-viewer.js?v=1772665488"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
    <script src="js/lesson-completion.js?v=1772665488"></script>
    <script src="js/lesson-autosave.js?v=1772665488"></script>
    <script>
        const lesson${day}Config = {
            lessonId: '4th-grade-day-${String(day).padStart(3, '0')}',
            gradeLevel: '4th-grade',
            title: 'Day ${day} - Week ${week} Assessment',
            pages: [
                {
                    render: () => \`
                        <div class="lesson-page-card title-page">
                            <h1>Week ${week} Assessment</h1>
                            <p style="font-size: 18px; margin-top: 20px;">Show what you've learned this week!</p>
                        </div>
                    \`
                },
                {
                    render: () => \`
                        <div class="lesson-page-card content-page">
                            <h2>🎯 Assessment Complete!</h2>
                            <p>Great work this week! You're ready for the next chapter.</p>
                        </div>
                    \`
                }
            ]
        };
        if (typeof initLessonViewer === 'function') {
            initLessonViewer(lesson${day}Config);
        }
    </script>
</body>
</html>`;
}

let count = 0;
assessmentDays.forEach(day => {
  const html = generateAssessment(day);
  const filename = `4th-grade-day-${String(day).padStart(3, '0')}.html`;
  fs.writeFileSync(filename, html);
  console.log(`✅ Created ${filename}`);
  count++;
});

console.log(`\n🎉 Created ${count} assessment days!`);
